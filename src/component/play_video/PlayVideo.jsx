import { useParams } from "react-router-dom";
import "./play-video.css";
import { useState } from "react";
function PlayVideo(props) {
  const { id } = useParams();
  const [videoId, setVideoId] = useState(id);
  //eslint-disable-next-line
  console.log("This is play Video ", props.hoursView[4][0]);
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

        <div className="video-titel">
          <p>
            {/* eslint-disable-next-line */}
            <strong>{props.passData.snippet.title}</strong>
          </p>
        </div>
        <div className="view-icons">
          <div className="views">
            <p>
              {/* eslint-disable-next-line */}
              {props.hoursView[0]} views &nbsp; &nbsp; {props.hoursView[1]}{" "}
              hours ago
            </p>
          </div>
          <div className="play-video-icons">
            <div className="play-video-like-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-regular fa-thumbs-up"></i>
              &nbsp;
              {/* eslint-disable-next-line */}
              <strong>{props.hoursView[2]}</strong>
            </div>

            <div className="play-video-dislike-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-regular fa-thumbs-down"></i>
              &nbsp;
              <strong>DISLIKE</strong>
            </div>

            <div className="play-video-share-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-solid fa-share"></i>
              &nbsp;
              <strong>SHARE</strong>
            </div>

            <div className="play-video-download-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-solid fa-arrow-down"></i>
              &nbsp;
              <strong>DOWNLOAD</strong>
            </div>

            <div className="play-video-clip-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-solid fa-scissors"></i>
              &nbsp;
              <strong>CLIP</strong>
            </div>

            <div className="play-video-three-dots-icons">
              {/* eslint-disable-next-line */}
              <i class="fa-solid fa-ellipsis"></i>
            </div>

            <hr />
          </div>
        </div>
        <div className="channel-details">
          <div className="play-video-logo-subscribe">
            <div className="logo-name">
              <div className="play-video-logo">
                {/* eslint-disable-next-line */}
                <img src={props.hoursView[3]} alt="" />
              </div>
              <div className="channel-name-subscriber-number">
                {/* eslint-disable-next-line */}
                {props.passData.snippet.channelTitle} <br />
                {/* eslint-disable-next-line */}
                {props.hoursView[0]}
              </div>
            </div>
            <div className="play-video-subscribe-button">
              <button>SUBSCRIBE</button>
            </div>
          </div>
          <div className="play-video-describtion">
            {/* eslint-disable-next-line */}
            <p>{props.passData.snippet.description.slice(0, 140) + "..."}</p>
          </div>
          <div className="show-more-button">
            <button>SHOW MORE</button>
          </div>
        </div>
      </div>
      <div className="video-suggestions">
        {/* eslint-disable-next-line */}
        {props.playVideoData.map((item, index) => (
          <>
            <div
              className="play-video-right-said-"
              onClick={() => {
                setVideoId(item.id.videoId);
              }}
            >
              <div className="right-said-video-tumbnil">
                <img src={item.snippet.thumbnails.high.url} alt="" />
                <div className="display-time">
                  {/* eslint-disable-next-line */}
                  <span>{props.hoursView[4][index]}</span>
                </div>
              </div>
              <div className="right-said-video-data">
                <div className="right-said-video-tital">
                  <strong>{item.snippet.title}</strong>
                </div>
                <div className="right-said-you-tube-channel">
                  {item.snippet.channelTitle}
                </div>
                <div className="play-video-view-and-hours">
                  {/* eslint-disable-next-line */}
                  {props.playVideoView[item.id]}Views&nbsp;{" "}
                  {/* eslint-disable-next-line */}
                  {props.playVideoHours[index]} hours ago
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default PlayVideo;
