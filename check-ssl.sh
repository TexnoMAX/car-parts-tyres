#!/bin/bash

# GS Car Parts & Tyres - SSL Check Script
# Скрипт для проверки статуса SSL сертификатов

set -e

# Конфигурация
SERVER="ws.chaterbox.net"
USER="root"
DOMAIN="car-parts-tyres.maxmaster.nl"

echo "🔒 Проверяем SSL сертификаты для $DOMAIN..."

ssh $USER@$SERVER "
echo '📋 Статус сертификатов:'
certbot certificates

echo ''
echo '📅 Информация о сертификате:'
if [ -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    openssl x509 -in /etc/letsencrypt/live/$DOMAIN/fullchain.pem -text -noout | grep -A 2 'Validity'
else
    echo '❌ Сертификат не найден!'
fi

echo ''
echo '⚙️ Nginx конфигурация SSL:'
grep -A 5 -B 5 'ssl_certificate' /etc/nginx/sites-available/car-parts-tyres || echo 'SSL конфигурация не найдена'

echo ''
echo '🌐 Проверка доступности:'
curl -I https://$DOMAIN 2>/dev/null | head -1 || echo 'Сайт недоступен по HTTPS'
"

echo "✅ Проверка завершена!"
