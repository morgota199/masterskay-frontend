<template>
  <div>
    <Header />

    <PushNotification />

    <transition name="fade" mode="out-in">
      <div v-if="render" class="layout-content">
        <Container>
          <Nuxt />
        </Container>
      </div>
    </transition>

    <Loader v-if="loading" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '@/store';
  import { Container, Loader } from '@/components/ui';

  import { Header, PushNotification } from '@/components/base';

  export default Vue.extend({
    components: {
      Header,
      Loader,
      Container,
      PushNotification,
    },

    computed: {
      render() {
        return store.state.loading.render;
      },

      loading() {
        return store.state.loading.loading;
      },
    },

    async mounted() {
      store.commit.loading.setLoading(true);

      store.commit.loading.setRender(true);

      store.commit.loading.setLoading(false);
    },
  });
</script>

<style lang="scss" scoped>
  .layout-content {
    padding: 86px 0 30px;
    background: #ffffff;
  }
</style>
