<template>
    <div class="submit-form">

    <h4> Créer un users </h4>
        <div v-if="!submitted">

            <div class="form-group">
                <label for="pseudo">pseudo</label>
                <input
                    type="text"
                    class="form-control"
                    id="pseudo"
                    required
                    v-model="users.pseudo"
                    name="pseudo"
                />
            </div>

            <div class="form-group">
                <label for="email"> Email </label>
                <input
                    type="mail"
                    class="form-control"
                    id="email"
                    required
                    v-model="users.email"
                    name="email"   
                />
            </div>

            <div class="form-group">
                <label for="password"> Password </label>
                <input
                    type="text"
                    class="form-control"
                    id="password"
                    required
                    v-model="users.password"
                    name="password"   
                />
            </div>

            <button @click="saveUser" class="btn btn-success">Valider</button>
        </div>

        <div v-else>
      <h4>Create user success !</h4>
      <button class="btn btn-success" @click="newUser"> Connection </button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {

    name:"AddUsers",
    data() {
        return {
            users: {
                id:null,
                pseudo:"",
                email:"",
                password:""
            

            },
            submitted: false
        };
    },

    methods: {
        saveUser() {
            var data = {
                pseudo: this.users.pseudo,
                email: this.users.email,
                password: this.users.password
            };

            UserDataService.create(data)
                .then(response => {
                    this.users.id = response.data.results.insertId;
                 
           
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newUser() {
            this.submitted = false;
            this.user = {};
        }
    }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>