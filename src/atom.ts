import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

const localTodo = localStorage.getItem("todo");
const todoJSON = JSON.parse(localTodo as any);

export const todoState = atom<ITodoState>({
  key: "todo",
  default: todoJSON || {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
});