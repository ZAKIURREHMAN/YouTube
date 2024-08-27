import { useState, useEffect, useMemo } from "react";
import "./display-data.css";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
function DisplayData(props) {
  const [data, setData] = useState([]);
  const [chanelLogo, setChanelLogo] = useState({});
  const [viewNumber, setviewNumber] = useState({});
  const [hours, setHours] = useState([]);
  const [scrolling, setScrolling] = useState(5);
  //eslint-disable-next-line
  const [hasMore, setHasMore] = useState(true);
  const [userLikes, setUeserLikes] = useState([]);
  const [timeDuration, setTimeDuration] = useState([]);

  let handeDataPassing = [];
  let durationTimeArr = [];

  const Key = "AIzaSyDkR_sa-2Lnf_kmPj7TpU-83eAByCqGuog";
  const currentKey = useMemo(() => Key, []);

  const cache = useMemo(() => ({}), []);
  const getCachedData = async (url, params) => {
    const cachKey = JSON.stringify({ url, params });
    if (cache[cachKey]) {
      return cache[cachKey];
    }
    try {
      const response = await axios.get(url, { params });
      cache[cachKey] = response.data;
      return response.data;
    } catch (err) {
      console.log("This is cach data", err);
    }
  };
  const handelApi = async () => {
    try {
      const response = await getCachedData(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          part: "snippet",
          chart: "mostPopular",
          maxResults: 5,
          key: currentKey,
        }
      );
      const result = response.items;
      setData((prev) => [...prev, ...result]);
      setScrolling(scrolling + 5);
    } catch (err) {
      console.log("This is main api which is Data ..", err);
    }
  };

  useEffect(() => {
    handelApi();
    //eslint-disable-next-line
  }, []);
  if (data) {
    //eslint-disable-next-line
    props.handelPlyaVideoData(data);
  }
  let timerId = data
    .map((item) => item.id.videoId || item.id)
    .slice(0, 50)
    .join(",");

  useEffect(() => {
    const handelTimerId = async () => {
      try {
        let respnse = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails",
              id: timerId,
              key: currentKey,
            },
          }
        );
        setTimeDuration(respnse.data.items);
      } catch (err) {
        console.log("This is Timer id.", err);
      }
    };
    handelTimerId();
    //eslint-disable-next-line
  }, [data]);

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

  //Searching Data  Api

  const searchingDataApi = async () => {
    try {
      let response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            //eslint-disable-next-line
            q: props.input,
            maxResults: 5,
            key: currentKey,
          },
        }
      );
      //eslint-disable-next-line
      if (props.input.length > 0) {
        setData(response.data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deBouncingFun = (callback, delay) => {
    let timer;
    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...arg);
      }, delay);
    };
  };
  const debouncingSearching = deBouncingFun(searchingDataApi, 1000);
  useEffect(() => {
    debouncingSearching();
    //eslint-disable-next-line
  }, [props.input]);
  useEffect(() => {
    const handelLogoResponse = async () => {
      if (data.length > 0) {
        const channelid = data
          .map((item) => item.snippet.channelId)
          .slice(0, 50)
          .join(",");
        try {
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/channels",
            {
              params: {
                part: "snippet",
                id: channelid,
                key: currentKey,
              },
            }
          );
          let logos = {};
          response.data.items.forEach((element) => {
            logos[element.id] = element.snippet.thumbnails.default.url;
          });
          setChanelLogo(logos);
        } catch (err) {
          console.log("This is profile apis ", err);
        }
      }
    };
    handelLogoResponse();
    //eslint-disable-next-line
  }, [data]);
  const numberOfView = {};
  const convertIntoK = (account) => {
    if (account >= 1000000000) {
      return (account / 1000000000).toFixed(1) + "B";
    } else if (account >= 1000000) {
      return (account / 1000000).toFixed(1) + "M";
    } else if (account >= 1000) {
      return (account / 1000).toFixed(1) + "K";
    } else {
      return account.toString();
    }
  };

  // People who see this video || Viewos
  useEffect(() => {
    let videoId = data
      .map((item) => item.id.videoId || item.id)
      .slice(0, 50)
      .join(",");
    let handelView = async () => {
      try {
        let response = await axios(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "statistics",
              id: videoId,
              key: currentKey,
            },
          }
        );
        let result = response.data.items;
        result.forEach((element) => {
          let AccountView = element.statistics.viewCount;
          setUeserLikes(element.statistics.likeCount);
          const finelResult = convertIntoK(AccountView);
          numberOfView[element.id] = finelResult;
        });
        setviewNumber(numberOfView);
      } catch (err) {
        console.log("Who many view ", err);
      }
    };
    handelView();
    // eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    let hoursArrLimmit = [];
    data.forEach((element) => {
      let publishAt = element.snippet.publishedAt;
      let currentTime = moment();
      let publishTime = moment(publishAt);
      let durations = moment.duration(currentTime.diff(publishTime));
      hoursArrLimmit.push(durations._data.hours);
    });
    setHours(hoursArrLimmit);
  }, [data]);

  let storeArr = [];
  data.map((item) => {
    storeArr.push(item.id.videoId || item.id);
  });
  const sendData = (item, index) => {
    //eslint-disable-next-line
    props.setPassData(item);
    handeDataPassing.push(viewNumber[storeArr[index]]);
    handeDataPassing.push(hours[index]);
    handeDataPassing.push(userLikes);
    handeDataPassing.push(chanelLogo[item.snippet.channelId]);
    handeDataPassing.push(durationTimeArr);
    //eslint-disable-next-line
    props.setHoursView(handeDataPassing);
    //eslint-disable-next-line
    props.setPlayVideoView(viewNumber);
    //eslint-disable-next-line
    props.setPlayVideoHours(hours);
  };

  return (
    <div className="display-data-container">
      <InfiniteScroll
        dataLength={data.length}
        next={handelApi}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data.map((item, index) => (
          <>
            <Link
              to={`/playvideo/${item.id.videoId || item.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                className="display-video"
                onClick={() => sendData(item, index)}
              >
                <div className="video-thumbnil">
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                </div>
                <div className="chanel-logo-video-name">
                  <div className="chanel-logo">
                    {chanelLogo[item.snippet.channelId] ? (
                      <img src={chanelLogo[item.snippet.channelId]} alt="" />
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
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default DisplayData;
