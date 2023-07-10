export const linksList = [
    { id: 0, route: '/not-found', children: '404 не найдено' },
    { id: 1, route: '/server-error', children: '500 ошибка сервера' },
    { id: 2, route: '/auth#login', children: 'Страница авторизации' },
    { id: 3, route: '/chats', children: 'Основной чат' },
    {
        id: 4,
        route: '/random-not-found-state-page',
        children: 'Любая несуществуюущая страница',
    },
    {
        id: 5,
        route: '/settings',
        children: 'Настройки',
    },
];
