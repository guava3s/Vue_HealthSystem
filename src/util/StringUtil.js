function isNull(str) {
    if (str === '') {
        return true;
    }
}

// 传递的JSON对象所有值都不为空
function anyNull(formData) {
    for (let v in formData)
        if (formData[v] === '')
            return true;
    return false;
}

// 传递的JSON对象所有值都为 相同的true
function allTrue(formData) {
    let temp = false;
    for (let v in formData)
        temp = formData[v] ^ temp;
    return temp;
}

// 传递的JSON对象中存在任意一个为false,返回false
function anyExcept(obj) {
    for (let v in obj)
        if (!obj[v])
            return false;
    return true;
}

// js正则表达式校验账号长度，以及是否为纯数字
function elevenNumber(num) {
    let pattern = /^\d{11}$/;
    return pattern.test(num);
}


// 暴露
export {isNull, anyNull, allTrue, anyExcept, elevenNumber};