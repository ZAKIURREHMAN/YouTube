import { useState } from "react";
import DisplayData from "./Components/DisplayData/DisplayData";
import FilterItems from "./Components/FilterItem/FilterItems";
import LeftMenu from "./Components/LeftMenu/LeftMenu";
import Navbar from "./Components/Navbar/Navbar";
import PlayVideo from "./Components/PlayVideo/PlayVideo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [searchButton, setSearchButton] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar setSearchButton={setSearchButton} searchButton={searchButton} />
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ display: "flex" }}>
                <LeftMenu />
                <div style={{ width: "100%" }}>
                  <FilterItems />
                  <DisplayData />
                </div>
              </div>
            }
          />
          <Route path="/playvideo/:id" element={<PlayVideo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
