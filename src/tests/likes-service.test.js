
describe("create Like", () => {
    // sample user to insert
    const ripley = {
      username: "ellenripley",
      password: "lv426",
      email: "ellenripley@aliens.com",
    };
  
    // setup test before running test
    beforeAll(() => {
      // remove any/all users to make sure we create it in the test
      return deleteUsersByUsername(ripley.username);
    });
  
    // clean up after test runs
    afterAll(() => {
      // remove any data we created
      return deleteUsersByUsername(ripley.username);
    });
  
    test("can insert new users with REST API", async () => {
      // insert new user in the database
      const newUser = await createUser(ripley);
      // verify inserted user's properties match parameter user
      expect(newUser.username).toEqual(ripley.username);
      expect(newUser.password).toEqual(ripley.password);
      expect(newUser.email).toEqual(ripley.email);
    });
  });