import axios from 'axios'

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

class BaseService {

    constructor() {
        this.api = axios.create({});

        this.api.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }
}

export default BaseService;