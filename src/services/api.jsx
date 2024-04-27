import axios from 'axios';

export const baseURL = "https://calendario-api.savietto.app/";

export default axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
    