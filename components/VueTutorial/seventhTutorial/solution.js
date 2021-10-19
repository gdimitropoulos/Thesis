<template>
  <!-- write v-for in div with class tweet -->
  <div>
  	<div class="tweet" :id="article.target" :key="article.id" v-for="article in articles">
      <h3>{{ article.title }}</h3><p>{{  article.text }}</p>
      <router-link :to="article.target">Read More</router-link> 
      </div>
    </div>
</template>

<script>

export default {
  name: 'Home',
  props: {
      articles: Array
    }
}
</script>
