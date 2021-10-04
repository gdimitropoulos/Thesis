<template>
  <!-- write v-for in div with class tweet so id and key will be correct.Then  put title in h3 and tezt in p-->
  <div class="tweet" :id="article.target" :key="article.id" v-for="article in articles" >
      <h3>{{ article.title }}</h3><p>{{ article.text }}</p>
      </div>
</template>