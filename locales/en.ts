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
    logout: 'Logout',
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
  authentication: {
    login: {
      title: 'Welcome back!',
      btnLabel: 'Dont have any account?',
      btnSubmit: 'Login',
      inputs: {
        email: 'Email',
        password: 'Password',
      },
      toast: {
        title: 'Welcome back! 😊',
      },
    },
    register: {
      title: 'Create an account',
      btnLabel: 'Already have an account?',
      btnSubmit: 'Create an account',
      inputs: {
        name: 'First name',
        lastName: 'Last name',
        patronymic: 'Patronymic',
        email: 'Email',
        password: 'Password',
      },
      toast: {
        title: 'Success 😀',
      },
    },
    validate: {
      required: 'Required',
      email: 'Invalid Email',
    },
    placeholders: {
      your: 'Your',
      choose: 'Choose',
      enter: 'Enter',
    },
    socials: {
      or: 'or',
    },
    errorPage: {
      title: 'Something went wrong!',
      btnLabel: 'Back to login',
    },
  },
  serverMessages: {
    invalidFields: 'Invalid fields!',
    invalidCredentials: 'Invalid Credentials!',
    emailInDifferentProvider: 'Email already use in different provider!',
    authErr: 'Authorized error',
    smtWentWrong: 'Something went wrong!',
    emailExist: 'Email already in use!',
    failedCreate: 'Failed to create {params}',
    failedToFetch: 'Failed to fetch {params}',
    failedToUpdate: 'Failed to update {params}',
    params: {
      user: 'user',
      users: 'users',
      chiefs: 'chiefs',
    },
  },
  userInfoForm: {
    title: 'Need more info about you',
    inputs: {
      lastName: 'Last name',
      patronymic: 'Patronymic',
      position: 'Job title',
      role: 'Role',
      chiefId: 'Chief',
      employees: 'Employees',
      btn: 'Save',
    },
    toast: {
      success: {
        title: 'Update was successfully!',
      },
      error: {
        title: 'Something went wrong!',
      },
    },
    placeholders: {
      your: 'Your',
      choose: 'Choose',
      enter: 'Enter',
    },
    validate: {
      required: 'Required',
    },
    roles: {
      CHIEF: 'CHIEF',
      EMPLOYEE: 'EMPLOYEE',
    },
  },
  multiSelect: {
    emptyTitle: 'No result was found',
    create: 'Create',
  },
  profilePage: {
    sidebar: {
      home: 'Home',
      profile: 'Profile',
      team: 'My Team',
      chats: 'Chats',
      gifts: 'Gifts',
    },
  },
} as const;
