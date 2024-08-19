import { useState } from "react";
import DisplayData from "./component/display_data/DisplayData";
import FilterItems from "./component/filter_item/FilterItems";
import LeftManue from "./component/left_manue/LeftManue";
import Navbar from "./component/navbar/Navbar";
import PlayVideo from "./component/play_video/PlayVideo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [input, setInput] = useState("");
  const [filterItem, setFilterItem] = useState("");
  const [searchButton, setSearchButton] = useState(false);
  const [passData, setPassData] = useState([]);
  const [hoursView, setHoursView] = useState([]);
  const [playVideoData, setPlayVideoData] = useState([]);
  const [playVideoView, setPlayVideoView] = useState([]);
  const [playVideoHours, setPlayVideoHours] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Navbar
          setInput={setInput}
          setFilterItem={setFilterItem}
          setSearchButton={setSearchButton}
          setActiveItem={setActiveItem}
          searchButton={searchButton}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ display: "flex" }}>
                <LeftManue />
                <div style={{ width: "100%" }}>
                  <FilterItems
                    setFilterItem={setFilterItem}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    setInput={setInput}
                  />
                  <DisplayData
                    input={
                      filterItem.length > 0
                        ? filterItem
                        : searchButton == true
                        ? input
                        : ""
                    }
                    setPassData={setPassData}
                    setHoursView={setHoursView}
                    handelPlyaVideoData={setPlayVideoData}
                    setPlayVideoView={setPlayVideoView}
                    setPlayVideoHours={setPlayVideoHours}
                  />
                </div>
              </div>
            }
          />
          <Route
            path="/playvideo/:id"
            element={
              <PlayVideo
                passData={passData}
                hoursView={hoursView}
                playVideoData={playVideoData}
                playVideoView={playVideoView}
                playVideoHours={playVideoHours}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
