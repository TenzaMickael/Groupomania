import http from "../http-common";

class PostDataService {

    create(data,token) {
        return http.post('/posts',data,{
            headers:{
                authorization: "Bearer " + token
            }
        });
    }


}

export default new PostDataService();