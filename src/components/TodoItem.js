import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, updateTodoTitle } from '../redux/todoSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditableLable from './EditableLable';

function TodoItem({ id, title, completed, category }) {
  const [value, setValue] = useState(completed);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleCheckboxClick = () => {
    dispatch(
      toggleComplete({ id, completed: !completed })
    );
  };
  const deleteTodoClick = () => {
    dispatch(deleteTodo({ id }));
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    dispatch(
      updateTodoTitle({ id, title: e.target.value })
    );
  }

  return (
    <li>
      <div className='flex text-left items-center w-full'>

        <input onClick={handleCheckboxClick} onChange={() => setValue(completed)} checked={value} className='text-4xl mt-4 cursor-pointer' type="checkbox" name={id} id={id} />
        <EditableLable id={id} childRef={inputRef} className='w-full' type={'text'} type={'input'} text={title}>
          <input ref={inputRef} onChange={(e) => handleChange(e)} className='text-xl grow ml-4 mt-2 border-b' type={'text'} name={id} value={title} />
        </EditableLable>
        {/* <EditIcon color='disabled' className='cursor-pointer ' /> */}
        <DeleteIcon onClick={deleteTodoClick} color='disabled' className='cursor-pointer ' />
      </div>
    </li>
  )
}

export default TodoItem