import { createContext, useState } from "react";
import HandelApi from "../../HandelApi/HandelApi";
export const counterContext = createContext(null);

export const CounterProviders = ({ children }) => {
  const [data, setData] = useState([]);
  const [timeDuration, setTimeDuration] = useState([]);
  const [chanelLogo, setChanelLogo] = useState({});
  const [viewNumber, setviewNumber] = useState({});
  const [userLikes, setUeserLikes] = useState([]);
  const [hours, setHours] = useState([]);
  const [input, setinput] = useState("");
  const [passData, setpassSata] = useState([]);
  const [hoursView, sethoursView] = useState([]);
  const [infiniteFun, setInfiniteFun] = useState();
  const [scrolling, setScrolling] = useState(5);
  return (
    <counterContext.Provider
      value={{
        data: data,
        userLikes: userLikes,
        timeDuration: timeDuration,
        chanelLogo: chanelLogo,
        viewNumber: viewNumber,
        hours: hours,
        setinput: setinput,
        passData: passData,
        setpassSata: setpassSata,
        hoursView: hoursView,
        infiniteFun: infiniteFun,
        scrolling: scrolling,
        sethoursView: sethoursView,
      }}
    >
      {children}
      <HandelApi
        data={data}
        setData={setData}
        setTimeDuration={setTimeDuration}
        timeDuration={timeDuration}
        setChanelLogo={setChanelLogo}
        setviewNumber={setviewNumber}
        setUeserLikes={setUeserLikes}
        setHours={setHours}
        setInfiniteFun={setInfiniteFun}
        input={input}
        setScrolling={setScrolling}
      />
    </counterContext.Provider>
  );
};
