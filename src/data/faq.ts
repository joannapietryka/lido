import faqJson from '../content/faq.json'

export type FaqItem = {
  id: string
  questionPl: string
  answerPl: string
  questionEn: string
  answerEn: string
}

export const FAQ_ITEMS: FaqItem[] = faqJson.items

export function getFaqText(item: FaqItem, language: string) {
  const isEn = language.startsWith('en')
  return {
    question: isEn ? item.questionEn : item.questionPl,
    answer: isEn ? item.answerEn : item.answerPl,
  }
}
