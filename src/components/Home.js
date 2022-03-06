import React, { useState, useEffect } from 'react'
import '../index.css'
import Category from './Category'
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categorySlice';
import { useSelector } from 'react-redux';

function Home() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formInput, setFormInput] = useState();
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categories);

  const isUniqueCategory = () => {
    let arr = categoryList.map((category) => category.title);
    console.log('isUnique Array', arr);
    return !arr.includes(formInput) ? true : false;
  }

  useEffect(() => {
    setFormInput(`New List ${categoryList.length < 1 ? 1 : categoryList.length + 1}`);
    console.log(categoryList);
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

  return (
    <div className='flex flex-col items-center w-3/4 ml-[25%] p-2'>
      <h1 className='text-8xl font-bold text-center mb-4'>Home</h1>
      <input type={'text'} placeholder={'Search tasks'} className=' focus:outline-none focus:border-slate-900 border rounded-md w-80 p-2 mb-10' />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 relative justify-center items-center'>
        {categoryList.map((category, i) => (
          <Category key={i} text={category.title} />
        ))}
        {/* <Category text='Daily Tasks' />
        <Category text='School Tasks' />
        <Category text='Shopping List' /> */}
        <div onClick={() => setShowAddForm(!showAddForm)} className='cursor-pointer border m-4 rounded-md w-40 h-40 flex justify-center items-center group hover:border-slate-800'> + </div>
        {showAddForm ? <form onSubmit={e => { handleSubmit(e) }} className='border border-slate-500 rounded-md absolute flex space-x-2 bg-slate-500 justify-center items-center w-96 h-32 p-4'>
          <input type="text" onChange={e => { handleChange(e) }} value={formInput} id="" className=' mb-0 focus:outline-none focus:border-slate-900 border rounded-md w-80 p-2' />
          <button type="submit" className='text-white text-bold border border-black rounded bg-black p-2'>Ok</button>
        </form> : <></>}
      </div>
    </div >
  )
}

export default Home