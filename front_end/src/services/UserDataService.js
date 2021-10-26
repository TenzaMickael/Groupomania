import http from "../http-common";

class UserDataService {

    getAll() {
        return http.get("/users");
    }

    get(id) {
        return http.get(`/users/login/${id}`);
    }

    create(data) {
        return http.post("/users/signup",data);
    }

    update(id, data) {
        return http.put(`/users/${id}` , data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }
}

export default new UserDataService();