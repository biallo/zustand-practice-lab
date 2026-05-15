import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { LessonCode } from '../data/lessons'
import styles from './LessonView.module.css'

SyntaxHighlighter.registerLanguage('tsx', tsx)

type CodeExampleProps = {
  code: LessonCode
}

export function CodeExample({ code }: CodeExampleProps) {
  return (
    <section className={styles.codeSection}>
      <h2>代码示例</h2>
      <div className={styles.codeCard}>
        <div className={styles.codeTitle}>{code.title}</div>
        <SyntaxHighlighter
          language="tsx"
          style={oneLight}
          customStyle={{
            margin: 0,
            background: 'transparent',
            fontSize: 14,
            lineHeight: 1.7,
          }}
          codeTagProps={{
            style: { fontFamily: 'var(--mono)' },
          }}
        >
          {code.snippet}
        </SyntaxHighlighter>
      </div>
    </section>
  )
}
