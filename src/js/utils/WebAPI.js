import axios from "axios";

export const WebAPI = {
    signup(data) {
        return axios.post("/api/user/signup", { ...data });
    },
    login(data) {
        return axios.post("/api/user/login", { ...data });
    },
    JWTLogin(AUTH_TOKEN) {
        if(AUTH_TOKEN)
            setAxiosAuthHeader(AUTH_TOKEN);
        return axios.post("/api/user/JWTLogin");
    },
    newPin(data) {
        return axios.post("/api/pin/newPin", {...data});
    },
    deletePin(data) {
        return axios.post("/api/pin/deletePin", {...data});
    }
}

export const setAxiosAuthHeader = (AUTH_TOKEN) => {
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
}