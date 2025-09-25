  import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    seekBar,
    seekBg,
    play,
    pause,
    playStatus,
    track,
    time,
    after,
    before,
    seekBgClick,
      
  toggleRepeat,
     shuffle,
  } = useContext(PlayerContext);

  if (!track) return null; // wait for track to load

  // Format seconds to always have 2 digits
  const formatTime = (min, sec) => `${min}:${sec.toString().padStart(2, "0")}`;

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      
      {/* Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          className="w-12 h-12 object-cover rounded"
          src={track.image || "/fallback-image.png"}
          alt={track.name || "Song"}
        />
        <div>
          <p>{track.name || "Unknown Title"}</p>
          <p>{(track.desc || track.artist || "Unknown Artist").slice(0, 16) + "..."}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img onClick={shuffle} className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
          <img onClick={before} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
          
          {playStatus ? (
            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" />
          ) : (
            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
          )}

          <img onClick={after} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
          <img   onClick={toggleRepeat}  className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-5">
          <p>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>
          <div
            ref={seekBg}
            onClick={seekBgClick}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
        </div>
      </div>

      {/* Extra Controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.play_icon} alt="Play" />
        <img className="w-4" src={assets.mic_icon} alt="Mic" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini Player" />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom" />
      </div>

    </div>
  );
};

export default Player;
