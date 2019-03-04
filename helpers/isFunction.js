module.exports.isFunction = function isFunction(obj) {
  return !!(obj && obj.call && obj.apply);
}
