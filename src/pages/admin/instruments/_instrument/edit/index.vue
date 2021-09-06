<template>
  <Heading to="/">
    <template #title> Instrument Edit </template>

    <template #tabs>
      <InstrumentEdit/>
    </template>
  </Heading>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Heading } from '@/components/ui';
  import { InstrumentEdit } from "@/components/pages";
  export default Vue.extend({
    components: { Heading, InstrumentEdit },
  });
</script>

<style lang="scss" scoped></style>
