<template>
    <div class="submit-form">

        <h4> Création d'un compte </h4>
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

      <h6 class="confirm_creation">  Compte crée ! !</h6>

      <button class="btn btn-success"><router-link id="router_link_connection" :to="{ name: 'users-connection'}">Connections</router-link>


          
          
      </button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {

    name:"Add-Users",
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

        
    }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

#router_link_connection{
    text-decoration: none;
}

.confirm_creation{
    margin:3em 0 3em 0;
    color:red;
}



</style>