<template>

 <div class="submit-form">

     <h4>User</h4>

      <div v-if="!submitted">
  
   
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email"
        v-model="users.email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="text" class="form-control" id="password"
          v-model="users.password"
        />
      </div>

       <button @click="connectUser" class="btn btn-success">Connection</button>
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

            UserDataService.get(data)
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
</style>
