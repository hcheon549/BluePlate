const DAY = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
]

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const getDate = () => {
  const today = new Date()
  const thisHour = today.getHours();
  let date = thisHour < 21 ? 'Today' : 'Tomorrow'

  return date
}

export const getFullDateMenu = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  const thisHour = today.getHours();

  tomorrow.setDate(tomorrow.getDate() + 1);

  let header, day, month, date, year, menuDate

  if (thisHour < 21){
    header = 'Today',
    day = DAY[today.getDay()],
    month = MONTH[today.getMonth()],
    date = today.getDate(),
    year = today.getFullYear()
  } else {
    header = 'Tomorrow',
    day = DAY[tomorrow.getDay()],
    month = MONTH[tomorrow.getMonth()],
    date = tomorrow.getDate(),
    year = tomorrow.getFullYear()
  }

  menuDate = `Menu for ${header}, ${day}, ${month} ${date}, ${year}`

  return menuDate
}