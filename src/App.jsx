import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuestProvider } from './context/QuestContext';
import ProjectSelection from './views/ProjectSelection';
import KanbanBoard from './views/KanbanBoard';

function App() {
  return (
    <QuestProvider>
      <BrowserRouter>
        <main className="app-container">
          <Routes>
            <Route path="/" element={<ProjectSelection />} />
            <Route path="/quest/:questId" element={<KanbanBoard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QuestProvider>
  );
}

export default App;