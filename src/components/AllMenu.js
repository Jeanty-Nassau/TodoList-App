import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from './TodoItem';

function AllMenu() {
  const category = '';
  const todos = useSelector((state) => state.todos);
  const todoCategories = [...new Set(todos.map((todo) => todo.category))];
  const [toggleShowAll, setToggleShowAll] = useState(false);
  const [formInput, setFormInput] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setFormInput(`New Task ${todos.length < 1 ? 1 : todos.length + 1}`);
    console.log(todos);
  }, [todos]);

  const showAllClick = () => {
    setToggleShowAll(!toggleShowAll);
    console.log('toggleShowAll:', toggleShowAll);
  }

  const handleChange = (e) => {
    setFormInput(e.target.value);
  }

  return (
    <div className='flex-grow p-8 overflow-x-hidden overflow-y-scroll'>

      <div className='flex justify-between items-center '>
        <h1 className='text-5xl  mb-4 grow'>All</h1>
        <h1 className='text-5xl  text-center mb-4'>{todos.filter((todo) => (todo.completed === false)).length}</h1>
      </div>
      <div className='flex justify-between pb-2 border-b'>
        <div className='flex justify-evenly'>
          <p className='mx-2'> {`${todos.filter((todo) => (todo.completed === true)).length} Completed`}</p>
          <p className='mx-2'>&middot; Clear</p>
        </div>
        <p onClick={showAllClick} className='cursor-pointer'>{!toggleShowAll ? 'Show' : 'Hide'}</p>
      </div>

      {todoCategories.map((category, i) => (
        <div key={i}>
          <h1 className='text-3xl mb-2'>{category}</h1>
          <ul className='w-full flex flex-col justify-center items-left mx-2 my-4'>
            {todos.filter((todo) => todo.category === category && todo.completed === false).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
            ))}
            {toggleShowAll && todos.filter((todo) => todo.category === category && todo.completed === true).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
            ))}
          </ul>

        </div>
      ))}

    </div>
  )
}

export default AllMenu