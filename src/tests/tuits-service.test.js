import {
  createTuit,
  deleteTuit,
  findAllTuits,
  findTuitById,
} from "../services/tuits-service";
import {
  createUser,
  deleteUsersByUsername,
} from "../services/users-service";

describe("can create tuit with REST API", () => {
  // sample tuit to insert
  const ripley = {
    username: "ellenripley",
    password: "lv426",
    email: "ellenripley@aliens.com",
  };
  const tuit = {
    tuit: "Test Tuit",
    postedOn: "Dec 25, 2021",
    postedBy: "63555fc2db0f28f850820dcd",
  };

  // setup test before running test
  beforeAll(() => {
    // remove any/all users to make sure we create it in the test
    return deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    return deleteUsersByUsername(ripley.username);
  });

  test("can create tuit with REST API", async () => {
    const data = await createUser(ripley);
    tuit.postedBy = data._id;
    // insert new user in the database
    const newTuit = await createTuit(data._id, tuit);
    // verify inserted user's properties match parameter user
    expect(newTuit.tuit).toEqual(tuit.tuit);
    const date = new Date(newTuit.postedOn);
    expect(date).toEqual(new Date("2021-12-25T00:00:00.000Z"));
    expect(newTuit.postedBy).toEqual(tuit.postedBy);
    deleteTuit(newTuit._id);
  });
});

describe("can delete tuit wtih REST API", () => {
  // sample tuit to insert
  const ripley = {
    username: "ellenripley",
    password: "lv426",
    email: "ellenripley@aliens.com",
  };
  const tuit = {
    tuit: "Test Tuit",
    postedOn: "Dec 25, 2021",
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

  test("can create tuit with REST API", async () => {
    const data = await createUser(ripley);
    tuit.postedBy = data._id;
    // insert new user in the database
    const newTuit = await createTuit(data._id, tuit);

    const removeTuit = await deleteTuit(newTuit._id);
    expect(removeTuit.deletedCount).toEqual(1);
  });
});

describe("can retrieve a tuit by their primary key with REST API", () => {
  // sample tuit to insert
  const ripley = {
    username: "ellenripley",
    password: "lv426",
    email: "ellenripley@aliens.com",
  };
  const tuit = {
    tuit: "Test Tuit",
    postedOn: "Dec 25, 2021",
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

  test("can create tuit with REST API", async () => {
    const data = await createUser(ripley);
    tuit.postedBy = data._id;
    // insert new user in the database
    const newTuit = await createTuit(data._id, tuit);
    const fetchTuitId = await findTuitById(newTuit._id);
    expect(fetchTuitId.tuit).toEqual(tuit.tuit);
    const date = new Date(fetchTuitId.postedOn);
    expect(date).toEqual(new Date("2021-12-25T00:00:00.000Z"));
    expect(fetchTuitId.postedBy._id).toEqual(tuit.postedBy);
    await deleteTuit(newTuit._id);
  });
});

describe("can retrieve all tuits with REST API", () => {
  // TODO: implement this
  const ripley = {
    username: "ellenTomcat",
    password: "lv426",
    email: "ellenripley@aliens.com",
  };

  const tuit = {
    tuit: "Test_TUIT",
    postedOn: "Dec 25, 2021",
  };

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    const data = await createUser(ripley);
    tuit.postedBy = data._id;
    await createTuit(data._id, {
      ...tuit,
      postedOn: "Dec 25, 2021",
      postedBy: data._id,
    });
  });

  // clean up after test runs
  afterAll(() => {
    // remove any data we created
    return deleteUsersByUsername(ripley.username);
  });

  test("can create tuit with REST API", async () => {
    const tuitData = await findAllTuits();
    expect(tuitData.length).toBeGreaterThanOrEqual(1);

    // let's check each user we inserted
    const tuitsWeInserted = tuitData.find((t) => tuit.tuit === t.tuit);
    expect(tuitsWeInserted.tuit).toEqual(tuit.tuit);
    const date = new Date(tuitsWeInserted.postedOn);
    expect(date).toEqual(new Date("2021-12-25T00:00:00.000Z"));
    expect(tuitsWeInserted.postedBy.username).toEqual(ripley.username);
    await deleteTuit(tuitsWeInserted._id);
  });
});
