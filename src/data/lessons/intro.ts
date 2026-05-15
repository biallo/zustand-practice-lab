import type { Lesson } from './types'

export const introLesson: Lesson = {
  id: 'intro',
  number: '01',
  title: '认识 Zustand',
  summary: '用一个很小的 store 理解 Zustand 的定位、核心 API 和组件订阅方式。',
  level: '入门',
  explanation: [
    {
      heading: 'Zustand 解决什么问题',
      paragraphs: [
        'Zustand 是一个轻量级 React 状态管理库。它把状态、派生动作和外部访问能力放进一个 store，组件通过 hook 读取自己需要的片段。',
        '和 Context 相比，Zustand 不要求你把 Provider 包在组件树顶部；和 Redux 相比，它没有固定的 reducer、action type 或样板代码。你可以从一个很小的 store 开始，再按需要加入 selector、persist、devtools 等能力。',
      ],
    },
    {
      heading: '第一课的功能设计',
      paragraphs: [
        '这一课先做一个计数 store。它包含一个数值状态 bears，以及 increase 和 reset 两个 action。组件只读取 bears 和 action 引用，不直接维护业务状态。',
        '这个设计刻意保持简单：先建立 create、set、selector 三个概念，再进入持久化、异步 action 和中间件。理解这三点后，后续课程的复杂功能都只是组合扩展。',
      ],
    },
    {
      heading: '关键特性',
      paragraphs: [
        'create 会返回一个 hook。这个 hook 既能在 React 组件里订阅状态，也带有 getState、setState、subscribe 等非组件场景可用的工具方法。',
        'selector 是性能边界。组件写 useStore((state) => state.bears) 时，只关心 bears 的变化；这比把整个 store 读进组件更可控。',
        'set 支持对象更新和函数式更新。函数式更新适合依赖旧值的场景，对象更新适合直接替换某些字段。',
      ],
    },
  ],
  review: [
    {
      question: 'Zustand 的 store 为什么可以不使用 Provider？',
      answer:
        'create 返回的 hook 已经绑定到内部 store。组件调用这个 hook 时直接订阅 store 的状态片段，不需要通过 React Context 注入 store 实例。',
    },
    {
      question: '为什么示例中要用 selector 读取 bears？',
      answer:
        'selector 会让组件只订阅自己关心的字段。这样 action 或其他字段变化时，读取 bears 的组件不会因为无关变化而重新渲染。',
    },
    {
      question: 'increase 为什么使用 set((state) => ...)，而 reset 使用 set({ ... })？',
      answer:
        'increase 依赖旧的 bears 值，所以使用函数式更新；reset 不依赖旧值，只需要把 bears 设为固定值，因此对象更新更直接。',
    },
    {
      question: '把 action 放进 store 有什么好处？',
      answer:
        '组件只触发语义明确的 action，不需要散落状态更新细节。业务规则集中在 store 里，后续测试、复用和重构都更容易。',
    },
  ],
}
