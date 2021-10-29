import http from "../http-common";

class UserDataService {


    login(data) {
        return http.post('/users/login',data);
    }


    create(data) {
        return http.post('/users/signup',data);
    }


    update(id, data) {
        return http.put(`/users/${id}` , data);
    }


    delete(id) {
        return http.delete(`/users/${id}`);
    }

    getAll() {
        return http.get("/users");
    }
}



   

   
 

   

export default new UserDataService();