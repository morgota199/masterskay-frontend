<template>
  <div class="header">
    <div class="logo">
      <SvgIcon name="icons/logo" @click="mainPage" />
    </div>

    <Nav />

    <div class="auth">
      <div class="user" v-if="!user">
        <SvgIcon name="icons/user" @click="signInPage" />
      </div>
      <div class="user" v-else>
        <Profile />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Nav from './Nav/Nav.vue';
  import { store } from '~/store';
  import { IUser } from '~/api/user';
  import { Button } from '@/components/ui';
  import Profile from './Profile/index.vue';

  export default Vue.extend({
    components: {
      Nav,
      Button,
      Profile,
    },

    computed: {
      user(): IUser.Model | null {
        return store.state.user.user;
      },
    },

    methods: {
      signInPage() {
        this.$router.push('sign-in');
      },

      mainPage() {
        window.location.href = '/';
      },
    },
  });
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    padding: 20px;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    box-shadow: 0 0 10px rgb(22 34 54 / 10%);
    z-index: 3;
  }

  .auth {
    margin-left: auto;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .user span {
    margin-right: 8px;
  }

  .user svg {
    width: 30px;
    height: 30px;
    fill: #dbe1e9;
  }

  .logo {
    margin-right: 20px;
  }

  .logo svg {
    width: 30px;
    height: 30px;
    fill: #000000;
  }
</style>
