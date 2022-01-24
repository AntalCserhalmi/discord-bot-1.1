const groupDigits = ( num ) => {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
};


exports.groupDigits = groupDigits;