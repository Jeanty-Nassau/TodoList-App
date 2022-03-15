import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import TodoItem from './TodoItem';


function Search() {
  const { search } = useParams();
  const todos = useSelector((state) => state.todos);
  const [toggleShowAll, setToggleShowAll] = useState(false);
  const categories = useSelector((state) => state.categories);
  const [formInput, setFormInput] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormInput(`New Task ${todos.length < 1 ? 1 : todos.length + 1}`);
  }, [todos, search]);


  const findSearchTodos = () => {
    let pattern = new RegExp(`\\b${search}`, "i");
    const arr = todos.filter((todo) =>
      pattern.test(todo.title) === true
    );
    return arr;
  }

  const showAllClick = () => {
    setToggleShowAll(!toggleShowAll);
  }
  const todoCategories = [...new Set(findSearchTodos().map((todo) => todo.category))];
  console.log('todoCategories in AllMenu:', todoCategories);
  const findCategoryTitle = (todoCategory) => {
    const index = categories.findIndex((category) => category.id == todoCategory);
    return categories[index].title;
  }

  const handleChange = (e) => {
    setFormInput(e.target.value);
  }

  return (
    <div className='flex-grow p-8 overflow-x-hidden overflow-y-scroll'>

      <div className='flex justify-between items-center '>
        <h1 className='text-5xl  mb-4 grow'>{`Results for "${search}"`}</h1>
        <h1 className='text-5xl  text-center mb-4'>{findSearchTodos().filter((todo) => (todo.completed === false)).length}</h1>
      </div>
      <div className='flex justify-between pb-2 border-b'>
        <div className='flex justify-evenly'>
          <p className='mx-2'> {`${findSearchTodos().filter((todo) => (todo.completed === true)).length} Completed`}</p>
          <p className='mx-2'>&middot; Clear</p>
        </div>
        <p onClick={showAllClick} className='cursor-pointer'>{!toggleShowAll ? 'Show' : 'Hide'}</p>
      </div>

      {todoCategories.map((category, i) => (
        <div key={i}>
          <h1 className='text-3xl mb-2'>{findCategoryTitle(category)}</h1>
          <ul className='w-full flex flex-col justify-center items-left mx-2 my-4'>
            {findSearchTodos().filter((todo) => todo.category == category && todo.completed === false).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
            {toggleShowAll && findSearchTodos().filter((todo) => todo.category == category && todo.completed === true).map((todo, i) => (
              <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
          </ul>

        </div>
      ))}

    </div>
  )
}

export default Search