const models = require('../../../models');

module.exports = async (root, { id }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  return models.todos.splice(index, 1);
};
