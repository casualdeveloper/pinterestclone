export const usernameInputCheck = (str) => {
    const usernameRegex = /[^a-zA-Z0-9]/g
    let username = str.replace(usernameRegex, "");

    if(!(username.length === str.length && ( username.length >= 6 && username.length <= 32 )))
        return "Username can only contain a-z, A-Z, 0-9 characters and has to be 6 - 32 length.";
    return "";
}

export const passowrdInputCheck = (str) => {
    const passwordRegex = /[^ -~]/g;
    let password = str.replace(passwordRegex, "");

    if(!(password.length === str.length && ( password.length >= 8 && password.length <= 32)))
        return "Password can only support alphanumeric and standard special characters, length of password has to be in range 8 - 32.";
    return "";
}

export const emailInputCheck = (str) => {
    const emailRegex =/\S+@\S+\.\S+/;
    const res = emailRegex.test(str);

    if(!res){
        return "Invalid Email adress";
    }
    return "";

}
