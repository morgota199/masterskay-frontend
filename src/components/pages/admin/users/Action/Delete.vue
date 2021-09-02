<template>
  <div class="action">
    <Button
      class="action__button"
      size="medium"
      is-icon
      type="danger"
      icon-left="trash-icon"
      @click="deleteCategory"
      :disabled="params.data._id === loginUser._id"
    ></Button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Button } from '@/components/ui';
  import { IUser } from '~/api/user';
  import { store } from '~/store';

  export default Vue.extend({
    components: {
      Button,
    },

    computed: {
      loginUser(): IUser.Model {
        return store.state.user.user;
      },
    },

    methods: {
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
