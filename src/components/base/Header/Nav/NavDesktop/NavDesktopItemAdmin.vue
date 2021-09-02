<template>
  <Dropdown v-model="opened" outside min-width="220px" max-width="220px">
    <template #activator>
      <NLink to="/admin" class="item__link" :event="null" @click.prevent>
        <SvgIcon
          name="icons/shield"
          width="16"
          height="16"
          class="item__icon"
        />
        <div class="item__text">Admin</div>
      </NLink>
    </template>

    <div class="subitem">
      <nuxt-link
        v-for="{ path, text, icon } in subitems"
        :key="path"
        :to="path"
        class="subitem__link"
        @click.native="onPush"
      >
        <SvgIcon
          :name="`icons/${icon}`"
          width="12"
          height="12"
          class="subitem__icon"
        />
        <div class="subitem__text">{{ text }}</div>
      </nuxt-link>
    </div>
  </Dropdown>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Dropdown } from '~/components/ui';
  import { AdminCategories } from '../categories';

  export default Vue.extend({
    components: {
      Dropdown,
    },

    data: () => ({
      opened: false,
      subitems: AdminCategories,
    }),

    methods: {
      onPush() {
        this.opened = false;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .item__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 18px 14px;

    & + & {
      margin-left: 10px;
    }

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      opacity: 0;
      border-bottom: 2px solid #dce1ea;
      transition: all 0.3s ease;
    }
  }
  .item__link:hover {
    cursor: pointer;

    .item__icon {
      fill: #8287a6;
    }
    .item__text {
      color: $text-black;
    }

    &::after {
      opacity: 1;
    }
  }
  .item__link.nav-active-link {
    .item__icon {
      fill: $blue;
    }
    .item__text {
      color: $blue;
    }
    &::after {
      opacity: 1;
      border-color: $blue;
    }
  }

  .item__text {
    margin-left: 10px;

    color: #656a85;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    transition: all 0.3s ease;
  }

  .item__icon {
    fill: #b6bed0;
    transition: all 0.3s ease;
  }

  .subitem {
    display: flex;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #f7f8fa;
    box-shadow: 0px 2px 5px #f9fbff;
    flex-direction: column;
  }

  .subitem__link {
    display: inline-flex;
    width: 100%;
    align-items: center;
    padding: 12px;
    background: #ffffff;
    transition: all 0.3s ease;

    &:first-child {
      border-radius: 5px 5px 0px 0px;
    }

    &:last-child {
      border-radius: 0px 0px 5px 5px;
    }
  }
  .subitem__link:hover {
    background: #fafcff;

    .subitem__icon {
      fill: #637392;
    }
  }
  .subitem__link.nav-active-link {
    .subitem__icon {
      fill: $blue;
    }
    .subitem__text {
      color: $blue;
    }
  }

  .subitem__icon {
    fill: #b6bed0;
    transition: all 0.3s ease;
  }

  .subitem__text {
    margin-left: 8px;
    color: #656a85;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
</style>
