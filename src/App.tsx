import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atom";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const App = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodos((prev) => {
        const update = [...prev[source.droppableId]];
        const taskObj = update[source.index];
        update.splice(source.index, 1);
        update.splice(destination?.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: update,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setTodos((prev) => {
        const sourceUpdate = [...prev[source.droppableId]];
        const targetUpdate = [...prev[destination.droppableId]];
        const taskObj = sourceUpdate[source.index];
        sourceUpdate.splice(source.index, 1);
        targetUpdate.splice(destination.index, 0, taskObj);
        return {
          ...prev,
          [source.droppableId]: sourceUpdate,
          [destination.droppableId]: targetUpdate,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
