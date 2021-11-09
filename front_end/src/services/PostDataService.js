import http from "../http-common";

class PostDataService {

    create(data,token) {
        return http.post('/posts/create/',data,{
            headers:{
                authorization: "Bearer " + token
            }
        });
    }

    
    getAll(token,userId) {
        return http.post('/posts/', userId,  {
            headers:{
                authorization: "Bearer " + token
            }
        });
    }

    getOne(token,userId) {
        return http.post('/posts/:id', userId,  {
            headers:{
                authorization: "Bearer " + token
            }
        });
    }



}

export default new PostDataService();