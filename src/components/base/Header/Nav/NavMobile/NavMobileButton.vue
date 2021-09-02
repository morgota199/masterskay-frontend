<template>
  <div class="mobile-button">
    <span class="mobile-button-line"></span>
    <span class="mobile-button-line"></span>
    <span class="mobile-button-line"></span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({});
</script>

<style lang="scss" scoped>
  .mobile-button {
    position: relative;
    width: 18px;
    height: 14px;
  }

  .mobile-button-line {
    position: absolute;
    width: 100%;
    left: 0;
    border-radius: 1px;
    border-top: 2px solid #b6bed0;

    &:first-child {
      top: 0px;
    }

    &:nth-child(2) {
      top: calc(50% - 1px);
    }

    &:last-child {
      top: calc(100% - 1px);
    }
  }
</style>
