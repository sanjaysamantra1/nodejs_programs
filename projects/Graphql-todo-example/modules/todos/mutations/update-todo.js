const models = require('../../../models');

module.exports = async (root, { id, input }, context) => {
  const index = models.todos.findIndex((item) => item.id === id);
  const item = models.todos.splice(index, 1);

  return models.todos.push({
    ...item,
    ...input,
  });
};
