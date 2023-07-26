import React from 'react'
import { useEffect, useReducer } from 'react'
import {styled} from 'styled-components'

const ADD_TODOS = 'ADD_TODO';
const IS_LOADING = 'IS_LOADING';
const IS_LOADING_F = 'IS_LOADING_FALSE';
const ERROR = 'ERROR';

const reducerTodo = (state, action)=>{
    if (action.type === ADD_TODOS) {
        return {
            ...state,
            todo: action.payload,
        }
    }
    if(action.type === IS_LOADING) {
        return {
            ...state,
            isLoading: action.payload,
        }
    }
    if(action.type === IS_LOADING_F) {
        return {
            ...state,
            isLoading: action.payload,
        }

    }
    if(action.type === ERROR) {
        return{
            ...state,
            error: action.payload,
        }
    }
    return state
}



export const Todos = () => {
    // const [todo, setTodo] = useState([]);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false)

    const [state, dispatch] = useReducer(reducerTodo, {
        todo: [],
        error: null,
        isLoading: false,
    });

    const {todo} = state
console.log(state);

    useEffect(()=>{
        const getTodos = async()=>{
            try {
                dispatch({type: IS_LOADING, payload: true})
               const response = await fetch('https://jsonplaceholder.typicode.com/todos')
               const result = await response.json()
               console.log(result);
              
            //    setTodo(result)
            dispatch({type:ADD_TODOS, payload:result})
           
            dispatch({type: IS_LOADING_F, payload: false})
            } catch (error) {
                dispatch ({type: ERROR, payload: error})
                dispatch({type: IS_LOADING_F, payload: false})
            }
           
            
        }
       
        getTodos()
    }, [state])

  return (
    <div>
        {ERROR && <h1>{ERROR.message}</h1>}
        {IS_LOADING && <img src='https://t3.ftcdn.net/jpg/02/01/18/68/360_F_201186834_NLRQImmmfLmOHEQpQPXB6wh4F4quHloV.jpg' alt='...Loading'></img>}
        <ul>
            {/* {todo.length > 0 && todo.map((todos)=>{
                <li key={todos.id}>{todos.title}</li>
            })} */}
           {reducerTodo.length>0 && reducerTodo.map((todo)=>{
            return(
                <StyledTodo key={todo.id}>{todo.title}</StyledTodo>
            )
            
           })}
        </ul>

    </div>
  )
}

const StyledTodo = styled ('li') `
    list-style-type: none;
`
