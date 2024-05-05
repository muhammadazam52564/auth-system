import axios from "axios";

const publicInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
})


const protectedInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    }
})
export {
    publicInstance,
    protectedInstance
}


