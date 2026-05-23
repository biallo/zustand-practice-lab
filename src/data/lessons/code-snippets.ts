import { introCode } from './intro/code'
import { selectorsCode } from './selectors/code'
import { shallowCode } from './shallow/code'
import { actionsCode } from './actions/code'
import { persistCode } from './persist/code'
import { asyncCode } from './async/code'
import { serverCacheCode } from './server-cache/code'
import { vanillaCode } from './vanilla/code'
import { subscribeWithSelectorCode } from './subscribe-with-selector/code'
import { typescriptCode } from './typescript/code'
import { devtoolsCode } from './devtools/code'
import { immerCode } from './immer/code'
import { slicesCode } from './slices/code'
import { storeCollaborationCode } from './store-collaboration/code'
import { resetCode } from './reset/code'
import { formsCode } from './forms/code'
import { derivedCode } from './derived/code'
import { largeListsCode } from './large-lists/code'
import { testingCode } from './testing/code'
import { ssrCode } from './ssr/code'
import { architectureCode } from './architecture/code'
import { antiPatternsCode } from './anti-patterns/code'
import type { LessonCode } from './types'

export const lessonCode: Record<string, LessonCode> = {
  intro: introCode,
  selectors: selectorsCode,
  shallow: shallowCode,
  actions: actionsCode,
  persist: persistCode,
  async: asyncCode,
  'server-cache': serverCacheCode,
  vanilla: vanillaCode,
  'subscribe-with-selector': subscribeWithSelectorCode,
  typescript: typescriptCode,
  devtools: devtoolsCode,
  immer: immerCode,
  slices: slicesCode,
  'store-collaboration': storeCollaborationCode,
  reset: resetCode,
  forms: formsCode,
  derived: derivedCode,
  'large-lists': largeListsCode,
  testing: testingCode,
  ssr: ssrCode,
  architecture: architectureCode,
  'anti-patterns': antiPatternsCode,
}
