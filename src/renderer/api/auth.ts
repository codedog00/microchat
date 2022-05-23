import axios from "axios";
const API_URL = 'http://121.5.67.65:3000/api/auth/'

class AuthAPI {
    async login(loginData:{username:string;password:string}) {
        return axios.post(API_URL+'signin',{
            username: loginData.username,
            password: loginData.password
        }).then(res => {
            if(res.data.status === 'success') {
                localStorage.setItem('user',JSON.stringify(res.data.data));
                return Promise.resolve(res.data);
            }else {
                return Promise.reject(res.data.message);
            }
        }).catch(err => {
            return Promise.reject(err);
        })
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(registerData:{username:string;email:string,password:string}) {
        return axios.post(API_URL+ 'signup',{
            username: registerData.username,
            email: registerData.email,
            password: registerData.password,
        })
            .then(res => {
                if(res.data.status === 'success') {
                    return Promise.resolve(res.data);
                }else {
                    return Promise.reject(res.data.message);
                }
            })
    }
}

export default new AuthAPI();