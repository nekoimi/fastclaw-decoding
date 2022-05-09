eval(function (d, f, a, c, b, e) {
    b = function (a) {
        return a.toString(f)
    };
    if (!"".replace(/^/, String)) {
        for (; a--;) e[b(a)] = c[a] || b(a);
        c = [function (a) {
            return e[a]
        }];
        b = function () {
            return "\\w+"
        };
        a = 1
    }
    for (; a--;) c[a] && (d = d.replace(new RegExp("\\b" + b(a) + "\\b", "g"), c[a]));
    return d
}("7 9(a,b,c){b=6(b,3)||l;c=c||'\\r\\n';e(b<1){4 p}4 a.d(u f(\".{0,\"+b+\"}\",\"g\")).j(c)}7 k(a){5 b='';5 c=9(a,8).m('\\r\\n');o(5 i=0;i<(c.q-1);i++){b=b+s.t((6(c[i],2)-3).h(3))}4 b}", 31, 31, "   10 return var parseInt function  csplit    match if RegExp  toString  join reurl 76 split  for false length  String fromCharCode new".split(" "), 0, {}));

const call_reurl = data => {
    let cs = data.encodec
    return reurl(cs)
}

module.exports = {
    call_reurl: call_reurl
};