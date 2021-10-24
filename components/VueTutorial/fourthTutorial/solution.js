<script>
 export default {
   name: 'App',
   props:['myprop'],
   data() {
     return {
       news : this.myprop
     }
   },
      // use the created() function bellow to write : Νέα πανεπηστημίου πατρών
   created(){
     this.news='Nέα πανεπιστημίου Πατρών'
   }
 }
 </script>