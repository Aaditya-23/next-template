const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
})

export function formatDate(epoch: number) {
  const createdAt = new Date(epoch)
  const today = new Date()

  const [creationDate, creationMonth, creationYear] = dateFormatter
    .format(createdAt)
    .split('-')

  const [currentDate, currentMonth, currentYear] = dateFormatter
    .format(today)
    .split('-')

  if (parseInt(creationYear) === parseInt(currentYear))
    return `${creationDate}'${creationMonth}`

  return `${creationMonth}'${creationYear}`
}
