import type { Lesson } from '../data/lessons'
import styles from './LessonView.module.css'

type ReviewPanelProps = {
  lesson: Lesson
  isCompleted: boolean
  onComplete: () => void
}

export function ReviewPanel({ lesson, isCompleted, onComplete }: ReviewPanelProps) {
  return (
    <article className={styles.lessonPanel}>
      <section className={styles.reviewGrid}>
        {lesson.review.map((item, index) => (
          <details key={item.question} className={styles.reviewCard} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <button
        type="button"
        className={
          isCompleted
            ? `${styles.completeButton} ${styles.done}`
            : styles.completeButton
        }
        onClick={onComplete}
        disabled={isCompleted}
      >
        {isCompleted ? '已完成' : '标记完成'}
      </button>
    </article>
  )
}
