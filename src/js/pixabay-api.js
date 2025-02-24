import axios from 'axios';

export function axiosGetQuery(url, params) {    
    const response = axios.get(url, { params });
    return response;
}
