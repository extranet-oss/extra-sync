module.exports.parseUrl = function(url, options) {
  let str = url.slice(0);
  for (let opt in options)
    str.replace(opt, options[opt]);
  return str;
};