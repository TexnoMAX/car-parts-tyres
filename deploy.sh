#!/bin/bash

# GS Car Parts & Tyres - Deploy Script
# Скрипт для автоматического деплоя сайта на сервер

set -e  # Остановка при ошибке

# Конфигурация
SERVER="ws.chaterbox.net"
USER="root"
DOMAIN="car-parts-tyres.maxmaster.nl"
SITE_DIR="/var/www/car-parts-tyres"
NGINX_CONFIG="/etc/nginx/sites-available/car-parts-tyres"

echo "🚀 Начинаем деплой GS Car Parts & Tyres..."

# 1. Сборка проекта
echo "📦 Собираем проект..."
npm run build

# 2. Создание директории на сервере
echo "📁 Создаем директорию на сервере..."
ssh $USER@$SERVER "mkdir -p $SITE_DIR"

# 3. Загрузка файлов
echo "⬆️ Загружаем файлы на сервер..."
scp -r dist/* $USER@$SERVER:$SITE_DIR/

# 4. Проверка и сохранение существующих SSL настроек
echo "🔒 Проверяем существующие SSL сертификаты..."
HAS_SSL=$(ssh $USER@$SERVER "
if [ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo 'true'
else
    echo 'false'
fi
")

# 5. Установка nginx конфигурации
echo "⚙️ Устанавливаем конфигурацию nginx..."
if [ "$HAS_SSL" = "true" ]; then
    echo "📋 SSL сертификаты найдены, обновляем конфигурацию с сохранением SSL..."
    # Копируем конфигурацию
    scp nginx-car-parts-tyres.conf $USER@$SERVER:$NGINX_CONFIG
    # Сразу обновляем SSL настройки в конфигурации
    ssh $USER@$SERVER "
        sed -i 's|ssl_certificate /etc/ssl/certs/ssl-cert-snakeoil.pem;|ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;|g' $NGINX_CONFIG
        sed -i 's|ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;|ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;|g' $NGINX_CONFIG
        
        # Добавляем недостающие SSL параметры если их нет
        if ! grep -q 'ssl_protocols' $NGINX_CONFIG; then
            # Проверяем наличие dhparam.pem и создаем если нужно
            if [ ! -f /etc/ssl/certs/dhparam.pem ]; then
                echo 'Создаем dhparam.pem...'
                openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
            fi
            sed -i '/ssl_certificate_key.*privkey.pem;/a\\    ssl_protocols TLSv1.2 TLSv1.3;\\    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA;\\    ssl_prefer_server_ciphers on;\\    ssl_dhparam /etc/ssl/certs/dhparam.pem;' $NGINX_CONFIG
        fi
    "
else
    echo "📋 SSL сертификаты не найдены, устанавливаем базовую конфигурацию..."
    scp nginx-car-parts-tyres.conf $USER@$SERVER:$NGINX_CONFIG
fi

# 6. Активация сайта
echo "� Активируем сайт..."
ssh $USER@$SERVER "ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/"

# 7. Установка SSL сертификата (если еще не установлен)
if [ "$HAS_SSL" = "false" ]; then
    echo "🔒 Устанавливаем SSL сертификат..."
    ssh $USER@$SERVER "
        # Сначала проверяем базовую конфигурацию
        nginx -t && systemctl reload nginx
        
        # Устанавливаем сертификат
        certbot --nginx -d $DOMAIN -d carpartstyres.maxmaster.nl --non-interactive --agree-tos --email admin@maxmaster.nl
    "
else
    echo "✅ SSL сертификат уже установлен, обновляем только конфигурацию"
fi

# 8. Проверка конфигурации nginx
echo "✅ Проверяем конфигурацию nginx..."
ssh $USER@$SERVER "nginx -t"

# 9. Перезагрузка nginx
echo "🔄 Перезагружаем nginx..."
ssh $USER@$SERVER "systemctl reload nginx"

# 10. Проверка статуса
echo "🌐 Проверяем статус сайта..."
if curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN | grep -q "200"; then
    echo "✅ Сайт успешно развернут и доступен по адресу: https://$DOMAIN"
else
    echo "⚠️ Возможны проблемы с доступностью сайта"
fi

echo "🎉 Деплой завершен!"
echo ""
echo "📋 Информация о сайте:"
echo "   🌍 Основной домен: https://$DOMAIN"
echo "   🔄 Редирект с: https://carpartstyres.maxmaster.nl"
echo "   📁 Директория: $SITE_DIR"
echo "   ⚙️ Конфигурация: $NGINX_CONFIG"
echo ""
echo "🛠️ Полезные команды:"
echo "   Логи nginx: ssh $USER@$SERVER 'tail -f /var/log/nginx/car-parts-tyres.*.log'"
echo "   Перезагрузка: ssh $USER@$SERVER 'systemctl reload nginx'"
echo "   Статус SSL: ssh $USER@$SERVER 'certbot certificates'"
