import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode])
    } 
      setMode(newMode)
  };
  function back() {
    if (history.length === 1) {
      return;
    } 
      let newHist = history.slice(0, history.length - 1)
      setHistory([...newHist])
      setMode(history[history.length - 2])

  };

  return { mode, transition, back };
};
