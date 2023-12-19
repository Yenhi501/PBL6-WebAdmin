import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig<any> = {
    headers: {'Content-Type': 'application/json', 'Authorization': `token ${/*${token}*/''}`}
}


export const post =  (path: string, content: any) => {
    return  axios.post(path, content, config);
                        

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