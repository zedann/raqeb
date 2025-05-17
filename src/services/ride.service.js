const prisma = require("../utils/prisma");

/**
 *
 * @param {Object} data
 * @param {String} data.riderId
 * @param {String} data.driverId
 * @param {String} data.from
 * @param {String} data.to
 * @param {String} data.status
 * @returns {Promise<Object>} The Created Ride
 */
const createRide = async (data) => {
  const createdRide = await prisma.ride.create({
    data,
  });

  return createdRide;
};

/**
 * @returns {Promise<Array<Object>>} all rides with riders and drivers
 */
const getRides = async ({ page, limit }) => {
  const skip = (page - 1) * limit;
  const allRides = await prisma.ride.findMany({
    skip,
    take: limit,
    include: {
      rider: true,
      driver: true,
    },
  });

  return allRides;
};

module.exports = { createRide, getRides };
