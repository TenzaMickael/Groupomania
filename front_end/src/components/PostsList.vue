<template>
<div>
    <div class="col-md-6">

        <h4>Liste de tout les posts</h4>

       

            <div 
            v-for="(post, index) in posts"
            :key="index"
          
            >
        <router-link :to = " {name:'one-post',params: { id:post.id}}" >    {{ post.id }} </router-link>

            </div>      
            
     

    </div>

  

</div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {

    name: "all-posts",
    data() {
        return {
            posts: [],
           
        };
    },
    methods: {

        retrievePosts() {

            let token = sessionStorage.getItem('token')
            let userId = {"userId":sessionStorage.getItem('userId')}

            PostDataService.getAll(token,userId)
            .then(response => {
                this.posts = response.data.results;

                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
        },

    },

    mounted() {
        this.retrievePosts();
    }
};

</script>

