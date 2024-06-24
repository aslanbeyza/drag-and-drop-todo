import { nanoid } from "nanoid";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { DragDropContext,Draggable,Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 30px;
`;

const TextField = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 3px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: black;
  color: blanchedalmond;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #616161;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 50px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 8px;
  background-color: #fff;
  border: 2px solid #6f6969;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const EditDeleteContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(141, 128, 220, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  background-color: aliceblue;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface Item {
  id: string;
  content: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const itemsCopy = [...items];
    const [removed] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, removed);
    setItems(itemsCopy);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const newItemObj = {
      id: nanoid(),
      content: newItem,
    };
    setItems([...items, newItemObj]);
    setNewItem("");
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const openEditModal = (id: string, content: string) => {
    setOpen(true);
    setSelectedId(id);
    setInput(content);
  };

  const saveEditedItem = () => {
    const editedItems = items.map((item) =>
      item.id === selectedId ? { ...item, content: input } : item
    );
    setItems(editedItems);
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpen(false);
  };

  return (
    <>
      <h2>ToDo List</h2>
      <Container>
        <InputContainer>
          <TextField
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item..."
          />
          <Button onClick={addItem}>Add</Button>
        </InputContainer>
        <ListContainer>
          <List>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="myList">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <ListBox
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                            <EditDeleteContainer>
                              <Button onClick={() => openEditModal(item.id, item.content)}>
                                <MdEditNote />
                              </Button>
                              <Button onClick={() => deleteItem(item.id)}>
                                <MdDeleteSweep />
                              </Button>
                            </EditDeleteContainer>
                          </ListBox>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </List>
        </ListContainer>
      </Container>
      {open && (
        <ModalBackground>
          <ModalContainer>
            <TextField
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={saveEditedItem}>OK</Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
}

export default App;
