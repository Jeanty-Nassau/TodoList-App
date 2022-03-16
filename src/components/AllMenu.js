import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from './TodoItem';

function AllMenu() {
  const todos = useSelector((state) => state.todos);
  const todoCategories = [...new Set(todos.map((todo) => todo.category))];
  console.log('todoCategories in AllMenu:', todoCategories);
  const [toggleShowAll, setToggleShowAll] = useState(false);
  const categories = useSelector((state) => state.categories);
  const [formInput, setFormInput] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setFormInput(`New Task ${todos.length < 1 ? 1 : todos.length + 1}`);
  }, [todos]);

  const showAllClick = () => {
    setToggleShowAll(!toggleShowAll);
  }

  const findCategoryTitle = (todoCategory) => {
    const index = categories.findIndex((category) => category.id == todoCategory);
    return categories[index].title;
  }

  const handleChange = (e) => {
    setFormInput(e.target.value);
  }

  return (
    <div className='flex-grow overflow-x-hidden overflow-y-scroll'>

      <div className='flex justify-between items-center px-8 py-4'>
        <h1 className='text-5xl  mb-4 grow'>All</h1>
        <h1 className='text-5xl  text-center mb-4'>{todos.filter((todo) => (todo.completed === false)).length}</h1>
      </div>
      <div className='bg-[#efefef] h-full px-8 w-full'>
        <div className='flex py-2 '>
          <p className='text-[#848484]'> {`${todos.filter((todo) => (todo.completed === true)).length}`} Completed ·</p>
          <p onClick={showAllClick} className='cursor-pointer ml-4'>{!toggleShowAll ? 'Show' : 'Hide'}</p>
      </div>

      {todoCategories.map((category, i) => (
        <div key={i}>
          <h1 className='text-3xl mb-2 pt-4'>{findCategoryTitle(category)}</h1>
          <ul className='flex flex-col justify-start items-left my-4 bg-white rounded-xl px-4 py-8 shadow-md'>
            {todos.filter((todo) => todo.category === category && todo.completed === false).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
            {toggleShowAll && todos.filter((todo) => todo.category === category && todo.completed === true).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
          </ul>

        </div>
      ))}
      </div>
    </div>
  )
}

export default AllMenu