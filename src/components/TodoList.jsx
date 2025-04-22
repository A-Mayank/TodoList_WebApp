import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TodoList = ({ todos, setTodos, search }) => {
  const filtered = todos.filter(todo =>
    todo.task.toLowerCase().includes(search.toLowerCase())
  );

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(filtered);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    // Reorder the original todos array based on filtered changes
    const newOrder = todos.map(todo => {
      const match = reordered.find(r => r.id === todo.id);
      return match || todo;
    });

    setTodos(newOrder);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filtered.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={toggleComplete}
                      onDelete={deleteTodo}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
