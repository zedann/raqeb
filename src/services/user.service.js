const prisma = require("../utils/prisma");

/**
 *
 * @param {Object} data - User data
 * @returns {Promise<Object>} The created User
 */
const createUser = async (user) => {
  return prisma.user.create({
    data: user,
  });
};
