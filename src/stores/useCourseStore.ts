import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CourseStore = {
  currentLessonId: string
  completedLessonIds: string[]
  setCurrentLesson: (lessonId: string) => void
  markCompleted: (lessonId: string) => void
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      currentLessonId: 'intro',
      completedLessonIds: [],
      setCurrentLesson: (lessonId) => set({ currentLessonId: lessonId }),
      markCompleted: (lessonId) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) {
            return state
          }

          return {
            completedLessonIds: [...state.completedLessonIds, lessonId],
          }
        }),
    }),
    {
      name: 'zustand-practice-lab-progress',
      partialize: (state) => ({
        currentLessonId: state.currentLessonId,
        completedLessonIds: state.completedLessonIds,
      }),
    },
  ),
)
