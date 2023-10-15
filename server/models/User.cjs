// @ts-check
const { Model } = require('objection');
const objectionUnique = require('objection-unique');
const Task = require('./Task.cjs');
const Status = require('./Status.cjs');
const BaseModel = require('./BaseModel.cjs');
const Label = require('./Label.cjs');

const encrypt = require('../lib/secure.cjs');

const unique = objectionUnique({ fields: ['email'] });

module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        firstname: { type: 'string', minLength: 1, maxLength: 255 },
        lastname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1 },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }

  static get relationMappings() {
    return {
      status: {
        relation: Model.HasManyRelation,
        modelClass: Status,
        join: {
          from: 'users.id',
          to: 'statuses.creatorId',
        },
      },
      task: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.creatorId',
        },
      },
      task_executor: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.executorId',
        },
      },
      label: {
        relation: Model.HasManyRelation,
        modelClass: Label,
        join: {
          from: 'users.id',
          to: 'labels.creatorId',
        },
      },
    };
  }
};
