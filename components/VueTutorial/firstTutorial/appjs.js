<template>
  <div id="nav">
    <HelloWorld msg="You should change me"/>
  </div>
</template>


<script>
import HelloWorld from '../components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
