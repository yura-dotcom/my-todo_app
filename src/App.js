import React, { useState, useEffect } from 'react';
import './App.sass';

function App() {

  let todoArr = [
    { taskValue: 'do my todo app', isDone: false, id: 0 },
    { taskValue: 'create a build of my app', isDone: false, id: 1 },
    { taskValue: 'push up the app on hosting', isDone: false, id: 2 },
  ];

  const [todos, setTodos] = useState(todoArr);
  const [newTask, setNewTask] = useState('');

  function setTask(e) {
    setNewTask(
      e.target.value
    )
  }


  function addTodo(e) {
    e.preventDefault();
    let todoIds = [];
    let newId;
    if (todos.length !== 0) {
      todos.map(todo => todoIds.push(todo.id))
      newId = Math.max(...todoIds) + 1;
    } else {
      newId = 1;

    }

    if (newTask) {
      setTodos([...todos, { taskValue: newTask, isDone: false, id: newId }]);
    }
    setNewTask('')
    // console.log(todos)
  }

  function isTaskDone(ind) {
    let newList = [];
    todos.map(todo => {
      if (todo.id === todos[ind].id) {
        todo.isDone = !todo.isDone
      }
      newList.push(todo)
    })
    setTodos(newList.sort((a, b) => a - b))
  }

  function removeTask(num) {
    setTodos(todos.filter(todo => todo.id !== num));
  }


  useEffect(() => {
    const prevListArr = JSON.parse(localStorage.getItem('todos'));
    if (prevListArr) {
      setTodos(prevListArr);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);



  return (
    <div className="App">
      <div className='my-todo'>
        <h1>My todo app</h1>
        <form className='my-todo-header'>
          <input
            className='write-new-todo'
            type='text'
            placeholder='type new task'
            value={newTask}
            onChange={setTask}
          />
          <input className='add-new-todo' type='submit' value='add task' onClick={addTodo} />

        </form>
        <div className='my-todos'>
          <ul className='todo-list'>
            {
              todos.map((todo, ind) => {
                return (
                  <li className='todo-item' key={todo.id}>
                    <span className='todo-item-task'>
                      {todo.taskValue}
                    </span>
                    <span className='actions'>

                      <input
                        type='checkbox'
                        checked={todo.isDone}
                        onChange={() => isTaskDone(ind)}
                      />
                      <input type='button' value='delete' onClick={() => removeTask(todo.id)} />
                    </span>
                  </li>

                )
              })
            }

          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
