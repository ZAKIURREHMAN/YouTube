import { useParams } from "react-router-dom";
import "./play-video.css";
import { useState, useContext } from "react";
import { counterContext } from "../../Context/AuthContext/ContextProvider";

function PlayVideo() {
  const { data, passData, hours, hoursView, viewNumber } =
    useContext(counterContext);
  const { id } = useParams();
  const [videoId, setVideoId] = useState(id);

  const changeVideoId = (item) => {
    setVideoId(item.id);
  };
  return (
    <div className="play-video-container">
      <div className="view-video">
        <iframe
          frameBorder="0"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>

        <div className="video-title">
          <p>
            <strong>{passData.snippet.title}</strong>
          </p>
        </div>
        <div className="view-icons">
          <div className="views">
            <p>
              {hoursView[0]} views &nbsp; &nbsp; {hoursView[1]} hours ago
            </p>
          </div>
          <div className="play-video-icons">
            <div className="play-video-like-icons">
              <i className="fa-regular fa-thumbs-up"></i>&nbsp;
              <strong>{hoursView[2]}</strong>
            </div>

            <div className="play-video-dislike-icons">
              <i className="fa-regular fa-thumbs-down"></i>&nbsp;
              <strong>DISLIKE</strong>
            </div>

            <div className="play-video-share-icons">
              <i className="fa-solid fa-share"></i>
              &nbsp;
              <strong>SHARE</strong>
            </div>

            <div className="play-video-download-icons">
              <i className="fa-solid fa-arrow-down"></i>
              &nbsp;
              <strong>DOWNLOAD</strong>
            </div>

            <div className="play-video-clip-icons">
              <i className="fa-solid fa-scissors"></i>
              &nbsp;
              <strong>CLIP</strong>
            </div>

            <div className="play-video-three-dots-icons">
              <i className="fa-solid fa-ellipsis"></i>
            </div>

            <hr />
          </div>
        </div>
        <div className="channel-details">
          <div className="play-video-logo-subscribe">
            <div className="logo-name">
              <div className="play-video-logo">
                <img src={hoursView[3]} alt="logo" />
              </div>
              <div className="channel-name-subscriber-number">
                {passData.snippet.channelTitle} <br />
                {hoursView[0]}
              </div>
            </div>
            <div className="play-video-subscribe-button">
              <button>SUBSCRIBE</button>
            </div>
          </div>
          <div className="play-video-description">
            <p>{passData.snippet.description.slice(0, 140) + "..."}</p>
          </div>
          <div className="show-more-button">
            <button>SHOW MORE</button>
          </div>
        </div>
      </div>
      <div className="video-suggestions">
        {data.map((item, index) => (
            <div
              key={item.id || item.snippet.channelId}
              className="play-video-right-said"
              onClick={() => changeVideoId(item)}
              >
              <div className="right-said-video-thumbnail">
                <img src={item.snippet.thumbnails.high.url} alt="thumbnail" />
                <div className="display-time">
                  <span>{hoursView[4][index]}</span>
                </div>
              </div>
              <div className="right-said-video-data">
                <div className="right-said-video-title">
                  <strong>{item.snippet.title}</strong>
                </div>
                <div className="right-said-you-tube-channel">
                  {item.snippet.channelTitle}
                </div>
                <div className="play-video-view-and-hours">
                  {viewNumber[item.id]}Views&nbsp; {hours[index]} hours ago
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default PlayVideo;
