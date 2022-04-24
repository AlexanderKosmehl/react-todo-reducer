import { useReducer, useRef } from 'react'

enum TodoActionKind {
  addTodo,
  removeTodo,
}

interface TodoAction {
  type: TodoActionKind
  payload: string
}

interface TodoState {
  todos: string[]
}

function reducer(state: TodoState, action: TodoAction) {
  const { type, payload } = action
  switch (type) {
    case TodoActionKind.addTodo:
      return {
        todos: [...state.todos, payload],
      }
    case TodoActionKind.removeTodo:
      return {
        todos: state.todos.filter((todo) => todo !== payload),
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [] })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const todo = inputRef.current?.value
    if (!todo) return

    // Add todo to state
    dispatch({ type: TodoActionKind.addTodo, payload: todo })

    // Clear input field
    inputRef.current.value = ''
  }

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {state.todos.map((todo, index) => {
          return (
            <li
              onClick={() =>
                dispatch({ type: TodoActionKind.removeTodo, payload: todo })
              }
              key={index}
            >
              {todo}
            </li>
          )
        })}
      </ul>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  )
}
