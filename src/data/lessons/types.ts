export type LessonLevel = '入门' | '进阶' | '实践'

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
  code: {
    title: string
    fileName: string
    source: string
  }
  review: {
    question: string
    answer: string
  }[]
}
