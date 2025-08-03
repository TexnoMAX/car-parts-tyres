# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🚗 GS Car Parts & Tyres - Многоязычный Лендинг

Современный адаптивный лендинг для GS Car Parts & Tyres с поддержкой трех языков: нидерландский, английский и русский.

## 🌐 Языки

- 🇳🇱 **Nederlands** (Нидерландский) - основной
- 🇬🇧 **English** (Английский)  
- 🇷🇺 **Русский**

## 🚀 Технологии

- **React 18** + TypeScript
- **Vite** (быстрая сборка)
- **CSS3** с адаптивным дизайном
- **Google Maps** интеграция
- Без внешних зависимостей (чистый React)

## 📱 Особенности

- ✅ **Полностью адаптивный дизайн** для всех устройств
- ✅ **Мгновенное переключение языков**
- ✅ **Плавная прокрутка** к секциям
- ✅ **Интерактивная карта** Google Maps
- ✅ **Прямые ссылки** для звонка и email
- ✅ **SEO-оптимизированный**
- ✅ **Современный UI/UX**

## 🏃‍♂️ Быстрый старт

### Установка
```bash
npm install
```

### Разработка
```bash
npm run dev
```
Откроется по адресу: http://localhost:5173

### Сборка для продакшена
```bash
npm run build
```

### Превью продакшен версии
```bash
npm run preview
```

## 📁 Структура проекта

```
src/
├── locales/
│   └── translations.ts    # Переводы на все языки
├── App.tsx               # Главный компонент
├── App.css              # Стили
└── main.tsx             # Точка входа
```

## 🎨 Дизайн

- **Цветовая схема**: Черный, желтый (#ffcc00), белый
- **Шрифт**: Arial, sans-serif (системный)
- **Градиенты**: Для фона секций
- **Тени**: Мягкие тени для карточек
- **Анимации**: Плавные hover эффекты

## � Контактная информация

- **Имя**: Shevchuk Grygorii (Шевчук Григорий)
- **Адрес**: Willeskop 180, 3421GW, Oudewater
- **Email**: sltiresbv@gmail.com
- **Телефон**: 06 413 736 51

## � Реквизиты

- **Банк**: ING BANK NV
- **IBAN**: NL35INGB0105700096
- **SWIFT**: INGBNL2A
- **BTW**: NL004996126B65
- **KVK**: 58650393

## 🚀 Деплой

### Vercel (рекомендуется)
1. Подключите репозиторий к Vercel
2. Настройки сборки устанавливаются автоматически

### Netlify
1. Подключите репозиторий к Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Загрузите содержимое папки dist
```

## 🔧 Кастомизация

### Добавление нового языка
1. Добавьте переводы в `src/locales/translations.ts`
2. Добавьте новый язык в тип `Language` в `App.tsx`
3. Добавьте кнопку переключения языка

### Изменение контактов
Отредактируйте данные в файле переводов:
```typescript
contact: {
  values: {
    name: "Ваше имя",
    address: "Ваш адрес",
    email: "your@email.com",
    phone: "ваш телефон"
  }
}
```

### Изменение стилей
Основные стили находятся в `src/App.css`:
- Цвета
- Шрифты  
- Размеры
- Анимации

## � SEO

- Мета-теги в `index.html`
- Семантическая HTML разметка
- Быстрая загрузка
- Mobile-first дизайн
- Structured data ready

## 🌍 Браузеры

Поддерживаются все современные браузеры:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Лицензия

MIT License - свободное использование для коммерческих проектов.

---

*Создано с ❤️ для GS Car Parts & Tyres*

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
