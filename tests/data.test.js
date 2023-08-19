import chai from "chai";
const { expect: chaiExcept } = chai;

describe("DATA", () => {
  describe("Manhwa", () => {
    it("GET /api/manhwa/all should return an array of 19 manhwas", async () => {
      const res = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      const data = await res.json();
      chaiExcept(data.data.length).to.equal(19);
    });
    it("GET /api/manhwa/id/:id should return manhwa with correct id", async () => {
      let testManhwa = await fetch("http://127.0.0.1:5000/api/manhwa/random");
      testManhwa = await testManhwa.json();
      const id = testManhwa.data._id;
      const res = await fetch(`http://127.0.0.1:5000/api/manhwa/id/${id}`);
      const data = await res.json();
      chaiExcept(data.data._id).to.equal(id);
    });
  });
});
