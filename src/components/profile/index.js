import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import * as service from "../../services/auth-service";
import MyDislikes from "./my-dislikes";
import MyLikes from "./my-likes";
import MyTuits from "./my-tuits";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  // eslint-disable-next-line
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate("/login");
    }
    // eslint-disable-next-line 
  }, []);
  const logout = () => {
    service.logout().then(() => navigate("/login"));
  };
  return (
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>Logout</button>
      <br />
      <Link to="/profile/mytuits">Tuits</Link>
      <br />
      <Link to="/profile/tuits-and-replies">Tuits & replies</Link>
      <br />
      <Link to="/profile/media">Media</Link>
      <br />
      <Link to="/profile/mylikes">Likes</Link>
      <br />
      <Link to="/profile/mydislikes">Dislikes</Link>
      <br />
      <Routes>
        <Route path="/mytuits" element={<MyTuits />} />
        {/* <Route path="/tuits-and-replies"
               element={<TuitsAndReplies/>}/>
        <Route path="/media"
               element={<Media/>}/> */}
        <Route path="/mylikes" element={<MyLikes />} />
        <Route path="/mydislikes" element={<MyDislikes />} />
      </Routes>
    </div>
  );
};
export default Profile;
