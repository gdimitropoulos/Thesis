<template>
  <!-- write v-for in div with class tweet so id and key will be correct.Then  put title in h3 and tezt in p-->
  <div class="tweet" :id="article.target" :key="article.id" >
      <h3>{{ }}</h3><p>{{  }}</p>
      </div>
</template>

<script>

export default {
  name: 'Home',
  props: {
      author : String,
      message : String,
      articles: Array
    }
}
</script>
