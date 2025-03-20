import React from "react";
import { AuthStore } from "../../stores/AuthStore";
import LogoutBtn from "../buttons/logout/Logout";
import HomeButton from "../buttons/HomeButton/HomeButton";
import "./Header.css";

const Header = () => {
  const username = AuthStore((state) => state.username);
  const profilePicture = AuthStore((state) => state.profilePicture);
  
  return (
    <div id="header-div">
      <div id="welcome-div">
        <div id="welcome-note" className="welcome-note">
          <div className="user-info">
            <HomeButton/>
          {username && 
            <span id="display-username" className="display-username">
              Welcome, {username}
            </span>}

          <span id="display-picture" className="display-picture">
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile picture"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            )}
          </span>

          </div>
    
          <span>
            <LogoutBtn/>
          </span>
        </div>
      </div>
      <div id="nav-div"></div>
    </div>
  );
}

export default Header;