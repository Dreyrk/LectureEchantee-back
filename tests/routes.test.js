import chai from "chai";
const { expect: chaiExcept } = chai;

describe("ROUTES", () => {
  describe("Manhwa", () => {
    it("GET /api/manhwa/all", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      chaiExcept(res.status).to.equal(200);
    });
  });
});
