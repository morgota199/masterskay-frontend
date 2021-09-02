<template>
  <div class="sub-categories">
    <div class="sub-categories__header">
      <Button icon-left="plus" @click="toggleModal(true)">
        Careate Sub Category
      </Button>
    </div>
    <Table />
    <Create v-model="modal" @cancel="toggleModal(false)" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Create from './Modal/Create.vue';
  import { Button } from '@/components/ui';
  import Table from './Table/index.vue';

  export default Vue.extend({
    components: {
      Table,
      Create,
      Button,
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
  .sub-categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .sub-categories__header {
    display: flex;
    justify-content: flex-end;
  }
</style>
