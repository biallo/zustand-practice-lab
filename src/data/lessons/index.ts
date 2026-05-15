import { actionsLesson } from './actions'
import { architectureLesson } from './architecture'
import { asyncActionsLesson } from './async-actions'
import { derivedLesson } from './derived'
import { devtoolsLesson } from './devtools'
import { formsLesson } from './forms'
import { immerLesson } from './immer'
import { introLesson } from './intro'
import { persistLesson } from './persist'
import { selectorsLesson } from './selectors'
import { slicesLesson } from './slices'
import { testingLesson } from './testing'
import type { Lesson } from './types'
import { typescriptLesson } from './typescript'
import { vanillaLesson } from './vanilla'

export type { Lesson } from './types'

export const lessons: Lesson[] = [
  introLesson,
  selectorsLesson,
  actionsLesson,
  persistLesson,
  asyncActionsLesson,
  vanillaLesson,
  typescriptLesson,
  devtoolsLesson,
  immerLesson,
  slicesLesson,
  formsLesson,
  derivedLesson,
  testingLesson,
  architectureLesson,
]
