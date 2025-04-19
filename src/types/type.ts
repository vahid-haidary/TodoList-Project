export interface IGetTodos {
    id: number;
    message: string;
    isComplete: boolean
}

export interface ISearchProps {
  searchTerm: string
}

export interface IFilter {
  todoFilter: string
}

export interface ITodoBoxProps {
  setOpenTodo: React.Dispatch<React.SetStateAction<boolean>>,
  refetchTodos: () => void,
  setEditSwitch: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTodoId: string | null,
  
}

export interface ITodos {
  id:string | null;
  message: string | null;
  isComplete: boolean;
}
