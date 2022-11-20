import React, { useEffect, useState } from "react";
import {
  createDislike,
  createLike,
  getDislikeCount,
  getLikeCount,
} from "../../services/likes-service";

const TuitStats = ({ tuit, likeTuit }) => {
  const [likes, updateLikes] = useState(0);
  const [dislikes, updateDislikes] = useState(0);
  const [likeObj, updateLikeObj] = useState({ liked: likes > 0 });
  const createLikefun = async (tid) => {
    await createLike("me", tid).then((res) => {
      updateLikeObj(res);
    });
    await getLikeCount(tuit._id).then((res) => {
      updateLikes(res);
    });
    await getDislikeCount(tuit._id).then((res) => updateDislikes(res));
  };
  const createDislikefun = async (tid) => {
    await createDislike("me", tid).then((res) => updateLikeObj(res));
    await getLikeCount(tuit._id).then((res) => {
      updateLikes(res);
    });
    await getDislikeCount(tuit._id).then((res) => updateDislikes(res));
  };
  useEffect(() => {
    getLikeCount(tuit._id).then((res) => {
      updateLikes(res);
      updateLikeObj({ liked: res > 0 });
    });
    getDislikeCount(tuit._id).then((res) => {
      updateDislikes(res);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span
          onClick={async () => {
            await likeTuit(tuit);
            await getLikeCount(tuit._id).then((res) => updateLikes(res));
            await getDislikeCount(tuit._id).then((res) => updateDislikes(res));
          }}
        >
          {tuit.stats.likes > 0 && (
            <i className="fas fa-heart" style={{ color: "red" }}></i>
          )}
          {tuit.stats.likes <= 0 && <i className="far fa-heart"></i>}
          {tuit.stats && tuit.stats.likes}
        </span>
      </div>
      <div className="col">
        <span
          onClick={() => {
            createLikefun(tuit._id);
          }}
        >
          {likeObj.liked && (
            <i className="fa-solid fa-thumbs-up" style={{ color: "blue" }}></i>
          )}
          {!likeObj.liked && (
            <i className="fa-solid fa-thumbs-up" style={{ color: "gray" }}></i>
          )}
          {likes}
        </span>
      </div>
      <div className="col">
        <span onClick={() => createDislikefun(tuit._id)}>
          {dislikes > 0 && (
            <i class="fa-solid fa-thumbs-down" style={{ color: "blue" }}></i>
          )}
          {dislikes <= 0 && (
            <i class="fa-solid fa-thumbs-down" style={{ color: "gray" }}></i>
          )}
          {dislikes}
        </span>
      </div>
      <div className="col">
        <i className="far fa-inbox-out"></i>
      </div>
    </div>
  );
};
export default TuitStats;
