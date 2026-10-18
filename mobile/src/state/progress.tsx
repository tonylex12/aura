import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type Progress = { xp: number; streak: number; lessons: string[]; mastered: string[] };
type ProgressContextValue = Progress & { completeLesson: (id: string) => void; masterWord: (word: string) => void; addXp: (amount: number) => void };
const initial: Progress = { xp: 1240, streak: 12, lessons: [], mastered: [] };
const Context = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState(initial);
  useEffect(() => { AsyncStorage.getItem('aura-progress').then(value => { if (value) setProgress(JSON.parse(value)); }).catch(() => undefined); }, []);
  const update = (next: Progress) => { setProgress(next); void AsyncStorage.setItem('aura-progress', JSON.stringify(next)); };
  const value: ProgressContextValue = {
    ...progress,
    addXp: amount => update({ ...progress, xp: progress.xp + amount }),
    completeLesson: id => { if (!progress.lessons.includes(id)) update({ ...progress, xp: progress.xp + 20, lessons: [...progress.lessons, id] }); },
    masterWord: word => { if (!progress.mastered.includes(word)) update({ ...progress, xp: progress.xp + 5, mastered: [...progress.mastered, word] }); },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProgress() { const value = useContext(Context); if (!value) throw new Error('useProgress must be used inside ProgressProvider'); return value; }
