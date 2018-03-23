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
    },
    likePin(data) {
        return axios.post("/api/pin/likePin", {...data});
    },
    unlikePin(data) {
        return axios.post("/api/pin/unlikePin", {...data});
    },
    fetchPins(data) {
        return axios.post("/api/pin/fetchAll", {...data});
    },
    fetchUserPins(data) {
        return axios.post("/api/pin/userPins", {...data});
    },
    fetchUserLikedPins(data) {
        return axios.post("/api/pin/fetchLikedPins", {...data});
    },
    getTwitterRequestToken() {
        return axios.get("/api/user/twitterAuthRequest");
    },
    loginTwitter(twitterCallback) {
        return axios.get("/api/user/twitterAuth"+twitterCallback);
    }
};

export const setAxiosAuthHeader = (AUTH_TOKEN) => {
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
};