const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/i;

const messageValidationError = 'Ошибка. Проверьте вводимые данные';
const messageNeedLogin = 'Необходимо авторизироваться';
const messageServerError = 'Ошибка на сервере';
const messageWrongLoginData = 'Неправильные почта или пароль';
const messageUrlNotFound = 'Путь не найден';
const messageFilmNotFound = 'Фильм не найден';
const messageFilmDeleteError = 'Нельзя удалить чужой фильм';
const messageFilmIsDeleted = 'Фильм удален';
const messageEmailAlreadyExist = 'Пользователь с таким Email уже существует';
const messageUserNotFound = 'Пользователь не найден';
const messageUserLogout = 'Пользователь вышел из сессии';

module.exports = {
  urlRegex,
  messageValidationError,
  messageNeedLogin,
  messageServerError,
  messageWrongLoginData,
  messageUrlNotFound,
  messageFilmNotFound,
  messageFilmDeleteError,
  messageFilmIsDeleted,
  messageEmailAlreadyExist,
  messageUserNotFound,
  messageUserLogout,
};
