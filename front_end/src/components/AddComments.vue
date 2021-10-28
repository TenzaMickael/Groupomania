<template>
    <div class="submit-form">

        <h4> Créer un commentaire </h4>
            <div v-if="!submitted">

                <div class="form-group">
                    <label for="content"> Content</label>
                    <input
                        type="text"
                        class="form-control"
                        id="content"
                        required
                        v-model="comments.content"
                        name="content"
                    />
                </div>

              

               
                <button @click="saveComment" class="btn btn-success">Valider</button>

    </div>

    <div v-else>

      <h6 class="confirm_creation">  commentaire crée ! !</h6>

      <button class="btn btn-success"><router-link id="router_link_connection" :to="{ name: 'users-connection'}">Connections</router-link>


          
          
      </button>
    </div>
  </div>
</template>

<script>

import CommentsDataService from "../services/CommentsDataService";

export default {

    name:"add-comments",
    data() {
        return {
            comments: {
                id:null,
                content:"",
                userId:"",
                postId:""
            },
            submitted: false
        };
    },

    methods: {
        saveComment() {
            var data = {
                content: this.comments.content,
                  userId:sessionStorage.getItem('userId'),
                postId: this.comments.postId,
               
            };

let token = sessionStorage.getItem('token')
            
            CommentsDataService.create(data,token)
           
                .then(response => {
                    console.log(response)

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