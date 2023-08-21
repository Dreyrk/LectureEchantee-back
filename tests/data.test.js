import chai from "chai";
const { expect: chaiExcept } = chai;

describe("DATA", () => {
  describe("Manhwa", () => {
    it("GET /api/manhwa/id/:id should return manhwa with correct id", async () => {
      let testManhwa = await fetch("http://127.0.0.1:5000/api/manhwa/random");
      testManhwa = await testManhwa.json();
      const id = testManhwa.data._id;
      const res = await fetch(`http://127.0.0.1:5000/api/manhwa/id/${id}`);
      const data = await res.json();
      chaiExcept(data.data._id).to.equal(id);
    });
    it("POST /api/manhwa/create should create a new manhwa", async () => {
      const newManhwa = {
        title: "testManhwa",
        status: "Ongoing",
        synopsis: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        author: "Test Author",
        cover:
          "https://asura.nacm.xyz/wp-content/uploads/2021/07/solomaxlevelnewbie.jpg",
        genre: ["test", "test", "test"],
        chapters: [
          "https://asura.nacm.xyz/wp-content/uploads/2021/07/0000.jpg",
          "https://asura.nacm.xyz/wp-content/uploads/2021/07/0000.jpg",
          "https://asura.nacm.xyz/wp-content/uploads/2021/07/0000.jpg",
        ],
      };

      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newManhwa),
      };

      const res = await fetch("http://127.0.0.1:5000/api/manhwa/create", opts);

      chaiExcept(res.status).to.equals(201);
    });
    it("PUT /api/manhwa/:id/chapters should update chapters", async () => {
      const newChapters = {
        chapters: ["test1", "test2", "test3"],
      };
      const opts = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChapters),
      };

      let manhwa = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      manhwa = await manhwa.json();

      manhwa = manhwa.data[0];

      const res = await fetch(
        `http://127.0.0.1:5000/api/manhwa/${manhwa._id}/chapters`,
        opts
      );

      let data = await res.json();
      data = data.data;

      chaiExcept(res.status).to.equals(200);
      chaiExcept(data.chapters[-1]).to.equals(newChapters.chapters[-1]);
    });
    it("PUT /api/manhwa/:id/infos should update infos", async () => {
      const newInfos = {
        status: "Completed",
        rating: 4.6,
        comments: [
          {
            user: {
              pseudo: "TestMan",
              avatar:
                "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
              id: "666",
            },
          },
          {
            user: {
              pseudo: "TestMan2",
              avatar:
                "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
              id: "777",
            },
          },
        ],
      };
      const opts = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfos),
      };

      let manhwa = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      manhwa = await manhwa.json();

      manhwa = manhwa.data[0];

      const res = await fetch(
        `http://127.0.0.1:5000/api/manhwa/${manhwa._id}/infos`,
        opts
      );

      let data = await res.json();
      data = data.data;

      chaiExcept(res.status).to.equals(200);
      chaiExcept(data.status).to.equals(newInfos.status);
    });
    it("DELETE /api/manhwa/:id should delete manhwa", async () => {
      const opts = {
        method: "DELETE",
      };

      let manhwa = await fetch("http://127.0.0.1:5000/api/manhwa/all");
      manhwa = await manhwa.json();
      manhwa = manhwa.data[0];

      const res = await fetch(
        `http://127.0.0.1:5000/api/manhwa/${manhwa._id}`,
        opts
      );
      chaiExcept(res.status).to.equals(204);
    });
  });
});
