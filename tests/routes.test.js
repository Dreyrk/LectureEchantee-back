import chai from "chai";
const { expect: chaiExcept } = chai;

import Manhwa from "../models/manhwa.js";

describe("ROUTES", () => {
  describe("Manhwa", () => {
    it("GET /api/manhwa/all should return status 200", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      chaiExcept(res.status).to.equal(200);
    });
    it("GET /api/manhwa/id/:id should return status 200", async () => {
      let testManhwa = await fetch("http://127.0.0.1:5000/api/manhwa/random");
      testManhwa = await testManhwa.json();
      const id = testManhwa.data._id;
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
