import "./left-manue.css";
import FirstBoxLeftManueApi from "./FirstBoxLeftManueApi";
import SecondBoxLeftManue from "./SecondBoxLeftManue";
import ThirdBoxLeftManueApi from "./ThirdBoxLeftManueApi";
function LeftManue() {
  return (
    <div className="manue-container">
      <div className="first-manue-box">
        {FirstBoxLeftManueApi.map((item) => ( 
          <div key={item.id} >
            <div className="manue-single-item" key={item.id}>
              <div className="handel-icon-text">
                <div className="manu-icons">
                  <img src={item.url} alt="" />
                </div>
                <div className="manue-text">
                  <span>{item.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <div className="second-manue-box">
        {SecondBoxLeftManue.map((item) => (
          <div key={item.id} >
            <div className="manue-single-item">
              <div className="handel-icon-text">
                <div className="manu-icons">
                  <img src={item.url} alt="" />
                </div>
                <div className="manue-text">
                  <span>{item.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <span id="show-more">Show more</span>
      </div>

      <div className="third-manue-box">
        <span>SUBSCRIPTIONS</span>
      </div>
      {ThirdBoxLeftManueApi.map((item) => (
        <>
          <div className="manue-single-item" key={item.id}>
            <div className="handel-icon-text">
              <div className="manu-icons">
                <img src={item.url} alt="" />
              </div>
              <div className="handel-only-third-manu">
                <div className="manue-text">
                  <span>{item.name}</span>
                </div>
                <div className="show-online-icon">
                  <img src="./subscriber/Frame 33.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default LeftManue;
