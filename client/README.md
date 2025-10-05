# Fitness System - Client

Frontend приложение для системы управления тренировками на React + TypeScript + Vite.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
cd client
npm install
```

### Переменные окружения

Создайте файл `.env` в папке `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Запуск dev сервера

```bash
npm run dev
```

Приложение откроется на `http://localhost:3000`

### Сборка для production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📦 Структура проекта

```
client/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/           # Axios instance
│  ├─ assets/        # Изображения, иконки
│  ├─ components/    # React компоненты
│  ├─ contexts/      # React Context (Auth)
│  ├─ hooks/         # Custom hooks
│  ├─ pages/         # Страницы приложения
│  ├─ services/      # API сервисы
│  ├─ types/         # TypeScript типы
│  ├─ utils/         # Утилиты
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ tailwind.config.cjs
```

## 🛠 Технологии

- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Build tool
- **React Router** - Роутинг
- **Tailwind CSS** - Стилизация
- **Axios** - HTTP клиент
- **Recharts** - Графики
- **Lucide React** - Иконки
- **React Hot Toast** - Уведомления

## 📋 Доступные скрипты

- `npm run dev` - Запуск dev сервера
- `npm run build` - Сборка проекта
- `npm run preview` - Preview production сборки
- `npm run lint` - Проверка кода

## 🔧 Проблемы и решения

### Ошибка: Cannot find module

Убедитесь что установлены все зависимости:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ошибка TypeScript

Проверьте версию TypeScript:
```bash
npm install typescript@latest -D
```

### Порт 3000 занят

Измените порт в `vite.config.ts`:
```ts
server: {
  port: 3001, // или другой порт
}
```