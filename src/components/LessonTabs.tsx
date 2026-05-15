import styles from './LessonView.module.css'

export type LessonTab = 'explain' | 'review'

type LessonTabsProps = {
  activeTab: LessonTab
  onTabChange: (tab: LessonTab) => void
}

export function LessonTabs({ activeTab, onTabChange }: LessonTabsProps) {
  return (
    <nav className={styles.tabList} aria-label="课程内容">
      <button
        type="button"
        className={activeTab === 'explain' ? `${styles.tab} ${styles.active}` : styles.tab}
        onClick={() => onTabChange('explain')}
      >
        讲解
      </button>
      <button
        type="button"
        className={activeTab === 'review' ? `${styles.tab} ${styles.active}` : styles.tab}
        onClick={() => onTabChange('review')}
      >
        复盘
      </button>
    </nav>
  )
}
