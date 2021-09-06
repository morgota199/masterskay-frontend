<template>
  <Heading to="/">
    <template #title> Instrument Create </template>

    <template #tabs>
      <InstrumentCreate />
    </template>
  </Heading>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Heading } from '@/components/ui';
  import { InstrumentCreate } from "@/components/pages"

  export default Vue.extend({
    components: { Heading, InstrumentCreate },
  });
</script>

<style lang="scss" scoped></style>
