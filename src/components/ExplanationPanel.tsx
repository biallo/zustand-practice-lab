import type { Lesson } from '../data/lessons'
import { CodeExample } from './CodeExample'
import styles from './LessonView.module.css'

type ExplanationPanelProps = {
  lesson: Lesson
}

export function ExplanationPanel({ lesson }: ExplanationPanelProps) {
  return (
    <article className={styles.lessonPanel}>
      {lesson.explanation.map((section) => (
        <section key={section.heading} className={styles.contentSection}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <CodeExample code={lesson.code} />
    </article>
  )
}
