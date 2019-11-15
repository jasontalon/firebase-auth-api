require("dotenv").config();
const auth = require("./auth"),
  util = require("util"),
  crypto = require("crypto");

describe("firebase authentication", () => {
  it("should sign in anonymously", async () => {
    const response = await auth.signInAnonymously();

    expect(response).toEqual(expect.anything());

    console.log(util.inspect(response));
  });

  it("should sign in with email and password", async () => {
    const email = "test@jest.com",
      password = "password";

    const response = await auth.signIn(email, password);
    expect(response).toEqual(expect.anything());

    console.log(util.inspect(response));
  });

  it("should sign up with email and password", async () => {
    const email = `${crypto.randomBytes(3 * 4).toString("base64")}@jest.com`,
      password = "password";

    const response = await auth.signUp(email, password);

    expect(response).toEqual(expect.anything());

    console.log(util.inspect(response));
  });

  it("should refresh token", async () => {
    const anon = await auth.signInAnonymously();
    const newToken = await auth.refreshToken(anon.refreshToken);

    expect(newToken).toEqual(expect.anything());

    console.log(newToken);
  });

  it("should get user data", async () => {
    const anon = await auth.signIn("test@jest.com", "password");
    const userData = await auth.getUserData(anon.idToken);

    expect(userData).toEqual(expect.anything());

    console.log(userData);
  });
});
