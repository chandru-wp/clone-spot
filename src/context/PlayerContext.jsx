  import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const seekBg = useRef();
  const seekBar = useRef();

  const [songs, setSongs] = useState([]);   // fetched songs
  const [albums, setAlbums] = useState([]); // ✅ fetched albums
  const [track, setTrack] = useState(null); // current track
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: "--", minute: "--" },
    totalTime: { second: "--", minute: "--" },
  });

  // Fetch songs from API
  // ...existing code...
useEffect(() => {
  const fetchSongs = async () => {
    try {
      const res = await axios.get("https://spotgpt-backend.onrender.com/api/song/list");
      const fetchedSongs = res.data.songs || [];
      setSongs(fetchedSongs);
      if (fetchedSongs.length > 0) setTrack(fetchedSongs[0]);
      else setTrack({ name: "No songs", file: "", image: "" }); // fallback
    } catch (error) {
      console.error("Error fetching songs:", error);
      setTrack({ name: "Error", file: "", image: "" }); // fallback
    }
  };
  fetchSongs();
}, []);
// ...existing code...
  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get("https://spotgpt-backend.onrender.com/api/album/list");
        setAlbums(res.data.albums || []); // ✅ assuming API returns { albums: [...] }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  // Update audio src when track changes
  useEffect(() => {
    if (track && track.url) {
      audioRef.current.src = track.url;
      audioRef.current.play().catch(() => {}); 
      setPlayStatus(true);
    }
  }, [track]);

  // Update seek bar and time
  useEffect(() => {
    const updateTime = () => {
      if (!audioRef.current.duration) return;
      if (seekBar.current)
        seekBar.current.style.width =
          (audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };
    audioRef.current.ontimeupdate = updateTime;
    return () => (audioRef.current.ontimeupdate = null);
  }, [track]);

  // Player controls
  const play = () => audioRef.current.play().then(() => setPlayStatus(true));
  const pause = () => { audioRef.current.pause(); setPlayStatus(false); };

  const playWithId = (index) => {
    if (!songs[index]) return;
    setTrack(songs[index]);
  };
 const before = () => {
  if (!track || !songs.length) return;
  const currentIndex = songs.findIndex(s => s._id === track._id);
  if (currentIndex > 0) setTrack(songs[currentIndex - 1]);
};

const after = () => {
  if (!track || !songs.length) return;
  const currentIndex = songs.findIndex(s => s._id === track._id);
  if (currentIndex !== -1 && currentIndex < songs.length - 1) {
    setTrack(songs[currentIndex + 1]);
  }
};
  const seekBgClick = (e) => {
    if (!seekBg.current) return;
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };
  const shuffle = () => {
  if (!songs.length) return;
  const randomIndex = Math.floor(Math.random() * songs.length);
  setTrack(songs[randomIndex]);
};
const [repeat, setRepeat] = useState(false);

const toggleRepeat = () => {
  setRepeat(r => !r);
  audioRef.current.loop = !repeat;
};
  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        songs,
        albums,   // ✅ now available everywhere
        track,
        playStatus,
        time,
        setTrack,
        play,
        pause,
        playWithId,
        before,
        after,
        seekBgClick,
         repeat,
    toggleRepeat,
         shuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;