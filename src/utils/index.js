function isEmptyObject(object) {
  return object && typeof object === "object" && Object.keys(object).length > 0
    ? false
    : true
}

function isValidEmail(email) {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

export { isValidEmail }
