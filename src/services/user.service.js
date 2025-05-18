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
const getAllUsers = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const users = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      name: true,
      username: true,
      email: true,
      type: true,
    },
  });

  return users;
};

const getAllDrivers = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const drivers = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      name: true,
      username: true,
      email: true,
      type: true,
    },
    where: {
      type: "DRIVER",
    },
  });

  return drivers;
};
const getAllRiders = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const riders = await prisma.user.findMany({
    skip,
    take: limit,
    select: {
      name: true,
      username: true,
      email: true,
      type: true,
    },
    where: {
      type: "RIDER",
    },
  });

  return riders;
};
