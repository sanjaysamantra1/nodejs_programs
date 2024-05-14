const models = require('../../../models');

module.exports = async (root, { id }, context) => {
  return models.todos.find((item) => item.id === id);
};
