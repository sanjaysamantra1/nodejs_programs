const models = require('../../../models');

module.exports = async (root, { input }, context) => {
  return models.todos.push({ ...input });
};
