export default function (uri, varName, cb) {
  if (!uri) throw 'missing uri';
  var head = document.head ||
    document.head.getElementsByTagName('head')[0];
  var el = document.createElement('script');
  el.type = 'text\/javascript';
  if ('function' === typeof cb) {
    el.onerror = function(uri, cb, e){
      cb(new URIError(e.target.src + ' could not be loaded'), e);
      head.removeChild(el)
    }.bind(null, uri, cb)
    el.onload = function(uri, cb, e) {
      const value = window[varName]
      cb(null, value, {uri: uri, event: e});
      head.removeChild(el)
    }.bind(null, uri, cb)
  }
  head.appendChild(el);
  el.src = uri;
}
