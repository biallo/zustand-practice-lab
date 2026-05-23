import type { LessonCode } from '../types'

export const architectureCode: LessonCode = {
  title: '按 Feature 组织 Store',
  snippet: `src/
  features/
    cart/
      store.ts
      CartPanel.tsx
      selectors.ts
    session/
      store.ts
      authFetch.ts
  stores/
    useUiStore.ts

// 强业务相关的状态靠近 feature。
// 横跨多个业务域的 UI 状态再放到 stores/。`,
}
