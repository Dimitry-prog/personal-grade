export default {
  locales: {
    en: 'Английский',
    ru: 'Русский',
  },
  themes: {
    light: 'Светлая',
    dark: 'Темная',
    system: 'Система',
  },
  auth: {
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
  },
  headerLink: {
    home: 'Главная',
    info: 'Информация',
    contacts: 'Контакты',
    profile: 'Профиль',
  },
  contactsPage: {
    title: 'Свяжитесь со Мной',
    form: {
      title: 'Оставьте свою информацию',
      name: 'Имя',
      email: 'Email',
      msg: 'Сообщение',
      btn: 'Отправить письмо',
    },
    validate: {
      required: 'Обязательное поле',
      email: 'Неверный Email',
    },
  },
  authentication: {
    login: {
      title: 'Добро пожаловать!',
      btnLabel: 'Еще не зарегестрированы?',
      btnSubmit: 'Войти',
      inputs: {
        email: 'Email',
        password: 'Пароль',
      },
      toast: {
        title: 'С возвращением! 😊',
      },
    },
    register: {
      title: 'Создать аккаунт',
      btnLabel: 'Уже имеете аккаунт?',
      btnSubmit: 'Зарегистрироваться',
      inputs: {
        name: 'Имя',
        lastName: 'Фамилия',
        patronymic: 'Отчество',
        email: 'Email',
        password: 'Пароль',
      },
      toast: {
        title: 'Успех 😀',
      },
    },
    validate: {
      required: 'Обязательное поле',
      email: 'Неверный Email',
    },
    placeholders: {
      your: 'Ваше',
      choose: 'Выберите',
      enter: 'Введите',
    },
    socials: {
      or: 'или',
    },
    errorPage: {
      title: 'Что-то пошло не так!',
      btnLabel: 'Вернуться к авторизации',
    },
  },
  serverMessages: {
    invalidFields: 'Неверные поля!',
    invalidCredentials: 'Неверные данные!',
    emailInDifferentProvider: 'Электронная почта уже используется у другого провайдера!',
    authErr: 'Ошибка авторизации',
    smtWentWrong: 'Что-то пошло не так!',
    emailExist: 'Этот электронный адрес уже занят!',
    failedCreate: 'Не удалось создать {params}',
  },
} as const;
