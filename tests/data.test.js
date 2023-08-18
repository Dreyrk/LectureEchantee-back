import chai from "chai";
const { expect: chaiExcept } = chai;

describe("DATA", () => {
  describe("Manhwa", () => {
    it("GET /api/manhwa/all should return an array of 38 manhwas", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      const data = await res.json();

      chaiExcept(data.data.length).to.equal(19);
    });
  });
});
