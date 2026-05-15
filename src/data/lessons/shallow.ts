import type { Lesson } from './types'

export const shallowLesson: Lesson = {
  id: 'shallow',
  number: '03',
  title: 'shallow 与对象 Selector',
  summary: '在需要一次读取多个字段时，用浅比较减少无关渲染。',
  level: '进阶',
  explanation: [
    {
      heading: '对象 selector 的问题',
      paragraphs: [
        'selector 返回对象时，每次执行都会创建新引用。即使对象里的 name 和 email 没变，引用也不同，组件仍可能重新渲染。',
        '这不是 Zustand 的 bug，而是 JavaScript 引用比较的结果。要么拆成多个 selector，要么给对象 selector 配比较策略。',
      ],
    },
    {
      heading: 'useShallow 的作用',
      paragraphs: [
        'useShallow 会对 selector 返回对象的第一层字段做浅比较。字段值都没变时，它会复用上一次结果，避免组件响应无关变化。',
        '它适合返回扁平对象或数组的场景。深层对象仍然需要更明确的 selector 设计，不要把整个复杂对象塞进去。',
      ],
    },
    {
      heading: '何时使用 shallow',
      paragraphs: [
        '如果组件只读一个字段，普通 selector 更简单。如果组件确实需要多个字段，并且希望保持一次 hook 调用，可以考虑 useShallow。',
        '性能优化应该服务于可读性。先用清楚的 selector 写对，再在真实重渲染问题出现时引入 shallow。',
      ],
    },
  ],
  review: [
    {
      question: '为什么 selector 返回对象容易导致重渲染？',
      answer: '对象是引用类型，每次创建新对象都会得到新引用，默认严格相等比较会认为它变化了。',
    },
    {
      question: 'useShallow 比较什么？',
      answer: '它比较返回对象或数组的第一层字段，字段都相等时复用上一次结果。',
    },
    {
      question: '什么时候不需要 useShallow？',
      answer: '只读取单个原始值或稳定 action 引用时，普通 selector 已经足够。',
    },
  ],
}
