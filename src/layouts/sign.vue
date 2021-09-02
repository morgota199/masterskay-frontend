<template>
  <div class="layout-content">
    <Nuxt />

    <Loader v-if="loading" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '@/store';
  import { Loader } from '@/components/ui';

  export default Vue.extend({
    components: {
      Loader,
    },

    computed: {
      loading() {
        return store.state.loading.loading;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .layout-content {
    height: 100vh;
  }
</style>
