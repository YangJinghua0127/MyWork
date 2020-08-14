/**
 * @method [获取当前cookie,返回obj]
 */
export function getCookiAll() {
    var obj = {}
    var strCooki = document.cookie;
    var strCooki = strCooki.split('; ');
    for (var i = 0; i < strCooki.length; i++) {
        var arr1 = strCooki[i].split('=');
        obj[arr1[0]] = arr1[1];
    }
    return obj;
}

/**
 * @method [获取想要的kooki名称对应值]
 * @param   {[string]}  name  [想要获取的cooki名称]
 * @return  {[string]}        [return description]
 */
export function getCooki(name) {
    var obj = getCookiAll();
    return obj[name];
}

/**
 * @method [设置cookie]
 * @param   {[string]}  name    [想要设置的cookie名称]
 * @param   {[string]}  value   [想要设置的cookie内容]
 * @param   {[number]}  day     [cookie想保存的日期(天数)]
 * @param   {[string]}  path    [cookie路径权限]
 * @param   {[string]}  domain  [cookie域名]
 * @param   {[any]}  secure  [安全性,输入任何表示开启安全]
 * @return  {[null]}          [不返回值]
 */
export function setCooki(name, value, day, path, domain, secure) {
    var str = '';
    if (name) {
        str += name + '=' + value + ';';
    }
    if (day) {
        var date = new Date;
        date.setDate(date.getDate() + day);
        str += 'expires=' + date.toUTCString() + ';'
    }
    if (path) {
        str += 'path=' + path + ';'
    }
    if (domain) {
        str += 'domain=' + domain + ';'
    }
    if (secure) {
        str += 'secure;'
    }
    document.cookie = str;
}

/**
 * @method [删除对应名称cookie]
 * @param   {[str]}  name  [想要删除的cookie名]
 * @return  {[null]}        [不返回值]
 */
export function delCooki(name) {
    setCooki(name, '', -1);
}