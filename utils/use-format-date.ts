export default function (dateString: string | number | Date) {
  const dateObj = new Date(dateString)

  const year = dateObj.getUTCFullYear()
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getUTCDate()).padStart(2, '0')
  const hours = String(dateObj.getUTCHours()).padStart(2, '0')
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0')
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
