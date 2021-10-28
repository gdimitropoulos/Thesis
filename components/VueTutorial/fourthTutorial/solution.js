<script>
 export default {
   name: 'App',
   props:['myprop'],
   data() {
     return {
       news : this.myprop
     }
   },
      // use the created() function bellow to write : Νέα πανεπιστημίου Πατρών
   created(){
     this.news='Νέα πανεπιστημίου Πατρών'
   }
 }
 </script>