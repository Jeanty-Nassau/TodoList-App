import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addTodo } from '../redux/todoSlice'
import AddIcon from '@mui/icons-material/Add';
import TodoItem from './TodoItem';
import IconButton from '@mui/material/IconButton';

function TaskMenu() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const { category, id } = useParams();
  const [showAddForm, setShowAddForm] = useState(false);
  const [toggleShowAll, setToggleShowAll] = useState(false);
  const [formInput, setFormInput] = useState();

  useEffect(() => {
    setFormInput(`New Task ${todos.length < 1 ? 1 : todos.length + 1}`);
    // console.log(todos);
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
        addTodo({ title: formInput, category: id })
      );
    }
    setShowAddForm(!showAddForm);
  };

  // useEffect(() => {
  //   console.log('useParams :', category);
  // }, [])

  return (
    <div className='flex-grow overflow-x-hidden overflow-y-scroll h-Screen'>
      <div className='w-full flex justify-end '>
        <button onClick={() => setShowAddForm(!showAddForm)} className='flex cursor-pointer justify-end bg-[#6750A4] rounded-[2.5rem] px-5 py-3 mr-8 text-white  my-5'>
          <AddIcon className='  p-1 hover:border-slate-900' />
          Todo
        </button>
      </div>


      <div className='bg-[#efefef] h-full px-8 py-4'>
      <div className='flex justify-between items-center '>
        <h1 className='text-5xl  mb-4 grow'>{category}</h1>
          <h1 className='text-5xl  text-center mb-4'>{todos.filter((todo) => (todo.category == id && todo.completed === false)).length}</h1>
      </div>
      <div className='flex justify-between pb-2 border-b'>
        <div className='flex justify-evenly'>
            <p className='mx-2 text-[#BEBEBE]'> {`${todos.filter((todo) => (todo.category == id && todo.completed === true)).length} Completed `}&middot;</p>
        </div>
        <p onClick={showAllClick} className='cursor-pointer'>{!toggleShowAll ? 'Show' : 'Hide'}</p>
      </div>
      {showAddForm && <form onSubmit={e => { handleSubmit(e) }} className='border border-slate-500 rounded-md absolute flex space-x-2 bg-slate-500 justify-center items-center w-96 h-32 p-4'>
        <input type="text" onChange={e => { handleChange(e) }} value={formInput} id="" className=' mb-0 focus:outline-none focus:border-slate-900 border rounded-md w-80 p-2' />
        <button type="submit" className='text-white text-bold border border-black rounded bg-black p-2'>Ok</button>
      </form>}
        <div className='flex flex-col justify-start items-left my-4 bg-white rounded-xl px-4 py-8'>
        <ul className='w-full'>
            {todos.filter((todo) => todo.category == id && todo.completed === false).map((todo, i) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
          ))}
            {toggleShowAll && todos.filter((todo) => todo.category == id && todo.completed === true).map((todo, i) => (
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} category={todo.category} />
          ))}
        </ul>

        </div>
      </div>
    </div>
  )
}

export default TaskMenu                                                                                                          