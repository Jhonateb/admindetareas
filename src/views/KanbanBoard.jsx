import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';

import { useQuests } from '../context/QuestContext';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import Modal from '../components/Modal';

const KanbanBoard = () => {
  const { data, moveTask, addTask, addColumn } = useQuests();
  const { questId } = useParams();

  const [activeTask, setActiveTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalColumnId, setModalColumnId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const quest = data.quests[questId];
  const columns = quest ? data.columnOrder.map(colId => data.columns[colId]) : [];
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const task = data.tasks[active.id];
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }
    
    if(active.id === over.id) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const destContainerId = over.data.current?.sortable?.containerId || over.id;
    
    let sourceColumnId;
    for (const col of columns) {
      if (col.taskIds.includes(taskId)) {
        sourceColumnId = col.id;
        break;
      }
    }

    if (sourceColumnId && destContainerId && sourceColumnId !== destContainerId) {
      moveTask(taskId, sourceColumnId, destContainerId);
    }
    
    setActiveTask(null);
  }

  const handleOpenAddTaskModal = (columnId) => {
    setModalColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle('');
    setModalColumnId(null);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask({ title: newTaskTitle, description: '' }, modalColumnId);
    handleCloseModal();
  };

  const handleCreateColumn = (e) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;
    addColumn(newColumnTitle);
    setNewColumnTitle('');
  };

  if (!quest) {
    return (
      <div>
        <Link to="/" className="back-link">&larr; Volver a Misiones</Link>
        <h1>Misión no encontrada</h1>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back-link">&larr; Volver a Misiones</Link>
      <h1>{quest.name}</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {columns.map(col => {
            const tasks = col.taskIds.map(taskId => data.tasks[taskId]);
            return (
              <Column
                key={col.id}
                column={col}
                tasks={tasks}
                onAddTaskClick={() => handleOpenAddTaskModal(col.id)}
              />
            );
          })}
          <div className="add-column-container">
            <form onSubmit={handleCreateColumn}>
              <input
                type="text"
                className="form-input"
                placeholder="+ Añadir otra columna"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
            </form>
          </div>
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Añadir Nueva Tarea</h2>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            className="form-input"
            placeholder="Título de la tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            autoFocus
          />
          <button type="submit" className="form-submit-btn">Crear Tarea</button>
        </form>
      </Modal>
    </div>
  );
};

export default KanbanBoard;