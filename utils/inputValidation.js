module.exports.isEmailValid = function (str) {
    const emailRegex =/\S+@\S+\.\S+/;
    const res = emailRegex.test(str);

    if(!res)
        return false;
    return true;
}

module.exports.isUsernameValid = function(str) {
    const usernameRegex = /[^a-zA-Z0-9]/g
    let username = str.replace(usernameRegex, "");

    if(!(username.length === str.length && ( username.length >= 6 && username.length <= 32 )))
        return false;
    return true;
}

module.exports.isPasswordValid = function(str) {
    const passwordRegex = /[^ -~]/g;
    let password = str.replace(passwordRegex, "");

    if(!(password.length === str.length && ( password.length >= 8 && password.length <= 32)))
        return false;
    return true;
}