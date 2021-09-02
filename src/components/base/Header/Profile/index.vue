<template>
  <div class="user">
    <Dropdown
      v-model="opened"
      outside
      min-width="220px"
      class="dropdown"
      :relative="false"
    >
      <template #activator>
        <div class="user__frame">
          <div class="user__fio">{{ fio }}</div>
          <div class="user__icon" :class="[{ opened }]">
            <SvgIcon name="icons/down-arrow" width="12" height="8" />
          </div>
          <div class="user__icon mobile" :class="[{ opened }]">
            <SvgIcon name="icons/settings" width="16" height="16" />
          </div>
        </div>
      </template>

      <div class="menu">
        <NLink
          v-for="{ path, text, icon } in menu"
          :key="text"
          :to="path"
          class="menu__item"
          @click.native="closeMenu"
        >
          <div class="menu__icon">
            <SvgIcon :name="icon" width="12" height="12" />
          </div>
          <div class="menu__text">{{ text }}</div>
        </NLink>

        <div key="logout" class="menu__item" @click="logout">
          <div class="menu__icon">
            <SvgIcon name="power-icon" width="12" height="12" />
          </div>
          <div class="menu__text">Log out</div>
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '~/store';
  import { IUser } from '@/api/user';
  import { Dropdown } from '~/components/ui';

  export default Vue.extend({
    components: {
      Dropdown,
    },
    data: () => ({
      opened: false,
      menu: [],
    }),

    computed: {
      user(): IUser.Model | null {
        return store.state.user.user;
      },

      fio(): string {
        return this.user.email;
      },
    },
    methods: {
      closeMenu() {
        this.opened = false;
      },
      async logout() {
        try {
          this.closeMenu();

          store.commit.pushNotification.unset();

          await this.$router.push('/main');

          setTimeout(async () => {
            store.dispatch.auth.signOut();
          }, 40);
        } catch (e) {
          console.error(e);
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .user {
    position: relative;
    display: inline-flex;
    height: 100%;
    align-items: center;
    margin-left: 20px;

    &:hover {
      cursor: pointer;
    }
  }
  .user__frame {
    display: flex;
    align-items: center;
  }
  .user__fio {
    color: $text-black;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-right: 10px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user__icon {
    display: inline-flex;
    transition: all 0.3s ease;

    & svg {
      fill: #b6bed0;
    }
  }
  .user__icon.mobile {
    display: none;

    & svg {
      fill: #8287a6;
    }
  }
  .user__icon.opened {
    transform: rotate(180deg);
  }

  .dropdown {
    &::v-deep .v-dropdown-content {
      top: calc(100% + 10px);
      right: 0;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #f7f8fa;
    box-shadow: 0px 2px 5px #f9fbff;
  }
  .menu__item {
    display: inline-flex;
    align-items: center;
    padding: 12px;
    transition: all 0.3s ease;

    &:first-child {
      border-radius: 5px 5px 0 0;
    }
    &:last-child {
      border-radius: 0 0 5px 5px;
    }
  }
  .menu__item:hover {
    cursor: pointer;
    background: #fafcff;

    .menu__icon {
      & svg {
        fill: #637392;
      }
    }
  }

  .menu__icon {
    display: inline-flex;

    & svg {
      fill: #b6bed0;
      transition: all 0.3s ease;
    }
  }
  .menu__text {
    color: #656a85;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-left: 8px;
    transition: all 0.3s ease;
  }

  @include media(tablet) {
    .user__icon {
      display: none;
    }
    .user__icon.mobile {
      display: inline-flex;
    }
  }
  @include media(mobile) {
    .user {
      margin-left: 0;
    }
    .user__fio {
      display: none;
    }
    .user__avatar {
      width: 30px;
      height: 30px;
    }
  }
</style>
