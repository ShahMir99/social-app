import React from "react"
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import AboutDeveloper from "./Pages/AboutDeveloper/AboutDeveloper";
import Profile from "./Pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateNew from "./Pages/CreateNew/CreateNew";
import FindFriend from "./Pages/FindFriend/FindFriend";
import { useSelector} from "react-redux";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import PreLoader from "./Components/PreLoader/PreLoader";


function App() {
  const user = useSelector((state) => state.auth.authData);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/aboutdeveloper" element={user ? <AboutDeveloper /> : <Navigate to="/auth" />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />}/>
          <Route path="/profile/:id/updateprofile" element={<UpdateProfile/>}/>
          <Route path="/new/post" element={user ? <CreateNew /> : <Navigate to="/auth" />}/>
          <Route path="/find/friend" element={user ? <FindFriend /> : <Navigate to="/auth" />}/>
          <Route path="/load" element={<PreLoader />}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </div>
      <div className="FullWidth">
        This App is Only For Andriod Version Not For PC
      </div>
    </>
  );
}

export default App;
