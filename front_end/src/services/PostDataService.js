import http from "../http-common";

class PostDataService {

    create(data,token) {
        return http.post('/posts',data,{
            headers:{
                authorization: "Bearer " + token
            }
        });
    }

    
    getAll() {
        return http.get('/all-posts');
    }



}

export default new PostDataService();