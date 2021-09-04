<template>
  <div class="instruments">
    <div class="header">
      <Button icon-left="plus" @click="create">Create</Button>
    </div>
    <Table />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Table from './Table/index.vue';
  import { Button } from "@/components/ui"

  export default Vue.extend({
    components: {
      Table,
      Button
    },

    methods: {
      create() {
        this.$router.push('instruments/create')
      }
    }
  });
</script>

<style lang="scss" scoped>
  .instruments {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
</style>
