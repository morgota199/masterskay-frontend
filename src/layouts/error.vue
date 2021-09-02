<template>
  <div class="error">
    <div class="error__heading">Oops ... Something went wrong ...</div>
    <div class="error__text">Try restarting and retrying.</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Button } from '~/components/ui';

  export default Vue.extend({
    components: {
      Button,
    },
  });
</script>

<style lang="scss" scoped>
  .error {
    display: flex;
    width: 100%;
    padding: 30px 0;
    align-items: center;
    flex-direction: column;
  }

  .error__image {
    width: 100%;
    margin: 0 auto;
    max-width: 725px;
  }

  .error__heading {
    margin-top: 20px;
    opacity: 0;

    color: #656a85;
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    animation: fade-in 0.75s ease 2s 1 normal forwards;
  }

  .error__text {
    margin-top: 10px;
    opacity: 0;

    width: 270px;
    color: #656a85;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    animation: fade-in 0.75s ease 2.375s 1 normal forwards;
  }

  .error__actions {
    display: inline-flex;
    margin: 30px auto 0;
    opacity: 0;
    animation: fade-in 0.75s ease 2.75s 1 normal forwards;
  }

  .error__button + .error__button {
    margin-left: 20px;
  }

  .error__fzf::v-deep {
    width: 100%;

    .fzf__numbers {
      opacity: 0;
      animation: fade-up 1.5s ease 0.5s 1 normal forwards;
    }
    .fzf__fox {
      opacity: 0;
      animation: fade-in 1.5s ease 0.5s 1 normal forwards;
    }
  }
</style>
