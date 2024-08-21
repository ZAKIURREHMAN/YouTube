import { useState, useEffect, useContext } from "react";
import "./display-data.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { counterContext } from "../../Context/AuthContext/ContextProvider";

function DisplayData() {
  const [data, setData] = useState([]);
  const [chanelLogo, setChanelLogo] = useState({});
  const [viewNumber, setviewNumber] = useState({});
  const [hours, setHours] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let handeDataPassing = [];
  let durationTimeArr = [];
  const contextState = useContext(counterContext);
  const { setpassSata, sethoursView, userLikes, timeDuration, infiniteFun } =
    useContext(counterContext);
  useEffect(() => {
    if (contextState && contextState.data) {
      setData(contextState.data);
    }
  }, [contextState]);

  useEffect(() => {
    if (contextState && contextState.chanelLogo) {
      setChanelLogo(contextState.chanelLogo);
    }
  }, [contextState.chanelLogo]);

  useEffect(() => {
    if (contextState && contextState.viewNumber) {
      setviewNumber(contextState.viewNumber);
    }
  }, [contextState.viewNumber]);

  useEffect(() => {
    if (contextState && contextState.hours) {
      setHours(contextState.hours);
    }
  }, [contextState.hours]);

  timeDuration.forEach((element) => {
    durationTimeArr.push(
      element.contentDetails.duration
        .slice(2, 6)
        .split("H")
        .join(":")
        .split("M")
        .join(":")
        .split("S")
        .join(":")
        .split("D")
        .join("00:00:00")
    );
  });

  let storeArr = [];
  data.map((item) => {
    storeArr.push(item.id.videoId || item.id);
  });

  const sendData = (item, index) => {
    setpassSata(item);
    handeDataPassing.push(viewNumber[storeArr[index]]);
    handeDataPassing.push(hours[index]);
    handeDataPassing.push(userLikes[index]);
    handeDataPassing.push(chanelLogo[item.snippet.channelId]);
    handeDataPassing.push(durationTimeArr);
    sethoursView(handeDataPassing);
  };

  return (
    <div className="display-data-container">
      <InfiniteScroll
        dataLength={data.length}
        next={infiniteFun}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item, index) => (
            <Link
              to={`/playvideo/${item.id.videoId || item.id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={item.id.videoId || item.id}
            >
              <div
                className="display-video"
                onClick={() => sendData(item, index)}
              >
                <div className="video-thumbnail">
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                  />
                </div>
                <div className="chanel-logo-video-name">
                  <div className="chanel-logo">
                    {chanelLogo[item.snippet.channelId] ? (
                      <img
                        src={chanelLogo[item.snippet.channelId]}
                        alt={chanelLogo[item.snippet.title]}
                      />
                    ) : (
                      "no img"
                    )}
                  </div>
                  <div className="video-name">
                    <div className="video-text">
                      <span>{item.snippet.title}</span>
                    </div>
                    <div className="you-tube-chanel-name">
                      <span>{item.snippet.channelTitle}</span>
                    </div>
                    <div className="view-hours">
                      <div className="view">
                        <span>{viewNumber[storeArr[index]] || "0"}Views</span>
                      </div>
                      <div className="hours">
                        <span>{hours[index]}hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="time-duration">{durationTimeArr[index]}</div>
                </div>
              </div>
            </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default DisplayData;
