<template>
  <div class="nav-desktop">
    <NavDesktopItemAdmin v-if="$admin" class="nav-desktop__item" />
    <NavDesktopItem
      v-for="item in items"
      :key="item.path"
      :item="item"
      class="nav-desktop__item"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '~/store';
  import { Role } from '~/constants/auth/role';
  import { UserCategories } from '../categories';
  import NavDesktopItem from './NavDesktopItem.vue';
  import NavDesktopItemAdmin from './NavDesktopItemAdmin.vue';

  export default Vue.extend({
    components: {
      NavDesktopItem,
      NavDesktopItemAdmin,
    },

    computed: {
      $admin: (): boolean => {
        return store.state.user.role === Role.Admin;
      },
    },

    data: () => ({
      items: UserCategories,
    }),
  });
</script>

<style lang="scss" scoped>
  .nav-desktop {
    display: flex;
  }
  .nav-desktop__item + .nav-desktop__item {
    margin-left: 10px;
  }

  // Ужато для умещения в 992-1044
  @media screen and (max-width: 1100px) {
    .nav-desktop__item + .nav-desktop__item {
      margin-left: 0;
    }
  }

  @include media(tablet) {
    .nav-desktop {
      display: none;
    }
  }
</style>
