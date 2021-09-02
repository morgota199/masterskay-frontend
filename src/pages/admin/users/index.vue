<template>
  <div class="users">
    <Heading to="/">
      <template #title> Users </template>

      <template #tabs>
        <Users />
      </template>
    </Heading>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Heading } from '@/components/ui';
  import { Users } from '@/components/pages';
  import { UserGateway } from '~/api/user';
  import { store } from '@/store';

  export default Vue.extend({
    async asyncData() {
      const users = await UserGateway.GetAll();

      store.commit.user.setUsers(users);
    },

    components: { Heading, Users },
  });
</script>

<style scoped></style>
