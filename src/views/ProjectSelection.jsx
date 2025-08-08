import React, { useState } from 'react';
import { useQuests } from '../context/QuestContext';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom'; 

const ProjectSelection = () => {
  const { data, addQuest } = useQuests();
  const quests = Object.values(data.quests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestName, setNewQuestName] = useState('');

  const handleCreateQuest = (e) => {
    e.preventDefault();
    if (newQuestName.trim() === '') return;
    addQuest(newQuestName);
    setNewQuestName('');
    setIsModalOpen(false);
  };


  return (
    <div className="project-selection-view">
      <h1>Forge your Quest! ⚔️</h1>
      <p>Selecciona una misión existente o crea una nueva para empezar a organizar tus tareas.</p>
      
      <div className="quest-list">
        {quests.map((quest) => (
          <Link to={`/quest/${quest.id}`} key={quest.id} className="quest-card-link">
            <div className="quest-card">
              {quest.name}
            </div>
          </Link>
        ))}
      </div>

      <button className="create-quest-btn" onClick={() => setIsModalOpen(true)}>
        + Crear Nueva Misión
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Crear Nueva Misión</h2>
        <form onSubmit={handleCreateQuest}>
          <input
            type="text"
            className="form-input"
            placeholder="Nombre de la misión..."
            value={newQuestName}
            onChange={(e) => setNewQuestName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="form-submit-btn">Forjar Misión</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectSelection;