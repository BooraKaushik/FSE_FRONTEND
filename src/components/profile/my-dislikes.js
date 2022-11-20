import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";

const MyLikes = () => {
  const [likedTuits, setLikedTuis] = useState([]);
  const findTuitsIDislike = () =>
    service
      .findAllTuitsDislikedByUser("me")
      .then((tuits) => setLikedTuis(tuits));
  useEffect(findTuitsIDislike, []);

  return (
    <div>
      <Tuits tuits={likedTuits} refreshTuits={findTuitsIDislike} />
    </div>
  );
};
export default MyLikes;
