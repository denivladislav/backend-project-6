// @ts-check

export default {
  translation: {
    appName: 'Task manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to change user data',
          success: 'User data changed successfully',
        },
        delete: {
          error: 'Failed to delete user',
          success: 'User deleted successfully',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create status',
          success: 'Status created successfully',
        },
        edit: {
          error: 'Failed to change status',
          success: 'Status changed successfully',
        },
        delete: {
          error: 'Failed to delete status',
          success: 'Status deleted successfully',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create task',
          success: 'Task created successfully',
        },
        edit: {
          error: 'Failed to edit task',
          success: 'Task edited successfully',
        },
        delete: {
          error: 'Failed to delete task',
          success: 'Task deleted successfully',
        },
      },
      labels: {
        create: {
          error: 'Failed to create label',
          success: 'Label created successfully',
        },
        edit: {
          error: 'Failed to edit label',
          success: 'Label edited successfully',
        },
        delete: {
          error: 'Failed to delete label',
          success: 'Label deleted successfully',
        },
      },
      accessError: 'Access denied! You can not edit or delete another user',
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        email: 'Email',
        password: 'Password',
        login: 'Login',
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      users: {
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        fullname: 'Full name',
        email: 'Email',
        password: 'Password',
        createdAt: 'Created at',
        actions: 'Actions',
        edit: 'Edit',
        save: 'Save',
        delete: 'Delete',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        actions: 'Actions',
        edit: 'Edit',
        save: 'Save',
        delete: 'Delete',
        new: {
          createStatus: 'Create status',
          create: 'Create',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        status: 'Status',
        statusId: 'Status ID',
        creator: 'Creator',
        creatorId: 'Creator ID',
        executor: 'Executor',
        executorId: 'Executor ID',
        actions: 'Actions',
        labels: 'Labels',
        edit: 'Edit',
        save: 'Save',
        delete: 'Delete',
        description: 'Description',
        new: {
          createTask: 'Create task',
          create: 'Create',
        },
      },
      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        actions: 'Actions',
        edit: 'Edit',
        save: 'Save',
        delete: 'Delete',
        description: 'Description',
        new: {
          createLabel: 'Create label',
          create: 'Create',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      filter: {
        apply: 'Apply',
        createdByCurrentUser: 'Created by me',
      },
    },
  },
};
