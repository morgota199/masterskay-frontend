<template>
  <div class="nav">
    <NavMobile />
    <NavDesktop />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { NavDesktop } from './NavDesktop';
  import { NavMobile } from './NavMobile';

  export default Vue.extend({
    components: {
      NavDesktop,
      NavMobile,
    },
  });
</script>

<style lang="scss" scoped>
  .nav {
    display: inline-flex;
    align-items: center;
    margin-right: auto;
  }

  @media screen and (max-width: 1100px) {
    .nav {
      margin-left: 16px;
    }
  }
</style>
