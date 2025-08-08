import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onAddTaskClick }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <button onClick={onAddTaskClick} className="add-task-btn">+</button>
      </div>
      <SortableContext id={column.id} items={tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;