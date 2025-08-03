# 🚀 Инструкции по настройке GitHub для проекта Авто-Гриша

## 1. Создание репозитория на GitHub

1. Перейдите на https://github.com
2. Нажмите кнопку "New repository" (зеленая кнопка)
3. Заполните поля:
   - **Repository name**: `avto-grisha`
   - **Description**: `🚗 Сайт-визитка для торговли б/у шинами - React + Node.js`
   - Выберите **Public** или **Private**
   - НЕ ставьте галочки на "Add README" и "Add .gitignore" (они уже есть в проекте)

## 2. Подключение локального репозитория к GitHub

Выполните команды в терминале (находясь в корне проекта):

```bash
# Добавить удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/avto-grisha.git

# Проверить удаленные репозитории
git remote -v

# Отправить код на GitHub (первый push)
git push -u origin main
```

## 3. (Альтернативный способ) Использование GitHub CLI

Если у вас установлен GitHub CLI:

```bash
# Создать репозиторий и отправить код одной командой
gh repo create avto-grisha --public --source=. --remote=origin --push
```

## 4. Настройка для деплоя (опционально)

### Vercel (для Frontend)
1. Подключите GitHub репозиторий к Vercel
2. Настройте Build Command: `npm run build`
3. Настройте Output Directory: `dist`

### Railway/Heroku (для Backend) 
1. Подключите GitHub репозиторий
2. Настройте переменные окружения из `.env.example`
3. Укажите start command: `npm start` для папки `server`

## 5. Автоматические деплои

После настройки хостингов, каждый push в main ветку будет автоматически деплоить изменения.

## 6. Совместная разработка

```bash
# Клонирование репозитория
git clone https://github.com/YOUR_USERNAME/avto-grisha.git
cd avto-grisha

# Установка зависимостей
npm install
cd server && npm install

# Настройка переменных окружения
cp server/.env.example server/.env
# Отредактируйте server/.env

# Запуск проекта
npm run dev  # Frontend (в одном терминале)
cd server && npm run dev  # Backend (в другом терминале)
```

## 7. Полезные Git команды

```bash
# Проверить статус
git status

# Добавить изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push

# Получить изменения
git pull

# Создать новую ветку для фичи
git checkout -b feature/new-feature

# Переключиться на main
git checkout main
```

---

**🎉 Поздравляем! Ваш проект Авто-Гриша готов к разработке и деплою!**
