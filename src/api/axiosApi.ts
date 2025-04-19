import axios from "axios"
import {IGetTodos} from '../types/type'
import {ITodos} from '../types/type'


export const fetchTodos = async() => {
    const response = await axios.get<IGetTodos[]>("https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items")
    return response.data
  }
  
export const deleteTodos = async(id:number) => {
    const response = await axios.delete(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${id}`)
    return response.data
  }
  
export const updateTodoComplete = async(updateTodo:IGetTodos) => {
    const response = await axios.put(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${updateTodo.id}`,updateTodo)
    return response.data
  }

export const postTodos = async(newTodo:ITodos) => {
const response = await axios.post("https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items",newTodo) 
console.log(response);
return response

}

export const putTodos = async (updatedTodo:ITodos) => {
const response = await axios.put(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${updatedTodo.id}`,updatedTodo)
return response.data
}

export const fetchTodo = async(selectedTodoId:string) => {
const response = await axios.get<ITodos>(`https://67fcb3821f8b41c816872f0f.mockapi.io/Todo-Items/${selectedTodoId}`)
return response
}  
  