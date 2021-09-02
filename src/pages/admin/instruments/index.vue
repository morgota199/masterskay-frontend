<template>
  <Heading to="/">
    <template #title> Instruments </template>

    <template #tabs>
      <Instruments />
    </template>
  </Heading>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Heading } from '@/components/ui';
  import { Instruments } from '@/components/pages';
  import { InstrumentsGateway } from '~/api';
  import { store } from '@/store';

  export default Vue.extend({
    components: { Heading, Instruments },

    async asyncData() {
      const [categories, subCategories] = await Promise.all([
        InstrumentsGateway.GetAll(),
      ]);

      store.commit.instruments.setInstruments(categories);
    },
  });
</script>

<style lang="scss" scoped></style>
