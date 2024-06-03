<template>
  <div class="container">
    <IndexPage></IndexPage> 
  </div>
</template>

<script>
  import IndexPage from "./components/IndexPage.vue";
  export default { name: 'App', components: {
      IndexPage 
    }
  }
</script>