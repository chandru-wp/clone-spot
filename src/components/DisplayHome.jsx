 import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import image1 from "../img/greater-than.png";
import image2 from "../img/download18.png";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import { PlayerContext } from "../context/PlayerContext";
import "../App.css";


const DisplayHome = () => {
  const { playWithId } = useContext(PlayerContext);

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const recentlyPlayedRef = useRef(null);

  // Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          "https://spotgpt-backend.onrender.com/api/song/list"
        );
        setSongs(res.data.songs || []);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  // Fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(
          "https://spotgpt-backend.onrender.com/api/album/list"
        );
        setAlbums(res.data.albums || []);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  // Scroll functions
  const scrollLeft = () => {
    recentlyPlayedRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    recentlyPlayedRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* Top Playlists */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Your Top Playlist</h1>
        <div className="flex overflow-x-auto space-x-5 w-full hide-scrollbar flex flex-row">
          {(albums.length ? albums : albumsData).map((item, index) => (
            <AlbumItems
              key={item._id || index}
              name={item.name}
              desc={item.desc}
              id={item._id || item.id}
              image={item.image || "/fallback-image.png"}
            />
          ))}
        </div>
      </div>

      {/* Recently Played Songs */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Recently Played</h1>
        <div
          className="flex items-center relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Button */}
          {isHovering && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 px-3 py-2  bg-stone-100 rounded ml-1"
            >
              <img src={image1} alt="Right" className="h-4 w-4 bg-stone-100" /> 
            </button>
          )}

          {/* Songs List */}
          <div
            ref={recentlyPlayedRef}
            className="flex overflow-x-auto space-x-4 w-full hide-scrollbar"
          >
            {songs.map((item, index) => (
              <SongItems
                key={item._id || index}
                id={index}
                name={item.name}
                desc={item.artist || "Unknown Artist"}
                image={item.image || "/fallback-image.png"}
                onClick={() => playWithId(index)}
              />
            ))}
          </div>

          {/* Right Button */}
          {isHovering && (
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 px-3 py-2 bg-gray-900 rounded mr-1"
            >
              <img src={image2} alt="Right" className="h-4 w-4 text-stone-50" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
