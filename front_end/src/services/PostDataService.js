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

    getOne(userId,token,postId) {
        return http.post('/posts/' + postId, userId,  {
            headers:{
                authorization: "Bearer " + token
            }

        });
    }

    update(data,token) {
        return http.put('/posts/' , data ,{
            headers:{
                authorization: "Bearer " + token
            }
        }) 

    }



}

export default new PostDataService();