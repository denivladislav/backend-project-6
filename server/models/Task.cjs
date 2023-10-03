// @ts-check
const { Model } = require('objection');
const objectionUnique = require('objection-unique');
const User = require('./User.cjs');
const Status = require('./Status.cjs');
const BaseModel = require('./BaseModel.cjs');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      // labels: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: path.join(__dirname, 'Label'),
      //   join: {
      //     from: 'tasks.id',
      //     through: {
      //       from: 'task_labels.task_id',
      //       to: 'task_labels.label_id',
      //     },
      //     to: 'labels.id',
      //   },
      // },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'tasks.statusId',
          to: 'statuses.id',
        },
      },
    };
  }
};
