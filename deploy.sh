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

# 4. Установка nginx конфигурации
echo "⚙️ Устанавливаем конфигурацию nginx..."
scp nginx-car-parts-tyres.conf $USER@$SERVER:$NGINX_CONFIG

# 5. Активация сайта
echo "🔗 Активируем сайт..."
ssh $USER@$SERVER "ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/"

# 6. Проверка конфигурации nginx
echo "✅ Проверяем конфигурацию nginx..."
ssh $USER@$SERVER "nginx -t"

# 7. Перезагрузка nginx
echo "🔄 Перезагружаем nginx..."
ssh $USER@$SERVER "systemctl reload nginx"

# 8. Установка SSL сертификата (если еще не установлен)
echo "🔒 Проверяем SSL сертификат..."
ssh $USER@$SERVER "
if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo '📋 Устанавливаем SSL сертификат...'
    certbot --nginx -d $DOMAIN -d carpartstyres.maxmaster.nl --non-interactive --agree-tos --email admin@maxmaster.nl
else
    echo '✅ SSL сертификат уже установлен'
fi
"

# 9. Проверка статуса
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
