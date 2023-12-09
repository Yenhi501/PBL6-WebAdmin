import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig<any> = {
    headers: {'Content-Type': 'application/json', 'Authorization': `token ${/*${token}*/''}`}
}

axios.defaults.baseURL = 'http://localhost:8000/api/';

export const post = async (path: string, content: any) => {
    const { data } = await axios.post(path, content, config)
                        .then((response) => response)
                        .catch(error => {
                            console.log(error); 
                            return error;
                        });
    return data;
}

export const get = async (path: string) => {
    const { data } = await axios.get(path, config)
                        .then((response) => response)
                        .catch(error => {
                            console.log(error); 
                            return error;
                        });
    return data;
}