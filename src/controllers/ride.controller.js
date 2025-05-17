const rideService = require("../services/ride.service");
const handleAsync = require("../utils/handleAsync");
const HTTP_STATUS = require("../utils/HTTP_STATUS");
const redisClient = require("../utils/redisClient");

/**
 * @returns {null} clear first page from cache whatever the limit is
 */
const clearFirstPageRidesCache = async () => {
  let cursor = "0";

  do {
    const results = await redisClient.scan(cursor, {
      MATCH: "all_rides_page_1_limit_*",
      COUNT: 100,
    });

    cursor = results.cursor;

    const keys = Array.isArray(results.keys)
      ? results.keys.map((k) => String(k))
      : [];

    if (keys.length > 0) {
      console.log("About to delete these keys:", keys);
      await redisClient.del(...keys);
    }
  } while (cursor !== "0");
};
/**
 * @route GET /api/rides?page=1&limit=10
 * @param {req} request
 * @param {res} response
 * @param {next} nextFunction
 */
exports.createRide = handleAsync(async (req, res, next) => {
  const { riderId, driverId, from, to, status } = req.body;

  const ride = await rideService.createRide({
    riderId,
    driverId,
    from,
    to,
    status,
  });

  clearFirstPageRidesCache();

  res.status(HTTP_STATUS.CREATE).json({
    message: "ride created successfully",
    ride,
  });
});
exports.getRides = handleAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;

  const cacheKey = `all_rides_page_${page}_limit_${limit}`;

  let cached = null;

  // only cache first page
  if (page === 1) {
    cached = await redisClient.get(cacheKey);

    if (cached)
      return res.status(HTTP_STATUS.OK).json({
        message: "rides fetched successfuly",
        rides: JSON.parse(cached),
      });
  }

  const ridesFromDB = await rideService.getRides({ page, limit });

  // cache first page for 30 secs
  if (page === 1) {
    await redisClient.setEx(cacheKey, 30, JSON.stringify(ridesFromDB));
  }

  res.status(HTTP_STATUS.OK).json({
    message: "fetched and cached for 30s",
    rides: ridesFromDB,
  });
});
