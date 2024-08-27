import "./navbar.css";
function Navbar(props) {
  const hanelData = (e) => {
    // eslint-disable-next-line
    props.setSearchButton(false);
    // eslint-disable-next-line
    props.setFilterItem("");
    // eslint-disable-next-line
    props.setInput(e.target.value);
  };
  // eslint-disable-next-line
  if (props.searchButton == true) {
    // eslint-disable-next-line
    props.setActiveItem(null);
  }
  return (
    <div className="container">
      <div className="left-logo">
        <div className="left-inner-data">
          <div className="left-manue-bar">
            <img src="./navbar_images/manue.png" alt="" />
          </div>
          <div className="left-you-tube-icon-text">
            <div className="left-you-tube-icon">
              <img src="./navbar_images/Group.png" alt="" />
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
              <img src="./navbar_images/searching.png" alt="" />
            </div>
          </div>
          <div className="inner-voice-recorder">
            <img src="./navbar_images/speaking.png" alt="" />
          </div>
        </div>
        <div className="navbar-icons">
          <div className="live-icon">
            <img src="./navbar_images/svg11.png" alt="" />
          </div>
          <div className="notification-icon">
            <img src="./navbar_images/svg12.png" alt="" />
          </div>
          <div className="user-profile">
            <img src="./navbar_images/user_img.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
