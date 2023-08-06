const formatValue = (value) => {
  return value < 10 ? `0${value}` : value.toString();
};

const formatDate = (dateObject) => {
  let year = dateObject.getFullYear().toString();
  let month = formatValue(dateObject.getMonth() + 1);
  let day = formatValue(dateObject.getUTCDate());
  let hours = formatValue(dateObject.getHours());
  let minutes = formatValue(dateObject.getMinutes());
  let seconds = formatValue(dateObject.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const createDate = (dateString) => {
  let dateTemplate = new Date(dateString);
  dateTemplate.setDate(dateTemplate.getUTCDate());
  dateTemplate.setHours(0, 0, 0, 0);
  return formatDate(dateTemplate);
};

export const dateToString = (dateObject) => {
  let year = dateObject.getFullYear().toString();
  let month = formatValue(dateObject.getMonth() + 1);
  let day = formatValue(dateObject.getUTCDate());
  return `${year}-${month}-${day}`;
};

export const formatDefaultDate = (dateObject) => {
  let year = dateObject.getFullYear().toString();
  let month = formatValue(dateObject.getMonth() + 1);
  let day = formatValue(dateObject.getUTCDate());
  return `${year}-${month}-${day}`;
};

export const formatDateToTable = (dateObject) => {
  let year = dateObject.getFullYear().toString();
  let month = formatValue(dateObject.getMonth() + 1);
  let day = formatValue(dateObject.getUTCDate());
  return `${day}/${month}/${year}`;
};
