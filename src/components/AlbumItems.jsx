 import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItems = ({ id, image, name, desc }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[200px] max-w-[300px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors duration-200"
    >
      <img className="rounded w-30 h-30" src={image} alt={`Album cover of ${name}`} />
      <p className="font-bold mt-2 mb-1 text-white">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItems;
