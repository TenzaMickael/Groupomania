<template>
  <div class = "onePost">

   

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.publication }}</p>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {

    name:"one-post",


     data() {
        return {
            post: {
                id:null,
                title:"",
                publication:"",
                userId:""
            },
          
        };
    },

     methods: {
        onePost() {

            var postId = this.$route.params.id
            var userId = {
                
           
                userId:sessionStorage.getItem('userId'),
               
            };

let token = sessionStorage.getItem('token')
            
            PostDataService.getOne(userId,token,postId)
           
                .then(response => {
                    console.log(response.data.results[0])

                   this.post=response.data.results[0];
                 
                })
                .catch(e => {
                   
                    console.log(e);
                    
                });
        },

        
    },

    mounted() {
        this.onePost()
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
  
