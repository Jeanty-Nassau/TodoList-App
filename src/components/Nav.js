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
  const [activeElement, setActiveElement] = useState(-1);
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories);
  const todos = useSelector((state) => state.todos);
  const todoCategories = todos.map((todo) => todo.category);
  const navigate = useNavigate();

  const isUniqueCategory = () => {
    let arr = categoryList.map((category) => category.title);
    // console.log('isUnique Array', arr);
    return !arr.includes(formInput) ? true : false;
  }

  const openCategory = (path) => {
    navigate(path);
    console.log('open Category, nav');
  };

  const searchChange = (e) => {
    openCategory(`/${e.target.value}`);
    // console.log('search change:', e.target.value);
  }
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
        ) :
        alert('category already exists');
    }

    setShowAddForm(!showAddForm);
  };

  const updateActiveElement = (id) => {
    setActiveElement(activeElement !== id ? id : -1);
  }

  return (
    <div className='w-1/4 min-w-[250px] px-8 h-screen top-0 left-0 bottom-0 border-r border-[#efefef]'>
      <svg className='w-[50px] h-[50px] mt-5 mb-10' width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="50" height="50" rx="10" fill="black" />
        <path d="M18.4404 13.6719V35H14.0605V13.6719H18.4404ZM25.0029 13.6719V17.1143H7.60059V13.6719H25.0029ZM35.7275 31.543V12.5H39.9756V35H36.1523L35.7275 31.543ZM25.708 27.2656V26.958C25.708 25.7471 25.8447 24.6484 26.1182 23.6621C26.3916 22.666 26.792 21.8115 27.3193 21.0986C27.8467 20.3857 28.4961 19.834 29.2676 19.4434C30.0391 19.0527 30.918 18.8574 31.9043 18.8574C32.832 18.8574 33.6426 19.0527 34.3359 19.4434C35.0391 19.834 35.6348 20.3906 36.123 21.1133C36.6211 21.8262 37.0215 22.6709 37.3242 23.6475C37.627 24.6143 37.8467 25.6738 37.9834 26.8262V27.5C37.8467 28.6035 37.627 29.6289 37.3242 30.5762C37.0215 31.5234 36.6211 32.3535 36.123 33.0664C35.6348 33.7695 35.0391 34.3164 34.3359 34.707C33.6328 35.0977 32.8125 35.293 31.875 35.293C30.8887 35.293 30.0098 35.0928 29.2383 34.6924C28.4766 34.292 27.832 33.7305 27.3047 33.0078C26.7871 32.2852 26.3916 31.4355 26.1182 30.459C25.8447 29.4824 25.708 28.418 25.708 27.2656ZM29.9268 26.958V27.2656C29.9268 27.9199 29.9756 28.5303 30.0732 29.0967C30.1807 29.6631 30.3516 30.166 30.5859 30.6055C30.8301 31.0352 31.1426 31.3721 31.5234 31.6162C31.9141 31.8506 32.3877 31.9678 32.9443 31.9678C33.667 31.9678 34.2627 31.8066 34.7314 31.4844C35.2002 31.1523 35.5566 30.6982 35.8008 30.1221C36.0547 29.5459 36.2012 28.8818 36.2402 28.1299V26.2109C36.2109 25.5957 36.123 25.0439 35.9766 24.5557C35.8398 24.0576 35.6348 23.6328 35.3613 23.2812C35.0977 22.9297 34.7656 22.6562 34.3652 22.4609C33.9746 22.2656 33.5107 22.168 32.9736 22.168C32.4268 22.168 31.958 22.2949 31.5674 22.5488C31.1768 22.793 30.8594 23.1299 30.6152 23.5596C30.3809 23.9893 30.2051 24.4971 30.0879 25.083C29.9805 25.6592 29.9268 26.2842 29.9268 26.958Z" fill="#EFEFEF" />
      </svg>
      <div className='flex bg-[#efefef] mb-14  rounded-lg w-full px-4 py-2 items-center '>
        <SearchIcon />
        <input onChange={(e) => searchChange(e)} type={'text'} placeholder={'Search tasks'}
          className='w-full ml-2 bg-[#efefef] focus:outline-none'
        />
      </div>

      <div onClick={() => openCategory('/')} className='flex bg-[#efefef] h-[56px] drop-shadow-md justify-between cursor-pointer w-full px-6 py-5 items-center rounded-xl'>
        <div className='flex items-center'>
          <div className='w-3 h-3 rounded-full bg-black'></div>
          <h1 className='ml-4'>All</h1>
        </div>
        <h1>{todos.length}</h1>
      </div>

      <div className='mt-12 px-2 w-full pb-10'>
        <h1 className='mb-4 '>My Lists</h1>
        <ul>
          {categoryList.map((category) => (
            <Category onClick={() => updateActiveElement(category.id)} key={category.id} id={category.id} active={category.id === activeElement} categoryList={categoryList}
              title={category.title} todoAmount={todoCategories.filter(todoCategory => todoCategory == category.id).length} />
          ))}
        </ul>

        <button onClick={() => setShowAddForm(!showAddForm)} type={'button'} className=' my-4 h-[56px]  rounded-[2.5rem] px-6 py-4 bg-[#6750A4] text-white hover:border-blue-300 w-full'>+ Add List</button>
        {showAddForm && <form onSubmit={e => { handleSubmit(e) }} className='border border-slate-500 rounded-3xl absolute z-10 flex space-x-2 bg-slate-500 justify-center items-center w-40 h-36 p-4'>
          <input type="text" onChange={e => { handleChange(e) }} value={formInput} id="" className=' mb-0 focus:outline-none focus:border-slate-900 border rounded-md w-3/4 p-2' />
          <button type="submit" className='text-white text-bold border border-black rounded bg-black p-2'>Ok</button>
        </form>}
      </div>



    </div>
  )
}

export default Nav