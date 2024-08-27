import "./left-menu.css";
import FirstBoxLeftMenu from "../../Constant/FirstBoxLeftMenu";
import SecondBoxLeftMenu from "../../Constant/SecondBoxLeftMenu";
import ThirdBoxLeftMenu from "../../Constant/ThirdBoxLeftMenu";

function LeftMenu() {
  return (
    <div className="menu-container">
      <div className="first-menu-box">
        {FirstBoxLeftMenu.map((item) => (
          <div key={item.id} className="menu-single-item">
            <div className="handel-icon-text">
              <div className="menu-icons">
                <img src={item.url} alt={item.name} />
              </div>
              <div className="menu-text">
                <span>{item.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="second-menu-box">
        {SecondBoxLeftMenu.map((item) => (
          <div key={item.id} className="menu-single-item">
            <div className="handel-icon-text">
              <div className="manu-icons">
                <img src={item.url} alt={item.name} />
              </div>
              <div className="menu-text">
                <span>{item.name}</span>
              </div>
            </div>
          </div>
        ))}
        <span id="show-more">Show more</span>
      </div>

      <div className="third-menu-box">
        <span>SUBSCRIPTIONS</span>
      </div>
      {ThirdBoxLeftMenu.map((item) => (
        <div key={item.id} className="menu-single-item">
          <div className="handel-icon-text">
            <div className="manu-icons">
              <img src={item.url} alt={item.name} />
            </div>
            <div className="handel-only-third-manu">
              <div className="menu-text">
                <span>{item.name}</span>
              </div>
              <div className="show-online-icon">
                <img src="./subscriber/Frame 33.png" alt="Subscriber Icon" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeftMenu;
