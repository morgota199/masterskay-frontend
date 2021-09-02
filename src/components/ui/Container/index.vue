<template functional>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({});
</script>

<style lang="scss" scoped>
  .container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }
</style>
