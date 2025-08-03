#!/bin/bash

# GS Car Parts & Tyres - SSL Renewal Script
# Скрипт для принудительного обновления SSL сертификатов

set -e

# Конфигурация
SERVER="ws.chaterbox.net"
USER="root"
DOMAIN="car-parts-tyres.maxmaster.nl"
NGINX_CONFIG="/etc/nginx/sites-available/car-parts-tyres"

echo "🔄 Принудительное обновление SSL сертификатов для $DOMAIN..."

ssh $USER@$SERVER "
echo '🗑️ Удаляем старые сертификаты...'
certbot delete --cert-name $DOMAIN --non-interactive || echo 'Сертификат не найден для удаления'

echo '📋 Создаем новые сертификаты...'
certbot --nginx -d $DOMAIN -d carpartstyres.maxmaster.nl --non-interactive --agree-tos --email admin@maxmaster.nl --force-renewal

echo '✅ Проверяем конфигурацию nginx...'
nginx -t

echo '🔄 Перезагружаем nginx...'
systemctl reload nginx

echo '🌐 Проверяем доступность:'
sleep 2
curl -I https://$DOMAIN 2>/dev/null | head -1 || echo 'Ошибка доступа к сайту'
"

echo "🎉 SSL сертификаты успешно обновлены!"
echo "🔍 Для проверки используйте: ./check-ssl.sh"
