<template>
  <div class="categories">
    <div class="categories__header">
      <Button icon-left="plus" @click="toggleModal(true)">
        Create Category
      </Button>
    </div>
    <Table />
    <Create v-model="modal" @cancel="toggleModal(false)" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Table from './Table/index.vue';
  import { Button } from '@/components/ui';
  import Create from './Modal/Create.vue';

  export default Vue.extend({
    components: {
      Button,
      Table,
      Create,
    },

    data: () => ({
      modal: false,
    }),

    methods: {
      toggleModal(modal: boolean) {
        this.modal = modal;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .categories__header {
    display: flex;
    justify-content: flex-end;
  }
</style>
