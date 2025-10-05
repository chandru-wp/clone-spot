 import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";

const DisplayHome = () => {
  const [albumsData, setAlbumsData] = useState([]);
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const songsRef = useRef(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const albumsRes = await fetch(
          "https://spotgpt-backend.onrender.com/api/album/list"
        );
        const songsRes = await fetch(
          "https://spotgpt-backend.onrender.com/api/song/list"
        );

        if (!albumsRes.ok || !songsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const albumsData = await albumsRes.json();
        const songsData = await songsRes.json();

        setAlbumsData(albumsData.albums);
        setSongsData(songsData.songs);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div className="text-white p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-5">Error: {error}</div>;
  }

  const scrollLeft = () => {
    if (songsRef.current) {
      songsRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (songsRef.current) {
      songsRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Albums Section */}
      <div className="mb-8 px-4">
        <h1 className="my-5 font-bold text-2xl text-white">Top Playlists</h1>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {albumsData.map((item) => (
            <AlbumItems
              key={item._id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Songs Section */}
      <div className="mb-8 px-4">
        <h1 className="my-5 font-bold text-2xl text-white">
          All Time Trending Songs
        </h1>

        <div className="relative group">
          {/* Left Button - hidden until hover */}
          <img
            src={assets.arrow_left}
            alt="Arrow Left"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 bg-black/70 p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Songs List */}
          <div
            ref={songsRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
          >
            {songsData.map((item) => (
              <SongItems
                key={item._id}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>

          {/* Right Button - hidden until hover */}
          <img
            src={assets.arrow_right}
            alt="Arrow Right"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 bg-black/70 p-2 rounded-full cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
