import chai from "chai";
const { expect: chaiExcept } = chai;

describe("AUTH", () => {
  describe("Login/Register", () => {
    it("Can Login when new account registered", async () => {
      const newUser = {
        pseudo: "Test User",
        email: "test@email.com",
        password: "test",
      };
      const opts = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };

      await fetch("http://127.0.0.1:5000/api/users/register", opts);

      const res = await fetch("http://127.0.0.1:5000/api/users/login", opts);

      const data = await res.json();
      chaiExcept(data.user).to.equals(newUser.email);
      chaiExcept(data.token).to.exist;
    });
  });
});
