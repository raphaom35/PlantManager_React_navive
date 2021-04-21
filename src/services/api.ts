import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.5.129:3333',
    //baseURL:'https://jsonstorage.net/api/items/e8553106-054d-45f7-b256-241cfea309fd/'
})

export default api;