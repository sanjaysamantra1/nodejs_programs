const models = require('../../../models');

module.exports = async (root, { id }, context) => {
  return models.users.find((item) => item.id === id);
};
