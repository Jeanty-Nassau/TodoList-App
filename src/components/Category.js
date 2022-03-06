import React from 'react'
import { useNavigate } from 'react-router-dom'

function Category({ id, title, todoAmount }) {
  const navigate = useNavigate();
  const openCategory = () => {
    navigate(`/taskMenu/${title}`);
  };
  return (
    <li key={id}>
      <div onClick={openCategory} title={title} className='flex mb-2 cursor-pointer items-center w-full'>
        <div className='bg-green-200 w-8 h-8 rounded-3xl' />
        <div className='flex justify-between w-full'>
          <h1 className='ml-2'>{title}</h1>
          <h1>{todoAmount}</h1>
        </div>
      </div>
    </li>
  )
}

export default Category