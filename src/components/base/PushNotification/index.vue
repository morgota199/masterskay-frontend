<template>
  <transition name="fade">
    <div v-if="visible" key="notification" class="the-notification">
      <Container>
        <PushNotification :type="notification.type" @cancel="closeNotification">
          {{ notification.text }}
        </PushNotification>
      </Container>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '~/store';
  import { Container, PushNotification } from '~/components/ui';
  import { IPushNotification } from '~/components/ui/PushNotification/interfaces';

  export default Vue.extend({
    components: {
      Container,
      PushNotification,
    },
    computed: {
      visible(): boolean {
        return store.state.pushNotification.visible;
      },
      notification(): IPushNotification.Model {
        return store.state.pushNotification.notification;
      },
    },
    methods: {
      closeNotification() {
        store.commit.pushNotification.unset();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .the-notification {
    position: absolute;
    top: 86px;
    left: 50%;
    width: 100%;
    max-width: 1200px;
    transform: translateX(-50%);
    z-index: 1;
  }
</style>
