import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  practicedTopics: number[];
  questionsAnswered: number;
  situationsPracticed: number;
  flashcardStatus: Record<string, 'known' | 'unknown'>;
  totalSessions: number;

  markTopicPracticed: (topicId: number) => void;
  incrementQuestions: () => void;
  incrementSituations: () => void;
  setFlashcardStatus: (id: string, status: 'known' | 'unknown') => void;
  incrementSessions: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      practicedTopics: [],
      questionsAnswered: 0,
      situationsPracticed: 0,
      flashcardStatus: {},
      totalSessions: 0,

      markTopicPracticed: (topicId) =>
        set((s) => ({
          practicedTopics: s.practicedTopics.includes(topicId)
            ? s.practicedTopics
            : [...s.practicedTopics, topicId],
        })),

      incrementQuestions: () =>
        set((s) => ({ questionsAnswered: s.questionsAnswered + 1 })),

      incrementSituations: () =>
        set((s) => ({ situationsPracticed: s.situationsPracticed + 1 })),

      setFlashcardStatus: (id, status) =>
        set((s) => ({
          flashcardStatus: { ...s.flashcardStatus, [id]: status },
        })),

      incrementSessions: () =>
        set((s) => ({ totalSessions: s.totalSessions + 1 })),

      resetProgress: () =>
        set({
          practicedTopics: [],
          questionsAnswered: 0,
          situationsPracticed: 0,
          flashcardStatus: {},
          totalSessions: 0,
        }),
    }),
    { name: 'a2-progress' }
  )
);
