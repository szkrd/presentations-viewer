// create uri slug from simple directory name
module.exports = (s) => {
  return s
    .replace(/[\s_]/g, '-')
    .replace(/\-+/g, '-')
    .toLowerCase()
}
