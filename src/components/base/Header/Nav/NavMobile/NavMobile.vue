<template>
  <div class="nav-mobile">
    <Dropdown
      v-model="opened"
      outside
      :relative="false"
      class="nav-mobile__dropdown"
    >
      <template #activator>
        <NavMobileButton />
      </template>

      <div class="items">
        <NavMobileItemAdmin v-if="$admin" class="items__el" @push="closeNav" />
        <NavMobileItem
          v-for="item in items"
          :key="item.text"
          :item="item"
          class="items__el"
          @push="closeNav"
        />
      </div>
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '~/store';
  import { Dropdown } from '~/components/ui';
  import { Role } from '~/constants/auth/role';
  import { UserCategories } from '../categories';
  import NavMobileItem from './NavMobileItem.vue';
  import NavMobileButton from './NavMobileButton.vue';
  import NavMobileItemAdmin from './NavMobileItemAdmin.vue';

  export default Vue.extend({
    components: {
      Dropdown,
      NavMobileItem,
      NavMobileButton,
      NavMobileItemAdmin,
    },

    data: () => ({
      opened: false,
      items: UserCategories,
    }),

    computed: {
      $admin: (): boolean => {
        return store.state.user.role === Role.Admin;
      },
    },

    methods: {
      toggleNav() {
        this.opened = !this.opened;
      },
      closeNav() {
        this.opened = false;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .nav-mobile {
    display: none;
  }

  .nav-mobile__dropdown {
    &::v-deep .v-dropdown-content {
      top: 56px;
      left: 0;
      width: 100%;
      z-index: 4;
    }
  }

  .items {
    display: flex;
    padding: 20px;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(22, 34, 54, 0.1);
  }
  .items__el {
    & + & {
      margin-top: 14px;
    }
  }

  @include media(tablet) {
    .nav-mobile {
      display: inline-flex;
    }
  }
</style>
