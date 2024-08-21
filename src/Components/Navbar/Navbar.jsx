import "./navbar.css";
import { useContext } from "react";
import { counterContext } from "../../Context/AuthContext/ContextProvider";
function Navbar(props) {
  const {setinput} = useContext(counterContext)

  const hanelData = (e) => {
    setinput(e.target.value);
  };
  return (
    <div className="container">
      <div className="left-logo">
        <div className="left-inner-data">
          <div className="left-menu-bar">
            <img src="./navbar_images/menu.png" alt="menu" />
          </div>
          <div className="left-you-tube-icon-text">
            <div className="left-you-tube-icon">
              <img src="./navbar_images/Group.png" alt="group" />
            </div>
            <div className="left-you-tube-text">YouTube</div>
          </div>
        </div>
      </div>
      <div className="searching-bar-icons">
        <div className="searching-bar">
          <div className="inner-searching-bars">
            <div className="searching-input">
              <input type="text" placeholder="Search" onChange={hanelData} />
            </div>
            {/* eslint-disable-next-line */}
            <div
              className="searching-button"
              // eslint-disable-next-line
              onClick={() => props.setSearchButton(true)}
            >
              <img src="./navbar_images/searching.png" alt="search" />
            </div>
          </div>
          <div className="inner-voice-recorder">
            <img src="./navbar_images/speaking.png" alt="speak" />
          </div>
        </div>
        <div className="navbar-icons">
          <div className="live-icon">
            <img src="./navbar_images/svg11.png" alt="svg11" />
          </div>
          <div className="notification-icon">
            <img src="./navbar_images/svg12.png" alt="svg12" />
          </div>
          <div className="user-profile">
            <img src="./navbar_images/user_img.jpeg" alt="user img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
