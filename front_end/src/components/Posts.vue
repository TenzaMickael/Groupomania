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
            submitted: false
        };
    },

     methods: {
        onePost() {
            var data = {
                title: this.post.title,
                publication: this.post.publication,
           
                userId:sessionStorage.getItem('userId'),
               
            };

let token = sessionStorage.getItem('token')
            
            PostDataService.getOne(data,token)
           
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
  
