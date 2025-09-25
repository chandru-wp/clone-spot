  import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Import previous/next controls and current track from context
  const { playWithId, setTrack, before, after, track } = useContext(PlayerContext);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`https://spotgpt-backend.onrender.com/api/song/list`);
        if (!response.ok) throw new Error('Failed to fetch songs');
        const data = await response.json();

        const album = {
          image: data.songs[0]?.image || assets.spotify_logo,
          name: "Sibi's PlayList",
          desc: "Vekkama illa thirudura!",
          likes: '1M',
          songCount: data.songs.length,
          duration: '8 hr 27 min',
          songs: data.songs,
        };

        setAlbumData(album);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchAlbumData();
  }, [id]);

  if (loading) return <div>Loading album...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!albumData) return <div>Album not found.</div>;

  const handleSongClick = (song) => {
    setTrack(song);
    playWithId(albumData.songs.findIndex(s => s._id === song._id));
  };

  return (
    <>
      <Navbar />
      <div className='p-8'>
        {/* Album Header */}
        <div className='flex flex-col md:flex-row gap-8 items-center md:items-end mb-8'>
          <img className='w-48 h-48 rounded object-cover' src={albumData.image} alt={albumData.name} />
          <div className='flex flex-col text-center md:text-left'>
            <p className='text-sm text-gray-400'>Playlist</p>
            <h1 className='text-3xl md:text-5xl font-bold mb-4'>{albumData.name}</h1>
            <p className='text-sm text-gray-400'>
              {albumData.desc} <br className='md:hidden'/>
              <span className='font-bold text-white'>SpotGPT</span> • {albumData.likes} likes • {albumData.songCount} songs, about {albumData.duration}
            </p>
            {/* Previous/Next Controls */}
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 bg-gray-700 text-white rounded"
                onClick={before}
              >
                Previous
              </button>
              <button
                className="px-3 py-1 bg-gray-700 text-white rounded"
                onClick={after}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Song List */}
        <div className='grid grid-cols-3 md:grid-cols-[1fr_2fr_1fr_1fr] text-gray-400 text-sm md:text-base mb-4 border-b border-gray-700 py-2 font-medium'>
          <p className='col-span-1'>#</p>
          <p className='hidden md:block'>Title</p>
          <p className='hidden md:block'>Date Added</p>
          <img className='w-4 ml-auto mr-4 md:mr-0' src={assets.clock_icon} alt="Clock" />
        </div>

        {albumData.songs.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSongClick(item)}
            className={`grid grid-cols-3 md:grid-cols-[1fr_2fr_1fr_1fr] gap-x-4 items-center text-gray-200 hover:bg-gray-800 p-2 rounded cursor-pointer
              ${track?._id === item._id ? 'bg-gray-700' : ''}`}
          >
            <p>{index + 1}</p>
            <div className='flex items-center gap-4'>
              <img className='w-10 h-10 rounded' src={item.image} alt={item.name} />
              <div className='flex flex-col'>
                <p className='text-white'>{item.name}</p>
                <p className='text-sm text-gray-400'>{item.desc}</p>
              </div>
            </div>
            <p className='hidden md:block'>1 year ago</p>
            <p className='hidden md:block ml-auto mr-4'>{item.duration || '6:17'}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayAlbum;