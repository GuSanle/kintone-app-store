export const groupingArray = (data, num) => {
  let result = []
  for (var i = 0; i < data.length; i += num) {
    result.push(data.slice(i, i + num))
  }
  return result
}

export const findKey = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find((k) => compare(obj[k], value))
}
