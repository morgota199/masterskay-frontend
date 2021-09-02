<template>
  <main class="reset-password">
    <div class="reset-password_frame">
      <div class="title">
        <h2>Reset Password</h2>
      </div>

      <InputEmail v-if="!token" key="current-email" />
      <NewPassword v-else key="new-password" />
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { InputEmail, NewPassword } from '@/components/pages/restore-password';

  export default Vue.extend({
    components: {
      InputEmail,
      NewPassword,
    },

    layout: 'sign',

    computed: {
      token(): string | undefined {
        return this.$route.query.token as string;
      },
    },

    head() {
      return {
        meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      };
    },
  });
</script>

<style lang="scss" scoped>
  .reset-password {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .reset-password_frame {
    display: inline-flex;
    max-width: 520px;
    width: 100%;
    padding: 40px;
    border-radius: 10px;
    background: #fff;
    flex-direction: column;
    box-shadow: 0px 0px 5px #303744;
  }

  .title {
    margin-bottom: 15px;
  }

  .restore {
    display: flex;
    width: 100%;
    height: 100vh;
  }

  .restore__step {
    display: flex;
    width: 100%;
    margin: auto;
    padding: 40px;
    max-width: 520px;
    background: #fff;
    border-radius: 4px;
    flex-direction: column;
  }

  .restore__notifications {
    margin-bottom: 20px;
  }

  .restore__title {
    margin-bottom: 30px;
    color: #373e4b;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
  }

  .restore__submit {
    margin-top: 20px;
  }

  .restore__logo-push {
    margin: 0px auto;
    position: absolute;
    top: 50px;
    left: 50px;
  }

  .restore__logo {
    fill: $white;
  }

  .restore__back {
    background: #f1f4fa;
    margin-top: 10px;
    padding: 8.1px;
    width: 100%;
    color: #8a91a4;
    font-size: 13.5px;
    line-height: 17px;
    font-weight: 500;
    text-align: center;
  }

  @include media(mobile) {
    .restore__logo-push {
      left: 25px;
    }
  }
</style>
