
/**
 * @param {string|Buffer} content - содержимое файла
 * @param {object} [map] SourceMap - сурсмап
 * @param {any} [meta] Meta данные, может быть что угодно
 */
module.exports = function (content, map, meta) {
  return content.replaceAll(`/assets`, ``);
}
