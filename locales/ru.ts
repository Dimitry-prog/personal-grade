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
} as const;
