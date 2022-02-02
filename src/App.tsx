import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoState, todoState } from "./atom";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 3rem;
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  text-align: center;
  font-size: 18px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const App = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm();
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    if (type === "Board") {
      if (!destination) return;
      setTodos((prev) => {
        const update = Object.entries(prev);
        const [temp] = update.splice(source.index, 1);
        update.splice(destination?.index, 0, temp);
        const updateList = update.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        localStorage.setItem("todo", JSON.stringify(updateList));
        return updateList;
      });
    } else {
      if (destination === null) {
        setTodos((prev) => {
          const update = [...prev[source.droppableId]];
          update.splice(source.index, 1);
          const updateList = {
            ...prev,
            [source.droppableId]: update,
          };
          localStorage.setItem("todo", JSON.stringify(updateList));
          return updateList;
        });
      }
      if (!destination) return;
      if (destination?.droppableId === source.droppableId) {
        setTodos((prev) => {
          const update = [...prev[source.droppableId]];
          const taskObj = update[source.index];
          update.splice(source.index, 1);
          update.splice(destination?.index, 0, taskObj);
          const updateList = {
            ...prev,
            [source.droppableId]: update,
          };
          localStorage.setItem("todo", JSON.stringify(updateList));
          return updateList;
        });
      }
      if (destination.droppableId !== source.droppableId) {
        setTodos((prev) => {
          const sourceUpdate = [...prev[source.droppableId]];
          const targetUpdate = [...prev[destination.droppableId]];
          const taskObj = sourceUpdate[source.index];
          sourceUpdate.splice(source.index, 1);
          targetUpdate.splice(destination.index, 0, taskObj);
          const updateList = {
            ...prev,
            [source.droppableId]: sourceUpdate,
            [destination.droppableId]: targetUpdate,
          };
          localStorage.setItem("todo", JSON.stringify(updateList));
          return updateList;
        });
      }
    }
  };
  const onSubmit = ({ board }: ITodoState) => {
    setTodos((prev) => {
      const update = {
        ...prev,
        [board + ""]: [],
      };
      localStorage.setItem("todo", JSON.stringify(update));
      return update;
    });
    setValue("board", "");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("board", { required: true })}
            type="text"
            placeholder="Add Board!"
          />
        </Form>
        <Droppable droppableId="BOARDS" type={"Board"} direction={"horizontal"}>
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(todos).map((boardId, idx) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  todos={todos[boardId]}
                  idx={idx}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
