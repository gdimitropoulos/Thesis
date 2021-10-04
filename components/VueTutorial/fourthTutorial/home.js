<template>
    <h1 data-test="message">{{ news }} </h1>
</template>



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

}
</script>
