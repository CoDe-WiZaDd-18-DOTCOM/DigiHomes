import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useEffect } from "react";


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout, isLoading  } = useAuth0();
  const { validateLogin } = useAuthCheck();
  const navigate = useNavigate();

  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };
  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={150} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>

            <a href="mailto:jaswanthm811@gmail.com">Contact</a>

            {/* add property */}
            <div onClick={handleAddPropertyClick}>Add Property</div>
            {console.log("Auth0 Hook Output:", { isAuthenticated, user, isLoading })}
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            {/* login button */}

            
            
            {!isAuthenticated ? (
              <>
                {console.log("Rendering Login Button")}
                <button className="button" onClick={loginWithRedirect}>Login</button>
              </>
            ) : (
              <>
                {console.log("Rendering ProfileMenu", user)}
                <ProfileMenu user={user} logout={logout} />
              </>
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;