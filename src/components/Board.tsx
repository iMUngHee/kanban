import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, todoState } from "../atom";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 18px;
  color: #0984e3;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

interface IBoardProps {
  todos: ITodo[];
  boardId: string;
}

const Form = styled.form`
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  padding: 5px 5px;
  text-align: center;
  background-color: #b2bec3;
  &::placeholder {
    color: rgba(255, 255,255, 0.5);
  }
  color: white;
  font-weight: 700;
`;

interface IForm {
  todo: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoState);
  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newTodo],
      };
    });
    setValue("todo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, idx) => (
              <DraggableCard
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                idx={idx}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default React.memo(Board);
