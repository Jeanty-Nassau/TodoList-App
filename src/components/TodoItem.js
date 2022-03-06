import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo } from '../redux/todoSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoItem({ id, title, completed, category }) {
  const [value, setValue] = useState(completed);
  const dispatch = useDispatch();
  const handleCheckboxClick = () => {
    dispatch(
      toggleComplete({ id, completed: !completed })
    );
  };
  const deleteTodoClick = () => {
    dispatch(deleteTodo({ id }));
  }

  return (
    <li>
      <div className='flex text-left items-center w-full'>
        <input onClick={handleCheckboxClick} onChange={() => setValue(completed)} checked={value} className='text-4xl mt-4' type="checkbox" name={id} id={id} />
        <label className='text-xl grow ml-4 mt-2 border-b' htmlFor={id}>{title}</label>
        <EditIcon color='disabled' className='cursor-pointer ' />
        <DeleteIcon onClick={deleteTodoClick} color='disabled' className='cursor-pointer ' />
      </div>
    </li>
  )
}

export default TodoItem