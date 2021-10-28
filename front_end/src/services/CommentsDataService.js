import http from "../http-common";

class CommentsDataService {

    create(data,token) {
        return http.post('/comments',data,{
            headers:{
                authorization: "Bearer " + token
            }
        });
    }


}

export default new CommentsDataService();