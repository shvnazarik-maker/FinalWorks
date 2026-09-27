=========================================


Назва проєкту:


I&myFriends - я і мої друзі має значення для кожного користувача як: я і мої друзі він, створений для підтримки зв'язків, спілкування, в ньому також є функціонал прослуховування музики, створення нотатків, але його функціональність буде тільки рости і розширюватися 


Ідея проєкту:


Основна ідея виникла ще з часів чатів, чатрікс, та аськи, взагалом з 2002-2003..., але завжди якось це відкладалося на потім, плюс нехватка потрібних знань для реалізації... Зараз певні знання набулися і набуваються і розвиваються і втілюються в реальність. 


Мета:


Основна мета проєкту - це спілкування та не дати можливість втрати зв'язку з потрібними людьми. Та в подальшому вдосконалити застосунок і надати можливість людям із фізичними вадами сприймати те що й досі не можливо було їм сприймати, загалом в застосунку в майбутньому будуть додані інші суттєві глобальні функції, застосунок розвинеться як для фізично здорових людей, так і для людей із різними фізичними вадами для них буде обміркована належна функціональність та логіка для сприйняття та зручності у користуванні,

але це поки що лише гіпотези, але це іде та лягає  на майбутні основни в етапах розвитку застосунку що залежить від подальших планів і правильних підходів до вирішення поставлених задач.


Технології:


HTML, CSS, JavaScript, Tailwind css, React.

В подальшому додадуться мови C++, Rust, Python

Проект написаний у VS Code.



Архітектура:


FinalProject/
│
├── src/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── app/
│   │   └── store/
│   │       ├── store.js
│   │       ├── selectors.js
│   │       │
│   │       └── slices/
│   │           ├── authSlice.js
│   │           ├── dataSlice.js
│   │           └── uiSlice.js
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MusicPlayer.jsx
│   │   └── Footer.jsx
│   │
│   ├── hooks/
│   │   ├── useAudioPlayer.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Friends.jsx
│   │   ├── Messages.jsx
│   │   ├── Music.jsx
│   │   ├── Photos.jsx
│   │   └── Notes.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   └── services/
│       ├── api.js
│       ├── authService.js
│       ├── storage.js
│       │
│       └── api/
│           ├── index.js
│           ├── http.js
│           ├── authApi.js
│           ├── usersApi.js
│           ├── friendsApi.js
│           ├── messagesApi.js
│           ├── musicApi.js
│           ├── photosApi.js
│           ├── notesApi.js
│           └── imageUrl.js
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── .gitignore
├── .oxlintrc.json
├── README.md
├── README_API_PROFILE.md
├── REFACTOR_NOTES.md
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js




Патерни проєктування

Container / Presentational
Custom Hooks
Redux Toolkit
Slice Pattern
Selectors
Persistence Pattern
Service Layer
API Abstraction
Axios Instance
Axios Interceptor
React Router
Route Parameters
Conditional Routing
Callback Pattern
Controlled Components
Conditional Rendering
Derived State
State Lifting
Centralized State Management
Local Component State
Shared State
Master–Detail Pattern
Selected Entity Pattern
Initial State via Props
Prop Drilling
Component Composition
Separation of Concerns
Repository / API Service Pattern
Adapter / Mapper Pattern
Error Handling
Async/Await
Promise-based API
Formik
Yup Validation
Toast Notification Pattern
Cleanup Pattern
Memoization
useCallback
useMemo
useRef
useEffect
useState
map
filter
find
Ternary / Conditional Expressions
Guard Clauses
Controlled File Upload
Multipart Form Data
JWT Authentication
Token-based Authentication
LocalStorage Persistence
SessionStorage Persistence
Fallback Data Pattern
Data Normalization
Feature-based API Modules
HTTP Client Abstraction
API Response Mapping
Error Boundary / Error Fallback 
Optimistic UI (не підтверджений)
Observer / Event Listener Pattern 

Патерни можуть додаватися або змінюватися в процесі розвитку проєкту. 


Функціонал

Реалізовано:

Базова структура проєкту
,

Реєстрація користувача
,

Авторизація
,

Робота з профілем
,

Додатковий функціонал
...


Планується:

Додати нові функції
,

Покращити архітектуру
,

Додати тести
,

Додати документацію по API...,

Оптимізувати продуктивність
....


Запуск проєкту:

Оскільки працював у VS Code

Щоб запустити проект потрібно спочатку :

переконайся, що маєш встановлений Git та

Visual Studio Code, але

проект можна відкрити і в інших програмах таких як: WebStorm, Sublime Text, Notepad++,  Cursor, IntelliJ IDEA, і так далі ...  у звичайному PowerShell / Command Prompt 

— сам React запускається командами npm run dev або npm start, редактор взагалі не обов’язковий.


Для початку створи папку, відкриваєш цю папку за допомогою програми VS Code в VS Code:

Відкриваєш програму, а в ній відкриваєш термінал тобто зверху є меню в ньому є Terminal натискаєш на нього з'являється  New Terminal натискаєш на -> New Terminal -> і в низу відкриється консоль, в цьому терміналі виконуєш по інструкції команди:

git clone

https://github.com/shvnazarik-maker/FinalWorks.git

потім:

cd FinalWorks

потім:

npm install

Встановлення пакету

node modules 

після встановлення...

наступним кроком залишається лише її запусти:

npm run dev

У самому терміналі програми з'явиться 

http://localhost:5173

Натискаєш на це посилання, одночасно Ctrl+ правою клавішею мишки робиш клік(клац), або виділяєш це посилання мишкою, натискаєш одночасно Ctrl+ Shift+C тобто копіюєш і вставляєш в веббраузер у адресний рядок, і натискаєш Enter або в залежності від браузера якщо біля нього є кнопка, перейти, Go, то на натискаєш на неї, і вона виконую дію Enter, в даному випадку має фокус на  підтвердження/перехід/відправлення/активувати/запустити після натиску на кнопку або просто Enter ти переходиш....і вуаля ти перейшов, вітаю на нашому на сайті I& myFriends


Отже:

В тебе має бути встановлений Git
.

Має бути встановлена відповідна програма, або можна в  PowerShell в консолі, терміналі...



Навчальна мета:

Цей проєкт створений насамперед для навчання та практики. Архітектура і функціонал можуть в подальшому змінюватися в процесі розвитку проєкту.


Майбутній розвиток:

Проєкт планується поступово розширювати:

Додати новий функціонал.


Покращити архітектуру.


Додати автоматизоване тестування.


Покращити документацію.


Оптимізувати код.



Ліцензія:


Проєкт створився в навчальних цілях. І в майбутньому буде поступово розвиватися та доповнюватися новим функціоналом.

