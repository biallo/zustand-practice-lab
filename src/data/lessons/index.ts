import { introLesson } from './intro/lesson'
import { selectorsLesson } from './selectors/lesson'
import { shallowLesson } from './shallow/lesson'
import { actionsLesson } from './actions/lesson'
import { persistLesson } from './persist/lesson'
import { asyncActionsLesson } from './async/lesson'
import { serverCacheLesson } from './server-cache/lesson'
import { vanillaLesson } from './vanilla/lesson'
import { subscribeWithSelectorLesson } from './subscribe-with-selector/lesson'
import { typescriptLesson } from './typescript/lesson'
import { devtoolsLesson } from './devtools/lesson'
import { immerLesson } from './immer/lesson'
import { slicesLesson } from './slices/lesson'
import { storeCollaborationLesson } from './store-collaboration/lesson'
import { resetLesson } from './reset/lesson'
import { formsLesson } from './forms/lesson'
import { derivedLesson } from './derived/lesson'
import { largeListsLesson } from './large-lists/lesson'
import { testingLesson } from './testing/lesson'
import { ssrLesson } from './ssr/lesson'
import { architectureLesson } from './architecture/lesson'
import { antiPatternsLesson } from './anti-patterns/lesson'
import { lessonCode } from './code-snippets'
import type { Lesson } from './types'

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
