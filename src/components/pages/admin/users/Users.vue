<template>
  <div class="users">
     
    <Table />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Table from './Table/index.vue';

  export default Vue.extend({
    components: {
      Table,
    },
  });
</script>

<style lang="scss" scoped>
  .users {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
</style>
