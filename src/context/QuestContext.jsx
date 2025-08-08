import React, { createContext, useState, useContext } from 'react';

const initialData = {
  quests: {
    'quest-1': { id: 'quest-1', name: 'Dominar el Bosque Tenebroso' },
    'quest-2': { id: 'quest-2', name: 'Forjar la Espada Legendaria' },
  },
  tasks: {
    'task-1': { 
      id: 'task-1', 
      title: 'Derrotar al Rey Goblin', 
      description: 'Su corona es necesaria para el ritual.',
      assignees: ['Gandalf'] 
    },
    'task-2': { 
      id: 'task-2', 
      title: 'Recolectar 10 Hierbas Sombrías', 
      description: 'Crecen solo bajo la luna nueva.',
      assignees: ['Aragorn', 'Legolas']
    },
    'task-3': { 
      id: 'task-3', 
      title: 'Encontrar la Cueva del Eco', 
      description: 'Se dice que la entrada está detrás de una cascada.',
      assignees: []
    },
    'task-4': { 
      id: 'task-4', 
      title: 'Obtener mineral de Mithril', 
      description: 'Peligroso, se necesita un equipo de enanos.',
      assignees: ['Gimli']
    },
  },
  columns: {
    'col-1': {
      id: 'col-1',
      title: 'Pendiente ⚔️',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'col-2': {
      id: 'col-2',
      title: 'En Proceso 🔥',
      taskIds: ['task-4'],
    },
    'col-3': {
      id: 'col-3',
      title: 'Completado ✅',
      taskIds: [],
    },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
};

const QuestContext = createContext();

export const QuestProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const addQuest = (questName) => {
    const newQuestId = 'quest-' + Date.now();
    const newQuest = {
      id: newQuestId,
      name: questName,
    };
    setData((prevData) => ({
      ...prevData,
      quests: {
        ...prevData.quests,
        [newQuestId]: newQuest,
      },
    }));
  };

  const moveTask = (taskId, sourceColumnId, destColumnId) => {
    if (sourceColumnId === destColumnId) return;
    setData((prevData) => {
      const sourceCol = prevData.columns[sourceColumnId];
      const destCol = prevData.columns[destColumnId];
      const newSourceTaskIds = sourceCol.taskIds.filter(id => id !== taskId);
      const newDestTaskIds = [...destCol.taskIds, taskId];
      return {
        ...prevData,
        columns: {
          ...prevData.columns,
          [sourceColumnId]: { ...sourceCol, taskIds: newSourceTaskIds },
          [destColumnId]: { ...destCol, taskIds: newDestTaskIds },
        },
      };
    });
  };

  const addTask = (taskData, columnId) => {
    const newTaskId = 'task-' + Date.now();
    const newTask = {
      id: newTaskId,
      title: taskData.title,
      description: taskData.description,
      assignees: [],
    };
    setData((prevData) => {
      const newTasks = {
        ...prevData.tasks,
        [newTaskId]: newTask,
      };
      const column = prevData.columns[columnId];
      const newTaskIds = [...column.taskIds, newTaskId];
      return {
        ...prevData,
        tasks: newTasks,
        columns: {
          ...prevData.columns,
          [columnId]: {
            ...column,
            taskIds: newTaskIds,
          },
        },
      };
    });
  };

  const addColumn = (columnTitle) => {
    const newColumnId = 'col-' + Date.now();
    const newColumn = {
      id: newColumnId,
      title: columnTitle,
      taskIds: [],
    };
    setData((prevData) => {
      const newColumns = {
        ...prevData.columns,
        [newColumnId]: newColumn,
      };
      const newColumnOrder = [...prevData.columnOrder, newColumnId];
      return {
        ...prevData,
        columns: newColumns,
        columnOrder: newColumnOrder,
      };
    });
  };

  return (
    <QuestContext.Provider value={{ data, addQuest, moveTask, addTask, addColumn }}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuests = () => {
  return useContext(QuestContext);
};