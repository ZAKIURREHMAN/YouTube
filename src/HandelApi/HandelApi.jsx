import { useState, useEffect, useRef } from "react";
import moment from "moment";
import axios from "axios";

function HandelApi({
  setData,
  data,
  setTimeDuration,
  timeDuration,
  setChanelLogo,
  setviewNumber,
  setUeserLikes,
  setHours,
  input,
  setScrolling,
  setInfiniteFun,
}) {
  let likeArr = [];
  let durationTimeArr = [];
  const currentKey = import.meta.env.VITE_KEY_URL;
  const cache = useRef({});

  const getCachedData = async (url, params) => {
    const cacheKey = JSON.stringify({ url, params });
    if (cache.current[cacheKey]) {
      return cache.current[cacheKey];
    }
    try {
      const response = await axios.get(url, { params });
      cache.current[cacheKey] = response.data;
      return response.data;
    } catch (err) {
      console.error("Error fetching data", err);
      return null;
    }
  };

  const handelApis = async () => {
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
      if (response && response.items) {
        const result = response.items;
        setData((prev) => [...prev, ...result]);
        setScrolling((prev) => prev + 5);
      } else {
        console.error("No data received from API");
      }
    } catch (err) {
      console.error("Error in API call", err);
    }
  };

  useEffect(() => {
    handelApis();
    setInfiniteFun(() => handelApis);
  }, []);

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
  const searchingDataApi = async () => {
    try {
      let response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: input,
            maxResults: 5,
            key: currentKey,
          },
        }
      );
      //eslint-disable-next-line
      if (input.length > 0) {
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
  const debouncingSearching = deBouncingFun(searchingDataApi, 2000);
  useEffect(() => {
    debouncingSearching();
    //eslint-disable-next-line
  }, [input]);

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

  //   People who see this video || Viewos
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
          likeArr.push(element.statistics.likeCount);
          const finelResult = convertIntoK(AccountView);
          numberOfView[element.id] = finelResult;
        });
        setUeserLikes(likeArr);
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

  return <div></div>;
}

export default HandelApi;
