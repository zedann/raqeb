const request = require("supertest");
const app = require("../src/app");
const HTTP_STATUS = require("../src/utils/HTTP_STATUS");
describe("Ride Api", () => {
  const riderId = "7c4ec8d0-71ad-4f8d-a1ae-d6b985bf8df5";
  const driverId = "a9faee20-50a2-4461-8ed0-3c2c3e4234fd";

  describe("create new ride", () => {
    it("should create new ride and return ride object", async () => {
      const payload = {
        riderId,
        driverId,
        from: "nasr city , cairo",
        to: "6th of october , giza",
        status: "REQUESTED",
      };
      const { statusCode, body } = await request(app)
        .post("/api/rides")
        .send(payload);

      expect(statusCode).toBe(HTTP_STATUS.CREATE);
      // console.log(body)
      expect(body.ride.status).toBe("REQUESTED");
    });
  });

  describe("get rides on page 1 limit 10", () => {
    it("should return rides with 10 results", async () => {
      const { statusCode, body } = await request(app).get(
        "/api/rides?page=1&limit=10"
      );

      console.log(body);

      expect(statusCode).toBe(HTTP_STATUS.OK);
      expect(parseInt(body.rides.length)).toBeLessThanOrEqual(10);
      expect(Array.isArray(body.rides)).toBe(true);
    });
  });
});
