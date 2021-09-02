<template>
  <transition name="fade">
    <div key="loading" class="loading">
      <div class="loading-overlay"></div>
      <div class="loading-box">
        <Spinner />

        <div class="loading-text">Loading</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Spinner from '@/components/ui/Spinner/index.vue';

  export default Vue.extend({
    components: { Spinner },
  });
</script>

<style lang="scss" scoped>
  .loading {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 10;
  }

  .loading-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(43, 56, 81, 0.9);
    filter: blur(1);

    &:hover {
      cursor: pointer;
    }
  }

  .loading-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    z-index: 11;
  }

  .loading-text {
    margin-top: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
  }
</style>
