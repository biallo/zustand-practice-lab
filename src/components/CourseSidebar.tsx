import { useEffect, useRef } from 'react'
import type { Lesson } from '../data/lessons'
import { assetPath } from '../utils/assets'
import styles from './CourseSidebar.module.css'

type CourseSidebarProps = {
  lessons: Lesson[]
  currentLessonId: string
  completedLessonIds: string[]
  onLessonChange: (lessonId: string) => void
}

export function CourseSidebar({
  lessons,
  currentLessonId,
  completedLessonIds,
  onLessonChange,
}: CourseSidebarProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const list = listRef.current
    const item = itemRefs.current[currentLessonId]

    if (!list || !item) {
      return
    }

    const listRect = list.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const isVisible = itemRect.top >= listRect.top && itemRect.bottom <= listRect.bottom

    if (!isVisible) {
      item.scrollIntoView({ block: 'nearest' })
    }
  }, [currentLessonId])

  const currentLesson = lessons.find((lesson) => lesson.id === currentLessonId) ?? lessons[0]
  const completedLessonCount = lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id),
  ).length
  const progressPercent =
    lessons.length === 0 ? 0 : Math.round((completedLessonCount / lessons.length) * 100)

  return (
    <aside className={styles.courseSidebar} aria-label="课程列表">
      <div className={styles.brand}>
        <div className={styles.brandHeader}>
          <img src={assetPath('icons/zustand-favicon.ico')} alt="" />
          <div>
            <p>Zustand </p>
            <span>Practice Lab</span>
          </div>
        </div>

        <div className={styles.progressPanel}>
          <div className={styles.progressHeader}>
            已完成 {completedLessonCount} / {lessons.length} 课
            <strong>{progressPercent}%</strong>
          </div>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label="课程完成进度"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
          >
            <span
              className={styles.progressBar}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <label className={styles.mobileSelector}>
        <select
          value={currentLesson.id}
          onChange={(event) => onLessonChange(event.target.value)}
        >
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.number}. {lesson.title}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.lessonList} ref={listRef}>
        {lessons.map((lesson) => {
          const active = lesson.id === currentLesson.id
          const done = completedLessonIds.includes(lesson.id)

          return (
            <button
              key={lesson.id}
              ref={(node) => {
                itemRefs.current[lesson.id] = node
              }}
              type="button"
              className={
                active ? `${styles.lessonItem} ${styles.active}` : styles.lessonItem
              }
              onClick={() => onLessonChange(lesson.id)}
              aria-current={active ? 'page' : undefined}
            >
              <span className={styles.lessonNumber}>{lesson.number}</span>
              <span>
                <strong>{lesson.title}</strong>
                <span className={styles.lessonMeta}>
                  <span>{lesson.level}</span>
                  {done ? <span className={styles.completed}>已完成</span> : null}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
