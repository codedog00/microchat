import axios from "axios";

const API_URL = 'http://121.5.67.65:3000/api/user/';

const UserAPI = {
    searchUsers: function (searchStr: string) {
        return axios.post(API_URL+ 'search',{
            searchStr: searchStr
        }).then(res => {
            if(res.data.status === 'success') {
                return Promise.resolve(res.data);
            }else {
                return Promise.reject(res.data.message);
            }
        })
    },
};

export default UserAPI;