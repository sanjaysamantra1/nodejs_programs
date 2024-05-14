const models = require('../../../models');

module.exports = async (root, { id, input }, context) => {
  const index = models.users.findIndex((item) => item.id === id);
  const item = models.users.splice(index, 1);

  return models.users.push({
    ...item,
    ...input,
  });
};
