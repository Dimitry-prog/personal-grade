export default {
  locales: {
    en: 'English',
    ru: 'Russian',
  },
  themes: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  auth: {
    login: 'Login',
    register: 'Sign up',
  },
  headerLink: {
    home: 'Home',
    info: 'Information',
    contacts: 'Contacts',
    profile: 'Profile',
  },
  contactsPage: {
    title: 'Contact Me',
    form: {
      title: 'Leave Me Your Info',
      name: 'Name',
      email: 'Email',
      msg: 'Message',
      btn: 'Send Letter',
    },
    validate: {
      required: 'Required',
      email: 'Invalid Email',
    },
  },
} as const;
