<template>
  <main class="sign-up">
    <div class="sign-up_frame">
      <div class="title">
        <h2>Sign Up</h2>
      </div>

      <Notify />
      <SignUpForm />
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { SignUpForm } from '@/components/pages';
  import { Notify } from '@/components/ui';
  export default Vue.extend({
    components: {
      Notify,
      SignUpForm,
    },

    layout: 'sign',
  });
</script>

<style lang="scss" scoped>
  .sign-up {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .sign-up_frame {
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
