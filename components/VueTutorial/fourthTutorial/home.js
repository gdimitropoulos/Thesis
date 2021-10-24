<template>
    <h1 data-test="message">{{ news }} </h1>
</template>



<script>
 
export default {
  name: 'Home',
  props:['myprop'],
  data() {
    return {
      news : this.myprop
    }
  },
  // use the created() function bellow to write : Νέα πανεπιστημίου Πατρών

}
</script>
