<template>
  <div id="app">
    <h1> Groupomania </h1>

     <li class="nav-item">
         <router-view></router-view>
    </li>

  </div>
  
</template>


<script>
export default {
  name: "app"
};
</script>