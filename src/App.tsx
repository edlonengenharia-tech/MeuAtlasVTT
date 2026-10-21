import { useEffect } from 'react';
import { AppProvider, useApp } from './store';
import MapCanvas from './components/MapCanvas';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

function AppContent() {
  const { dispatch } = useApp();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'v': dispatch({ type: 'SET_TOOL', tool: 'select' }); break;
        case 'm': dispatch({ type: 'SET_TOOL', tool: 'move' }); break;
        case 'r': dispatch({ type: 'SET_TOOL', tool: 'measure' }); break;
        case 'f': dispatch({ type: 'SET_TOOL', tool: 'fog' }); break;
        case 'e': dispatch({ type: 'SET_TOOL', tool: 'erase' }); break;
        case 'd': dispatch({ type: 'SET_TOOL', tool: 'draw' }); break;
        case 't': dispatch({ type: 'SET_TOOL', tool: 'text' }); break;
        case 'p': dispatch({ type: 'SET_TOOL', tool: 'pin' }); break;
        case 'delete':
        case 'backspace':
          // Could delete selected token
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-950 overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <MapCanvas />
        <Sidebar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
