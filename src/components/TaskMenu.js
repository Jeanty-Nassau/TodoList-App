import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addTodo } from '../redux/todoSlice'
import AddIcon from '@mui/icons-material/Add';
import TodoItem from './TodoItem';

function TaskMenu() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { category } = useParams();
  const [showAddForm, setShowAddForm] = useState(false);
  const [toggleShowAll, setToggleShowAll] = useState(false);
  const [formInput, setFormInput] = useState();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput) {
      dispatch(
        addTodo({ title: formInput, category })
      );
    }
    setShowAddForm(!showAddForm);
  };

  // useEffect(() => {
  //   console.log('useParams :', category);
  // }, [])

  return (
    <div className='flex-grow p-8 overflow-x-hidden overflow-y-scroll'>
      <div className='flex justify-end mb-4'>
        <AddIcon onClick={() => setShowAddForm(!showAddForm)} className='cursor-pointer border rounded-md p-1 hover:border-slate-900' />
      </div>

      <div className='flex justify-between items-center '>
        <h1 className='text-5xl  mb-4 grow'>{category}</h1>
        <h1 className='text-5xl  text-center mb-4'>{todos.filter((todo) => (todo.category === category && todo.completed === false)).length}</h1>
      </div>
      <div className='flex justify-between pb-2 border-b'>
        <div className='flex justify-evenly'>
          <p className='mx-2'> {`${todos.filter((todo) => (todo.category === category && todo.completed === true)).length} Completed`}</p>
          <p className='mx-2'>&middot; Clear</p>
        </div>
        <p onClick={showAllClick} className='cursor-pointer'>{!toggleShowAll ? 'Show' : 'Hide'}</p>
      </div>
      {showAddForm ? <form onSubmit={e => { handleSubmit(e) }} className='border border-slate-500 rounded-md absolute flex space-x-2 bg-slate-500 justify-center items-center w-96 h-32 p-4'>
        <input type="text" onChange={e => { handleChange(e) }} value={formInput} id="" className=' mb-0 focus:outline-none focus:border-slate-900 border rounded-md w-80 p-2' />
        <button type="submit" className='text-white text-bold border border-black rounded bg-black p-2'>Ok</button>
      </form> : <></>}
      <div className='flex flex-col justify-center items-left mx-2 my-4'>
        <ul>
          {todos.filter((todo) => todo.category === category && todo.completed === false).map((todo, i) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
          ))}
          {toggleShowAll ? todos.filter((todo) => todo.category === category && todo.completed === true).map((todo, i) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
          )) : <></>}
        </ul>

      </div>
    </div>
  )
}

export default TaskMenu                                                                                                          