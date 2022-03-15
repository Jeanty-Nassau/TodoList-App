import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteCategory, updateCategory } from '../redux/categorySlice';
import EditableLable from './EditableLable';
import { useSelector } from 'react-redux';
import { deleteTodo } from '../redux/todoSlice';

function Category({ id, title, todoAmount, categoryList, active, onClick }) {
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const todos = useSelector((state) => state.todos);

  const openCategory = () => {
    navigate(`/taskMenu/${title}/${id}`);
    console.log('open category, category')
  };

  const handleDeleteClick = () => {
    //delete click

    todos.forEach(todo => {
      if (todo.category === id) {
        dispatch(
          deleteTodo({ id: todo.id })
        );
      }
    });
    dispatch(
      deleteCategory({ id })
    );
    navigate('/');
  }
  const handleChange = (e) => {
    if (categoryList.findIndex((category) => category.title === e.target.value) < 0) {
      dispatch(updateCategory({ id, title: e.target.value }));
    };
  }
  const handleClick = () => {
    onClick();
    openCategory();
    console.log('active has changed to:', active);
  };

  return (
    <li key={id}>
      <div onClick={handleClick} onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)} title={title}
        className={active ? 'flex mb-2 cursor-pointer items-center w-full rounded-[2.5rem] h-[56px] shadow-md bg-[#efefef] px-5 py-4' :
          'flex mb-2 cursor-pointer items-center w-full px-5 h-[56px] py-4 h-max'}>
        <div className='bg-green-200 w-3 h-3 rounded-full ' />
        <div className='flex justify-between w-full items-center'>
          <EditableLable id={id} childRef={ref} text={title} type={'input'} textSize={'text-sm'}>
            <input onChange={(e) => handleChange(e)} ref={ref} className='ml-4 w-4/5 text-sm' type={'text'} name={title} value={title} />
          </EditableLable>

          {showDelete && (
            <DeleteIcon onClick={handleDeleteClick} fontSize='small' color='disabled' />
          )}
          <h1 >{todoAmount}</h1>
        </div>
      </div>
    </li>
  )
}
//onMouseEnter and onMouseLeave
export default Category