const _parseJson = (json) => {
    if(typeof(json) === "object")
        return json;
    let res;
    try{
        res = JSON.parse(json);
    }
    catch(e){
        res = "";
    }
    return res;
};

export const saveJWTLocally = (JWT) => {
    if(typeof(Storage) !== "undefined"){
        if(typeof(JWT) !== "string")
            JWT = JSON.stringify(JWT);
        window.localStorage.setItem("JWT", JWT);
    }
};

export const getLocalJWT = () => {
    if(typeof(Storage) !== "undefined"){
        return window.localStorage.getItem("JWT");
    }
    return "";
};

export const removeJWTFromLocalStorage = () => {
    if(typeof(Storage) !== "undefined"){
        return window.localStorage.removeItem("JWT");
    }
};