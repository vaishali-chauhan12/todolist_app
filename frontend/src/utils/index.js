function isEmptyObject(object) {
  return object && typeof object === "object" && Object.keys(object).length > 0
    ? false
    : true;
}

function isValidEmail(email) {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

function formatDate(date) {
  if(!date) return date;
  const rawDate = new Date(date);
  const formattedDate = [
    rawDate.getFullYear(),
    ("0" + (rawDate.getMonth() + 1)).slice(-2),
    ("0" + rawDate.getDate()).slice(-2),
  ].join("-");
  return formattedDate;
}

function truncateString(str, maxLength = 20) {
  if (str.length > maxLength) {
      return str.slice(0, maxLength - 3) + '...';
  }
  return str;
}

export { isEmptyObject, isValidEmail, formatDate, truncateString };
