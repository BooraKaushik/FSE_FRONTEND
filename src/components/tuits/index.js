import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/auth-service";

const Tuits = ({ tuits = [], deleteTuit, refreshTuits }) => {
  const likeTuit = (tuit) =>
    service.profile().then((data) => {
      likesService
        .userTogglesTuitLikes("me", tuit._id)
        .then(refreshTuits)
        .catch((e) => alert(e));
    });

  return (
    <div>
      <ul>
        {tuits.map((tuit) => (
          <Tuit
            key={tuit._id}
            deleteTuit={deleteTuit}
            likeTuit={likeTuit}
            tuit={tuit}
          />
        ))}
      </ul>
    </div>
  );
};

export default Tuits;
