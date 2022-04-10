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

// 暴露
export {isNull, anyNull};