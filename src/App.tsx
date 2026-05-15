import { useMemo, useState } from 'react'
import styles from './App.module.css'
import { CourseSidebar } from './components/CourseSidebar'
import { LessonView } from './components/LessonView'
import type { LessonTab } from './components/LessonTabs'
import { lessons } from './data/lessons'
import { useCourseStore } from './stores/useCourseStore'

function App() {
  const [activeTab, setActiveTab] = useState<LessonTab>('explain')
  const currentLessonId = useCourseStore((state) => state.currentLessonId)
  const setCurrentLesson = useCourseStore((state) => state.setCurrentLesson)
  const completedLessonIds = useCourseStore((state) => state.completedLessonIds)
  const markCompleted = useCourseStore((state) => state.markCompleted)

  const currentLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === currentLessonId) ?? lessons[0],
    [currentLessonId],
  )
  const isCompleted = completedLessonIds.includes(currentLesson.id)

  const handleLessonChange = (lessonId: string) => {
    setCurrentLesson(lessonId)
    setActiveTab('explain')
  }

  return (
    <main className={styles.appShell}>
      <CourseSidebar
        lessons={lessons}
        currentLessonId={currentLesson.id}
        completedLessonIds={completedLessonIds}
        onLessonChange={handleLessonChange}
      />
      <LessonView
        lesson={currentLesson}
        activeTab={activeTab}
        isCompleted={isCompleted}
        onTabChange={setActiveTab}
        onComplete={() => markCompleted(currentLesson.id)}
      />
    </main>
  )
}

export default App
