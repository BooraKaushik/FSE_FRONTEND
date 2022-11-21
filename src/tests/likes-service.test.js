import {
  createDislike,
  createLike,
  getDislikeCount,
  getLikeCount,
  unLike,
} from "../services/likes-service";
import { createTuit, deleteTuit } from "../services/tuits-service";

describe("Get Likes count", () => {
  // sample like
  test("Get Likes count", async () => {
    const tuit = await createTuit("6378dc2ba055f5cd7f71b054", {
      tuit: "@TESTTSTS Dragon spacecraft returns to Earth with @ISS_Research that could help us better understand neurodegenerative diseases, gene expression, & muscle atrophy. Undocking from the @Space_Station is at 9:05am ET (13:05 UT). Watch:",
      postedOn: "Dec 25, 2021",
      postedBy: "6378dc2ba055f5cd7f71b054",
    });
    const data = await getLikeCount("6369db36822dab252876cf11");
    await deleteTuit(tuit._id);
    expect(data).toBe(0);
  });
});

describe("Get Dislikes count", () => {
  // sample dislike
  test("Get Dislikes count", async () => {
    const tuit = await createTuit("6378dc2ba055f5cd7f71b054", {
      tuit: "@TESTTSTS Dragon spacecraft returns to Earth with @ISS_Research that could help us better understand neurodegenerative diseases, gene expression, & muscle atrophy. Undocking from the @Space_Station is at 9:05am ET (13:05 UT). Watch:",
      postedOn: "Dec 25, 2021",
      postedBy: "6378dc2ba055f5cd7f71b054",
    });
    const data = await getDislikeCount(tuit._id);
    await deleteTuit(tuit._id);
    expect(data).toBe(0);
  });
});

describe("Create Like", () => {
  // sample dislike
  test("Create Like", async () => {
    const tuit = await createTuit("6378dc2ba055f5cd7f71b054", {
      tuit: "@TESTTSTS Dragon spacecraft returns to Earth with @ISS_Research that could help us better understand neurodegenerative diseases, gene expression, & muscle atrophy. Undocking from the @Space_Station is at 9:05am ET (13:05 UT). Watch:",
      postedOn: "Dec 25, 2021",
      postedBy: "6378dc2ba055f5cd7f71b054",
    });
    const data = await createLike("6378dc2ba055f5cd7f71b054", tuit._id);
    await unLike("6378dc2ba055f5cd7f71b054", tuit._id);
    await deleteTuit(tuit._id);
    expect(data.likedBy).toEqual("6378dc2ba055f5cd7f71b054");
    expect(data.tuit).toEqual(tuit._id);
    expect(data.liked).toEqual(true);
  });
});

describe("Create Disike", () => {
  // sample dislike
  test("Create Dislike", async () => {
    const tuit = await createTuit("6378dc2ba055f5cd7f71b054", {
      tuit: "@TESTTSTS Dragon spacecraft returns to Earth with @ISS_Research that could help us better understand neurodegenerative diseases, gene expression, & muscle atrophy. Undocking from the @Space_Station is at 9:05am ET (13:05 UT). Watch:",
      postedOn: "Dec 25, 2021",
      postedBy: "6378dc2ba055f5cd7f71b054",
    });
    const data = await createDislike("6378dc2ba055f5cd7f71b054", tuit._id);
    await unLike("6378dc2ba055f5cd7f71b054", tuit._id);
    await deleteTuit(tuit._id);
    expect(data.likedBy).toEqual("6378dc2ba055f5cd7f71b054");
    expect(data.tuit).toEqual(tuit._id);
    expect(data.liked).toEqual(false);
  });
});
