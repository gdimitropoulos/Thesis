<template>
    <News :articles="news" />
</template>



<script>
import News from '../components/News.vue'
 
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
