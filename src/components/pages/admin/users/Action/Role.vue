<template>
  <div @click="setRole">
    <Label fluid :type="color" max-width="100px">{{ type }}</Label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Role } from '~/constants/auth/role';
  import { Label } from '@/components/ui';
  import { store } from '~/store';
  import { UserGateway } from '~/api';

  export default Vue.extend({
    components: {
      Label,
    },

    methods: {
      async setRole() {
        if (store.state.user.user._id === this.params.data._id) return;

        try {
          store.commit.loading.setLoading(false);

          await UserGateway.ToggleAdmin({ userId: this.params.data._id });

          this.params.data.role =
            this.params.data.role === Role.User ? Role.Admin : Role.User;
        } catch (error) {
          console.log(error);
        } finally {
          store.commit.loading.setLoading(false);
        }
      },
    },

    computed: {
      type(): string {
        return this.params.data.role === Role.User ? 'User' : 'Admin';
      },
      color(): string {
        return this.params.data.role === Role.User ? 'success' : 'primary';
      },
    },
  });
</script>

<style lang="scss" scoped></style>
