export const usernameInputCheck = (str) => {
    const usernameRegex = /[^a-zA-Z0-9]/g;
    let username = str.replace(usernameRegex, "");

    if(!(username.length === str.length && ( username.length >= 6 && username.length <= 32 )))
        return "Username can contain letters, numbers and must be in range 6 \u2013 32";
    return "";
};

export const passowrdInputCheck = (str) => {
    const passwordRegex = /[^ -~]/g;
    let password = str.replace(passwordRegex, "");

    if(!(password.length === str.length && ( password.length >= 8 && password.length <= 32)))
        return "Password can contain letters, numbers, special characters and must be in range 8 \u2013 32";
    return "";
};

export const emailInputCheck = (str) => {
    const emailRegex =/\S+@\S+\.\S+/;
    const res = emailRegex.test(str);

    if(!res){
        return "Invalid Email adress";
    }
    return "";

};
