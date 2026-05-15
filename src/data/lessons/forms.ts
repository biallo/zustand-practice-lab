import type { Lesson } from './types'

export const formsLesson: Lesson = {
  id: 'forms',
  number: '16',
  title: '表单状态',
  summary: '处理临时输入、保存状态和重置流程。',
  level: '实践',
  explanation: [
    {
      heading: '不是所有输入都要进 store',
      paragraphs: [
        '单个组件内部使用的输入值，通常放在组件本地 state 就足够。Zustand 更适合跨组件、跨步骤或需要离开页面后仍能恢复的表单状态。',
        '判断标准是状态是否被多个地方共享，而不是它是不是表单字段。',
      ],
    },
    {
      heading: '草稿状态要有生命周期',
      paragraphs: [
        '表单草稿通常需要 resetDraft。否则用户提交或取消后，旧输入可能留在 store 里，下一次打开页面时造成误解。',
        'dirty 字段表示用户是否修改过内容，可以用来控制保存按钮、离开页面提示或自动保存策略。',
      ],
    },
    {
      heading: '按字段提供 action',
      paragraphs: [
        'updateTitle 和 updateBody 比通用 updateDraft 更明确，适合字段不多且规则不同的表单。',
        '大型动态表单可以用通用字段更新，但要注意类型约束和字段校验，不要让任意字符串 key 进入核心 store。',
      ],
    },
  ],
  review: [
    {
      question: '所有表单字段都应该放进 Zustand 吗？',
      answer: '不应该。只有跨组件、跨步骤、需要恢复或全局协作的表单状态才适合进入 store。',
    },
    {
      question: 'dirty 字段有什么作用？',
      answer: '它表示草稿是否被用户修改，可用于控制保存按钮、离开提示和自动保存。',
    },
    {
      question: '为什么需要 resetDraft？',
      answer: '表单草稿有明确生命周期，提交或取消后应该清理，避免旧数据污染下一次编辑。',
    },
  ],
}
