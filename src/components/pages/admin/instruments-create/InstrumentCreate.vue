<template>
  <div class="instrument-create">
    <Images/>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Button } from "@/components/ui"
  import Images from "./images/Images.vue"

  export default Vue.extend({
    components: { Button, Images }
  });
</script>

<style lang="scss" scoped>
  .instrument-create {
    width: 100%;
  }
</style>
