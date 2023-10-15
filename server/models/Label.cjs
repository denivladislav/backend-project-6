// @ts-check
const { Model } = require('objection');
const objectionUnique = require('objection-unique');
// const path = require('path');
const BaseModel = require('./BaseModel.cjs');
const User = require('./User.cjs');

const unique = objectionUnique({ fields: ['name'] });

module.exports = class Label extends unique(BaseModel) {
  static get tableName() {
    return 'labels';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        creatorId: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const Task = require('./Task.cjs');

    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'labels.creatorId',
          to: 'users.id',
        },
      },
      task: {
        relation: Model.ManyToManyRelation,
        modelClass: Task,
        join: {
          from: 'labels.id',
          through: {
            from: 'taskLabels.labelId',
            to: 'taskLabels.taskId',
          },
          to: 'tasks.id',
        },
      },
    };
  }
};
