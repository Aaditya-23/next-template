import { BILLION, MILLION } from './constants'

const numberFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

export function formatThousand(number: number) {
  const result = number / 1000
  return numberFormatter.format(result)
}

export function formatMillion(number: number) {
  const result = number / MILLION
  return numberFormatter.format(result)
}

export function formatBillion(number: number) {
  const result = number / BILLION
  return numberFormatter.format(result)
}

export function formatLikes(likes: number) {
  if (likes < 0) throw Error('invalid value for post likes')
  else if (likes === 0) return `${likes} likes`
  else if (likes === 1) return `${likes} like`
  else if (likes >= 2 && likes < 1000) return `${likes} likes`
  else if (likes >= 1000 && likes < MILLION)
    return `${formatThousand(likes)}K likes`
  else if (likes >= MILLION && likes < BILLION)
    return `${formatMillion(likes)}M likes`

  return `${formatBillion(likes)}B likes`
}
