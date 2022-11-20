import { useEffect, useState } from "react";
import { findTuitByUser } from "../../services/tuits-service";
import Tuits from "../tuits";
import * as service from "../../services/auth-service";

const MyTuits = () => {
  const [tuits, setTuits] = useState([]);
  const findMyTuits = () => {
    service.profile().then((data) => {
      findTuitByUser(data._id).then((tuits) => setTuits(tuits));
    });
  };
  useEffect(findMyTuits, []);
  const deleteTuit = (tid) => deleteTuit(tid).then(findMyTuits);
  return <Tuits tuits={tuits} deleteTuit={deleteTuit} />;
};

export default MyTuits;
