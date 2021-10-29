<template>

    <div class="submit-form">

        <h4>Connection</h4>

        <div v-if="!submitted">
  
   
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email"
                v-model="users.email"/>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="text" class="form-control" id="password"
                v-model="users.password"/>
            </div>

            <button @click="connectUser" class="btn btn-success">Connection</button>

           

            <h6 class ="notif"> Pas de compte ?
        
                <router-link :to="{ name: 'add-users'}">S'incrire</router-link>
        
            </h6>
        </div>

       
        
    </div>
  
</template>

<script>

import UserDataService from "../services/UserDataService";

export default {

    name:"users-connection",
     data() {
        return {
            users: {
                id:"",
                email:"",
                password:""
            },
            submitted: false
        };
    },

    methods: {
        connectUser() {
            var data = {

                id: this.users.id,
                email: this.users.email,
                password: this.users.password
            };

            UserDataService.login(data)

            
                .then(response => {
                 
                
                    this.users.id = response.data.userId;
                    this.users.id = response.data.message;
                    this.users.id = response.data.token;

                    sessionStorage.setItem('token',response.data.token);
                    sessionStorage.setItem('userId',response.data.userId);
            
                    this.submitted = true;

                   // this.$router.push('/all-posts')
                })
                .catch(response => {
                  
                 console.log(response)
                    
    
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


.notif {

    margin-top:2em;
}
</style>
