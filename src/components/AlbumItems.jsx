 import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItems = (props) => {
  const nav = useNavigate();

  return (
    <div onClick={() => nav(`/album/${props.id}`)} className='  w-50 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={props.image} alt={props.name} />
      <p className='font-bold mt-2 mb-1'>{props.name}</p>
      <p className='text-slate-200 text-sm'>{props.desc}</p>
    </div>
  );
};

export default AlbumItems;