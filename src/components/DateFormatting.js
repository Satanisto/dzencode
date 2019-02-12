const DateFormatting = data => {
  var date = new Date(data);

  const days = [
    "Воскресенье",
    "Понедедльник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];

  const nameOfDay = days[date.getDay()];

  const day = date.getDate();

  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ];

  const month = months[date.getMonth()];

  const year = date.getFullYear();

  const hour =
    String(date.getHours()).length === 1
      ? `0${String(date.getHours())}`
      : String(date.getHours());

  const minute =
    String(date.getMinutes()).length === 1
      ? `0${String(date.getMinutes())}`
      : String(date.getMinutes());

  var seconds = String(date.getSeconds());

  seconds = seconds.length === 1 ? `0${seconds}` : seconds;

  date = {
    day,
    nameOfDay,
    month,
    year,
    hour,
    minute,
    seconds,
    time: `${hour}:${minute}:${seconds}`
  };

  return date;
};

export default DateFormatting;
