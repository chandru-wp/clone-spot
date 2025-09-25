 import { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Display from "./Display";
import { PlayerContext } from "../context/PlayerContext";

const Home = () => {
  const { audioRef, track } = useContext(PlayerContext);

  useEffect(() => {
    if (audioRef.current && track?.file) {
      audioRef.current.src = track.file;
      audioRef.current.load(); // ⬅️ forces reload of the new source
    }
  }, [track, audioRef]);

  if (!track) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>

      <Player />

      {/* Audio element stays mounted once */}
      <audio ref={audioRef} preload="auto"></audio>
    </div>
  );
};

export default Home;
