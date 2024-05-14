const models = require('../../../models');

module.exports = async (root, { input }, context) => {
  return models.users.push(input);
};
