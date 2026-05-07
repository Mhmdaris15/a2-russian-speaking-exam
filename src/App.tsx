import { useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PresentationPage } from './pages/PresentationPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { SituationsPage } from './pages/SituationsPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { ReferencePage } from './pages/ReferencePage';
import { useAppStore } from './stores/useAppStore';

function App() {
  const navigate = useNavigate();
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);

  // Global keyboard shortcuts
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    if (e.code === 'Escape') {
      e.preventDefault();
      navigate('/');
    }
    if (e.code === 'KeyD' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Only toggle dark mode if no other modifier and not in an input
      toggleDarkMode();
    }
  }, [navigate, toggleDarkMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="presentation" element={<PresentationPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="situations" element={<SituationsPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="reference" element={<ReferencePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
