<template>
    <News :articles="news" />
</template>



<script>
import News from './components/News.vue'
 
export default {
  name: 'App',
  components: {
    News
  },
  data() {
    return {
      news : []
    }
  },
  created(){
    this.news = [
      {title: 'Έναρξη μαθημάτων', text: 'H νέα σχολική χρόνια ξεκινάει απο 11 Οκτωμβρίου ',id : 1,target: 'first'}, 
      {title: 'Ανακοίνωση βαθμολογιών ', text: 'Αποτελέσματα εξεταστική περιόδου για το μάθημα Βασεις 2 ',id: 2,target: 'second'},
      {title: 'Αποτελέσματα έρευνας',text: 'Νέα έρευνα του πανεπηστημίου Πατρών',id: 3,target: 'third'}
    ];
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  color: #2c3e50;
}



.tweet {
  border: solid black 1px;
  background-color: #f4f4f4;
  margin-left: 10%;
  margin-right: 10%;
  padding: 1.5rem;
  margin-bottom: 2px;
  font-size: .875rem;
}
.tweet h3 {
  font-weight: bold;
    margin-bottom: 14px;

}
</style>
