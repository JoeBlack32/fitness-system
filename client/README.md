🚀 Правильная последовательность запуска проекта

📍 Шаг 1: Запуск PostgreSQL (Docker)
Открой Терминал 1 (PowerShell):
bash# Перейди в корневую папку проекта
cd C:\Users\poddu\OneDrive\Desktop\Programarea Declarativa\fitness-system

# Запусти PostgreSQL
docker-compose up -d postgres

# Проверь что контейнер запущен
docker ps
Ожидаемый результат:
CONTAINER ID   IMAGE              STATUS         PORTS                    NAMES
...            postgres:15-alpine Up             0.0.0.0:5432->5432/tcp   fitness_db
✅ Контейнер fitness_db должен быть в статусе "Up"

📍 Шаг 2: Запуск Backend сервера
Открой Терминал 2 (новое окно PowerShell):
bash# Перейди в папку server
cd C:\Users\poddu\OneDrive\Desktop\Programarea Declarativa\fitness-system\server

# Запусти backend в режиме разработки
npm run dev
Ожидаемый результат:
[INFO] ts-node-dev ver. 2.0.0
🚀 Server is running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000
✅ PostgreSQL connected successfully
✅ Database synchronized
✅ НЕ ЗАКРЫВАЙ этот терминал! Сервер должен работать постоянно.

📍 Шаг 3: Проверка что Backend работает
Открой браузер и перейди:
http://localhost:5000/health
Ожидаемый ответ:
json{
  "status": "OK",
  "message": "Fitness System API is running",
  "timestamp": "2025-10-08T..."
}
✅ Если видишь это - backend работает правильно!
❌ Если не открывается - вернись к Шагу 2, что-то пошло не так.

📍 Шаг 4: Запуск Frontend (React)
Открой Терминал 3 (третье окно PowerShell):
bash# Перейди в папку client
cd C:\Users\poddu\OneDrive\Desktop\Programarea Declarativa\fitness-system\client

# Запусти frontend
npm run dev
Ожидаемый результат:
VITE v5.x.x  ready in ... ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
✅ НЕ ЗАКРЫВАЙ этот терминал! Frontend должен работать постоянно.

📍 Шаг 5: Открой приложение в браузере
http://localhost:5173
Или:

Регистрация: http://localhost:5173/register
Вход: http://localhost:5173/login


📊 Итоговая картина (3 терминала):
┌─────────────────────────────────────────┐
│ Терминал 1: Docker (PostgreSQL)         │
│ $ docker-compose up -d postgres         │
│ ✅ fitness_db running                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Терминал 2: Backend (Node.js/Express)   │
│ $ cd server && npm run dev              │
│ ✅ Server running on port 5000          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Терминал 3: Frontend (React/Vite)       │
│ $ cd client && npm run dev              │
│ ✅ Vite running on port 5173            │
└─────────────────────────────────────────┘

🧪 Проверка что всё работает:
1. Backend Health Check
http://localhost:5000/health
Должен вернуть JSON с "status": "OK"
2. Frontend загружается
http://localhost:5173
Должна открыться страница приложения
3. Регистрация нового пользователя
http://localhost:5173/register

Введи имя, email, пароль
Нажми "Зарегистрироваться"
В консоли браузера (F12 → Network) должен быть запрос к /api/auth/register со статусом 201


❌ Если что-то не работает:
Проблема: "Cannot connect to database"
bash# Проверь Docker
docker ps

# Если нет контейнера, запусти
docker-compose up -d postgres
Проблема: "Port 5000 already in use"
bash# Останови процесс на порту 5000
# Или измени порт в server/.env:
PORT=5001
Проблема: "ERR_CONNECTION_REFUSED"

Проверь что backend запущен (Терминал 2)
Проверь http://localhost:5000/health