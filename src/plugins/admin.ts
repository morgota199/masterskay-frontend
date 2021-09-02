import Vue from 'vue';
import { Role } from '~/constants/auth/role';
import { store } from '@/store';

Vue.mixin({
  computed: {
    $admin: (): boolean => store.state.user.role === Role.Admin,
  },
});
