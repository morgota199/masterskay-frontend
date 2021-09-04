<template>
  <div class="action">
    <Button
      is-icon
      class="action__button"
      size="medium"
      type="white"
      icon-left="edit"
      @click="editInstruments"
    ></Button>

    <Button
      is-icon
      class="action__button"
      size="medium"
      type="danger"
      icon-left="trash-icon"
      @click="deleteInstrument"
    ></Button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Button } from '@/components/ui';

  export default Vue.extend({
    components: {
      Button,
    },

    methods: {
      async editInstruments() {
        await this.params.context.componentParent.onEdit(this.params.data);
      },

      async deleteInstrument() {
        await this.params.context.componentParent.onDelete(this.params.data);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .action {
    display: flex;
  }

  .action__button {
    margin: 2px;
  }
</style>
