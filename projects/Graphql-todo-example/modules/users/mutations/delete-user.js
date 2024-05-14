const models = require('../../../models');

module.exports = async (root, { id }, context) => {
  const index = models.users.findIndex((item) => item.id === id);
  return models.users.splice(index, 1);
};
