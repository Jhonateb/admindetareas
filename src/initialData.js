export const initialData = {
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
    'col-1': { id: 'col-1', questId: 'quest-1', title: 'Pendiente', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', questId: 'quest-1', title: 'En Progreso', taskIds: [] },
    'col-3': { id: 'col-3', questId: 'quest-1', title: 'Completado', taskIds: [] },
    'col-4': { id: 'col-4', questId: 'quest-2', title: 'Pendiente', taskIds: ['task-3'] },
  },
  columnOrder: {
    'quest-1': ['col-1', 'col-2', 'col-3'],
    'quest-2': ['col-4' /*...*/],
  }
};