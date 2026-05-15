import { actionsLesson } from './actions'
import { antiPatternsLesson } from './anti-patterns'
import { architectureLesson } from './architecture'
import { asyncActionsLesson } from './async-actions'
import { lessonCode } from './code-snippets'
import { derivedLesson } from './derived'
import { devtoolsLesson } from './devtools'
import { formsLesson } from './forms'
import { immerLesson } from './immer'
import { introLesson } from './intro'
import { largeListsLesson } from './large-lists'
import { persistLesson } from './persist'
import { resetLesson } from './reset'
import { selectorsLesson } from './selectors'
import { serverCacheLesson } from './server-cache'
import { shallowLesson } from './shallow'
import { slicesLesson } from './slices'
import { ssrLesson } from './ssr'
import { storeCollaborationLesson } from './store-collaboration'
import { subscribeWithSelectorLesson } from './subscribe-with-selector'
import { testingLesson } from './testing'
import type { Lesson } from './types'
import { typescriptLesson } from './typescript'
import { vanillaLesson } from './vanilla'

export type { Lesson, LessonCode } from './types'

const orderedLessons: Lesson[] = [
  introLesson,
  selectorsLesson,
  shallowLesson,
  actionsLesson,
  persistLesson,
  asyncActionsLesson,
  serverCacheLesson,
  vanillaLesson,
  subscribeWithSelectorLesson,
  typescriptLesson,
  devtoolsLesson,
  immerLesson,
  slicesLesson,
  storeCollaborationLesson,
  resetLesson,
  formsLesson,
  derivedLesson,
  largeListsLesson,
  testingLesson,
  ssrLesson,
  architectureLesson,
  antiPatternsLesson,
]

export const lessons: Lesson[] = orderedLessons.map((lesson) => ({
  ...lesson,
  code: lessonCode[lesson.id],
}))
