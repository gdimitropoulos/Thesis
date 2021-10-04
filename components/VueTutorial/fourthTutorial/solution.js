<script>
 export default {
   name: 'App',
   props:['myprop'],
   data() {
     return {
       news : this.myprop
     }
   },
      // use the created() function bellow to write : Nέα πανεπηστημίου πατρών
   created(){
     this.news='Nέα πανεπηστημίου πατρών'
   }
 }
 </script>