import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, updateTodoTitle } from '../redux/todoSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditableLable from './EditableLable';


function TodoItem({ id, title, completed }) {
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
    dispatch(
      updateTodoTitle({ id, title: e.target.value })
    );
  }

  return (
    <li>
      <div className='flex text-left items-center w-full grow my-2 py-4 border-b border-[#efefef] hover:bg-[#efefef]'>

        <input onClick={handleCheckboxClick} onChange={() => setValue(completed)} checked={value} className='text-4xl cursor-pointer' type="checkbox" name={id} id={id} />
        <EditableLable id={id} childRef={inputRef} className='w-full' type={'input'} text={title} textSize={'text-lg'}>
          <input ref={inputRef} onChange={(e) => handleChange(e)} className='text-lg grow ml-4  border-b' type={'text'} name={id} value={title} />
        </EditableLable>
        {/* <EditIcon color='disabled' className='cursor-pointer ' /> */}
        <DeleteIcon onClick={deleteTodoClick} color='disabled' className='cursor-pointer ' />
      </div>
    </li>
  )
}

export default TodoItem