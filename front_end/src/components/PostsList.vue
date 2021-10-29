<template>
<div>
    <div class="col-md-6">

        <h4>Liste de tout les posts</h4>

        <ul class="list-group">

            <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(post, index) in posts"
            :key="index"
            @click="setActivePost(post, index)"
            >
            {{ post.title }}

            </li>
            
        </ul>

    </div>

    <div class="col-md-6">

        <div v-if="currentPosts">

            <h4>Posts</h4>

            <div>

                <label><strong>Title:</strong></label> {{ currentPosts.title }}

            </div>

            <div>

                <label><strong>Publication:</strong></label> {{ currentPosts.publication }}

            </div>

           

            <a class="badge badge-warning"
                :href="'/all-posts/' + currentPosts.id"
            >
            </a>
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
            currentPosts:null,
            currentIndex: -1,
            title:""
        };
    },
    methods: {
        retrievePosts() {
            PostDataService.getAll()
            .then(response => {
                this.post = response.data;
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
        },

        refreshList() {
            this.retrievePosts();
            this.currentPosts = null;
            this.currentIndex = -1;
        },

        setActivePosts(posts, index) {
            this.currentPosts = posts;
            this.currentIndex = index;
        },
    },

    mounted() {
        this.retrievePosts();
    }
};

</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>