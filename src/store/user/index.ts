import { defineModule } from 'direct-vuex';
import { IUser } from '@/api/user';
import { Role } from '~/constants/auth/role';

interface State {
  user: IUser.Model | null;
  users: IUser.Model[];
  selected: boolean;
  role: Role;
}

export const user = defineModule({
  namespaced: true,

  state: {
    user: null,
    selected: false,
    role: Role.User,
  } as State,

  mutations: {
    setUser(state: State, user: IUser.Model | null) {
      state.user = user;
    },

    setUsers(state: State, users: IUser.Model[]) {
      state.users = users
    },

    setSelected(state: State, selected: boolean) {
      state.selected = selected;
    },

    setRole(state: State, role: Role) {
      state.role = role;
    },
  },
});
