import chai from "chai";
const { expect: chaiExcept } = chai;

import Manhwa from "../models/manhwa.js";
import main from "../db.js";

describe("ROUTES", () => {
  describe("Manhwa", () => {
    beforeEach(async () => {
      await main();
    });
    it("GET /api/manhwa/all should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/id/:id should return status 200", async () => {
      //Create a new manhwa
      await Manhwa.create({ title: "test" });
      const testManhwa = await Manhwa.findOne({ title: "test" }).select("_id");
      const id = testManhwa._id.toString();
      //fetch manhwa by id with the id of the new manhwa created
      const res = await fetch(`http://127.0.0.1:5000/api/manhwa/id/${id}`);
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/id/:id with a fake id should return 400 error", async () => {
      const fakeid = "fake-id";
      const res = await fetch(`http://127.0.0.1:5000/api/manhwa/id/${fakeid}`);
      chaiExcept(res.status).to.equal(400);
    });
    it("GET /api/manhwa/random should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/random");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/ongoing should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/ongoing");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/rating should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/rating");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/completed should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/completed");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/title should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/title");
      chaiExcept(res.status).to.equal(200);
    });
  });
});
