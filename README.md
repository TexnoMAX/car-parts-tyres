# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🚗 Авто-Гриша - Сайт-визитка для торговли б/у шинами

Современный сайт-визитка для продажи качественных б/у шин. Проект включает каталог товаров, систему фильтрации и форму обратной связи.

## 🚀 Технологии

**Frontend:**
- React 18 + TypeScript
- Vite (сборщик)
- CSS3 с адаптивным дизайном

**Backend:**
- Node.js + Express
- Multer (загрузка изображений)
- Nodemailer (отправка email)

## 📦 Установка и запуск

### Клонирование репозитория
```bash
git clone <repository-url>
cd GrishaAvto
```

### Запуск Frontend
```bash
npm install
npm run dev
```
Приложение будет доступно по адресу: http://localhost:5173

### Запуск Backend
```bash
cd server
npm install
cp .env.example .env
# Настройте переменные окружения в .env
npm run dev
```
Сервер будет запущен на порту: http://localhost:5000

## 🛠 Настройка

### Переменные окружения (server/.env)
```env
PORT=5000
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_EMAIL=avto.grisha@example.com
```

## 📁 Структура проекта

```
GrishaAvto/
├── src/                    # Frontend приложение
│   ├── components/         # React компоненты
│   │   ├── Header.tsx
│   │   └── TireCard.tsx
│   ├── types/             # TypeScript типы
│   ├── App.tsx            # Главный компонент
│   └── App.css            # Основные стили
├── server/                # Backend сервер
│   ├── index.js           # API сервер
│   ├── uploads/           # Загруженные изображения
│   └── package.json
├── public/                # Статические файлы
└── .github/               # GitHub конфигурация
    └── copilot-instructions.md
```

## 🎯 Основные функции

- ✅ Каталог б/у шин с подробной информацией
- ✅ Фильтрация по сезону, размеру и цене
- ✅ Карточки товаров с изображениями
- ✅ Форма обратной связи
- ✅ Адаптивный дизайн
- ✅ REST API для управления данными

## 🔧 API Endpoints

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/tires` | Получить список шин |
| GET | `/api/tires/:id` | Получить шину по ID |
| POST | `/api/tires` | Добавить новую шину |
| GET | `/api/company` | Информация о компании |
| POST | `/api/contact` | Отправить сообщение |

## 🎨 Дизайн

- **Цветовая схема**: Синие градиенты (#1e3c72, #2a5298)
- **Типографика**: System fonts для оптимальной загрузки
- **Responsive**: Поддержка всех устройств
- **UX**: Интуитивная навигация и взаимодействие

## 📱 Адаптивность

Сайт корректно отображается на:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

## 🚀 Деплой

### Frontend (Vercel/Netlify)
```bash
npm run build
# Загрузите папку dist
```

### Backend (Heroku/Railway)
```bash
cd server
# Настройте переменные окружения
# Деплой согласно документации хостинга
```

## 🔮 Планы развития

- [ ] Интеграция с реальной базой данных
- [ ] Система авторизации для администратора
- [ ] Корзина покупок
- [ ] Онлайн оплата
- [ ] Система отзывов
- [ ] Интеграция с CRM

## 👨‍💻 Разработка

```bash
# Запуск в режиме разработки
npm run dev          # Frontend
cd server && npm run dev  # Backend

# Сборка для продакшена
npm run build

# Превью продакшн версии
npm run preview
```

## 📄 Лицензия

MIT License - используйте код свободно для личных и коммерческих проектов.

## 📞 Контакты

- **Телефон**: +7 (xxx) xxx-xx-xx
- **Email**: avto.grisha@example.com
- **Время работы**: Пн-Пт: 9:00-18:00

---

*Создано с ❤️ для качественной торговли б/у шинами*

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
