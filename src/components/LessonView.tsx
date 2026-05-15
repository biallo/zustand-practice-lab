import { useEffect, useRef } from 'react'
import type { Lesson } from '../data/lessons'
import { ExplanationPanel } from './ExplanationPanel'
import { LessonTabs, type LessonTab } from './LessonTabs'
import { ReviewPanel } from './ReviewPanel'
import styles from './LessonView.module.css'

type LessonViewProps = {
  lesson: Lesson
  activeTab: LessonTab
  isCompleted: boolean
  onTabChange: (tab: LessonTab) => void
  onComplete: () => void
}

export function LessonView({
  lesson,
  activeTab,
  isCompleted,
  onTabChange,
  onComplete,
}: LessonViewProps) {
  const lessonViewRef = useRef<HTMLElement>(null)

  useEffect(() => {
    lessonViewRef.current?.scrollTo({ top: 0, left: 0 })
    window.scrollTo({ top: 0, left: 0 })
  }, [lesson.id])

  return (
    <section
      ref={lessonViewRef}
      className={styles.lessonView}
      aria-labelledby="lesson-title"
    >
      <header className={styles.lessonHero}>
        <div>
          <span className={styles.eyebrow}>Lesson {lesson.number}</span>
          <h1 id="lesson-title">{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
      </header>

      <LessonTabs activeTab={activeTab} onTabChange={onTabChange} />

      {activeTab === 'explain' ? (
        <ExplanationPanel lesson={lesson} />
      ) : (
        <ReviewPanel lesson={lesson} isCompleted={isCompleted} onComplete={onComplete} />
      )}
    </section>
  )
}
