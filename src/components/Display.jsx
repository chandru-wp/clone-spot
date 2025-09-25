 import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { albumsData } from "../assets/assets";
import "../App.css";

function Display() {
  const displayref = useRef();
  const loc = useLocation();
  const isAlbum = loc.pathname.includes("album");

  // Extract album ID
  const albumID = isAlbum ? Number(loc.pathname.split("/").pop()) : null;
  const bgclr =
    albumID !== null && albumsData[albumID] ? albumsData[albumID].bgColor : "#121212";

  useEffect(() => {
    if (displayref.current) {
      displayref.current.style.background = isAlbum
        ? `linear-gradient(${bgclr}, #121212)`
        : "#121212";
    }
  }, [isAlbum, bgclr]);

  return (
    <div
      ref={displayref}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-y-auto hide-scrollbar-vertical lg:w-[75%] lg:ml-0"
    > 
    
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
}

export default Display;
