<template>
  <div class="action">
    <Button
      class="action__button"
      size="medium"
      is-icon
      type="white"
      icon-left="edit"
      @click="editCategory"
    ></Button>

    <Button
      class="action__button"
      size="medium"
      is-icon
      type="danger"
      icon-left="trash-icon"
      @click="deleteCategory"
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
      async editCategory() {
        const params = (this as any).params;

        await params.context.componentParent.onEditShow({
          ...params.data,
        });
      },

      async deleteCategory() {
        const params = (this as any).params;

        await params.context.componentParent.onDeleteShow({
          ...params.data,
        });
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
