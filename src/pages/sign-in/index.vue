<template>
  <main class="sign-in">
    <div class="sign-in_frame">
      <div class="title">
        <h2>Sign In</h2>
      </div>

      <Notify />

      <SignInForm />
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { SignInForm } from '@/components/pages/sign-in';
  import { Notify } from '@/components/ui';

  export default Vue.extend({
    components: {
      Notify,
      SignInForm,
    },

    layout: 'sign',
  });
</script>

<style lang="scss" scoped>
  .sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .sign-in_frame {
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
</style>
