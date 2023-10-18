// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный email или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        edit: {
          error: 'Не удалось отредактировать пользователя',
          success: 'Пользователь успешно изменён',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удалён',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        edit: {
          error: 'Не удалось изменить статус',
          success: 'Статус успешно изменён',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус успешно удалён',
        },
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача успешно удалена',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
        },
      },
      accessError: 'Вы не можете редактировать или удалять другого пользователя',
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        statuses: 'Статусы',
        tasks: 'Задачи',
        labels: 'Метки',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        email: 'Email',
        password: 'Пароль',
        login: 'Вход',
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        firstname: 'Имя',
        lastname: 'Фамилия',
        fullname: 'Полное имя',
        email: 'Email',
        password: 'Пароль',
        createdAt: 'Дата создания',
        actions: 'Действия',
        edit: 'Изменить',
        save: 'Сохранить',
        delete: 'Удалить',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
        edit: 'Изменить',
        save: 'Изменить',
        delete: 'Удалить',
        new: {
          createStatus: 'Создать статус',
          create: 'Создать',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        status: 'Статус',
        creator: 'Автор',
        executor: 'Исполнитель',
        actions: 'Actions',
        labels: 'Метка',
        edit: 'Edit',
        save: 'Save',
        delete: 'Удалить',
        description: 'Описание',
        new: {
          createTask: 'Создать задачу',
          create: 'Создать',
        },
      },
      labels: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        actions: 'Действия',
        edit: 'Изменить',
        save: 'Изменить',
        delete: 'Удалить',
        new: {
          createLabel: 'Создать метку',
          create: 'Создать',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета',
          description: 'Практические курсы по программированию',
          more: 'Узнать больше',
        },
      },
      filter: {
        apply: 'Показать',
        createdByCurrentUser: 'Только мои задачи',
      },
    },
  },
};
