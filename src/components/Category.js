import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteCategory, updateCategory } from '../redux/categorySlice';
function Category({ id, title, todoAmount }) {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openCategory = () => {
    navigate(`/taskMenu/${title}`);
  };

  const handleDeleteClick = () => {
    //delete click
  }

  return (
    <li key={id}>
      <div onClick={openCategory} onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)} title={title} className='flex mb-2 cursor-pointer items-center w-full'>
        <div className='bg-green-200 w-8 h-8 rounded-3xl' />
        <div className='flex justify-between w-full'>
          <h1 className='ml-2'>{title}</h1>
          <h1 >{todoAmount}</h1>
          {showDelete && (
            <DeleteIcon onClick={handleDeleteClick} />
          )}
        </div>
      </div>
    </li>
  )
}
//onMouseEnter and onMouseLeave
export default Category