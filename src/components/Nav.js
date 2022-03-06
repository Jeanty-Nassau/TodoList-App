import React, { useState, useEffect } from 'react'
import Category from './Category'
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categorySlice';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formInput, setFormInput] = useState();
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories);
  const todos = useSelector((state) => state.todos);
  const todoCategories = todos.map((todo) => todo.category);
  const navigate = useNavigate();

  const isUniqueCategory = () => {
    let arr = categoryList.map((category) => category.title);
    console.log('isUnique Array', arr);
    return !arr.includes(formInput) ? true : false;
  }

  const openCategory = (category) => {
    navigate(`/taskMenu/${category}`);
  };

  useEffect(() => {
    setFormInput(`New List ${categoryList.length < 1 ? 1 : categoryList.length + 1}`);
  }, [categoryList]);

  const handleChange = (e) => {
    setFormInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput) {
      isUniqueCategory(formInput) && (formInput !== '') ?
        dispatch(
          addCategory({ title: formInput, })
        ) && openCategory(formInput) :
        alert('category already exists');
    }

    setShowAddForm(!showAddForm);
  };

  return (
    <div className='w-1/4 min-w-[250px] p-4 h-screen top-0 left-0 bottom-0 bg-slate-200'>
      <div className='flex bg-white border-b border-slate-400 rounded-md w-full p-1 items-center mb-5'>
        <SearchIcon />
        <input type={'text'} placeholder={'Search tasks'}
          className='w-full ml-2 focus:outline-none'
        />
      </div>

      <div className='flex bg-opacity-60 backdrop-filter backdrop-blur-lg bg-white cursor-pointer justify-between w-1/2  p-2 rounded-md'>
        <h1>All</h1>
        <h1>{todos.length}</h1>
      </div>

      <div className='mt-5'>
        <h1 className='mb-3'>My Lists</h1>
        <ul>
          {categoryList.map((category, i) => (
            <Category key={i} id={i} title={category.title} todoAmount={todoCategories.filter(todoCategory => todoCategory === category.title).length} />
          ))}
        </ul>

        <button onClick={() => setShowAddForm(!showAddForm)} type={'button'} className='border my-2 rounded-md px-3 py-1 border-black hover:border-blue-300'>{'+ Add List'}</button>
        <button type={'button'} className='border my-2 rounded-md px-3 py-1 border-black hover:border-blue-300'>{'- Remove List'}</button>
        {showAddForm ? <form onSubmit={e => { handleSubmit(e) }} className='border border-slate-500 rounded-md absolute z-10 flex space-x-2 bg-slate-500 justify-center items-center w-40 h-36 p-4'>
          <input type="text" onChange={e => { handleChange(e) }} value={formInput} id="" className=' mb-0 focus:outline-none focus:border-slate-900 border rounded-md w-3/4 p-2' />
          <button type="submit" className='text-white text-bold border border-black rounded bg-black p-2'>Ok</button>
        </form> : <></>}
      </div>



    </div>
  )
}

export default Nav