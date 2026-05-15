export type LessonLevel = '入门' | '进阶' | '实践'

export type LessonCode = {
  title: string
  snippet: string
}

export type Lesson = {
  id: string
  number: string
  title: string
  summary: string
  level: LessonLevel
  explanation: {
    heading: string
    paragraphs: string[]
  }[]
  code?: LessonCode
  review: {
    question: string
    answer: string
  }[]
}
