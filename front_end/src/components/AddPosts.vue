<template>
    <div class="submit-form">

        <h4> Créer un post </h4>
            <div v-if="!submitted">

                <div class="form-group">
                    <label for="title">Titre</label>
                    <input
                        type="text"
                        class="form-control"
                        id="title"
                        required
                        v-model="posts.title"
                        name="title"
                    />
                </div>

                <div class="form-group">
                    <label for="publication"> publication </label>
                    <input
                        type="text"
                        class="form-control"
                        id="publication"
                        required
                        v-model="posts.publication"
                        name="publication"   
                    />
                </div>

               
                <button @click="savePost" class="btn btn-success">Valider</button>

    </div>

    <div v-else>

      <h6 class="confirm_creation">  Posts crée ! !</h6>

      <button class="btn btn-success"><router-link id="router_link_connection" :to="{ name: 'users-connection'}">Connections</router-link>


          
          
      </button>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {

    name:"Add-Posts",
    data() {
        return {
            posts: {
                id:null,
                title:"",
                publication:"",
                userId:""
            },
            submitted: false
        };
    },

    methods: {
        savePost() {
            var data = {
                title: this.posts.title,
                publication: this.posts.publication,
                userId:sessionStorage.getItem('userId'),
               
            };

let token = sessionStorage.getItem('token')
            
            PostDataService.create(data,token)
           
                .then(response => {
                    console.log(data)

                    this.title = response.data.title;
                    this.publication = response.data.publication;
                 
       
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