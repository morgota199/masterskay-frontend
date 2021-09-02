<template>
  <div class="item" :class="{ opened }" @click="toggleSub">
    <nuxt-link to="/admin" class="item__link" :event="''">
      <SvgIcon name="icons/shield" width="16" height="16" class="item__icon" />
      <div class="item__text">Admin</div>
      <SvgIcon
        name="icons/down-arrow"
        width="12"
        height="8"
        class="item__icon arrow"
      />
    </nuxt-link>

    <Collapse>
      <div
        v-if="opened"
        key="subitem"
        class="subitem"
        :class="[{ active: opened }]"
      >
        <div class="subitem__frame">
          <nuxt-link
            v-for="{ path, text, icon } in subitem"
            :key="path"
            :to="path"
            class="subitem__link"
            @click.native="onPush"
          >
            <SvgIcon
              :name="`icons/${icon}`"
              width="16"
              height="16"
              class="subitem__icon"
            />
            <div class="subitem__text">
              {{ text }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Collapse } from '@/components/ui/Transitions';
  import { AdminCategories } from '../categories';

  export default Vue.extend({
    components: {
      Collapse,
    },

    data: () => ({
      opened: false,
      subitem: AdminCategories,
    }),

    methods: {
      onPush() {
        this.$emit('push');
      },
      toggleSub() {
        this.opened = !this.opened;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .item {
    display: flex;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #f7f8fa;
    flex-direction: column;
    transition: all 0.3s ease;
  }
  .item:hover,
  .item.opened {
    cursor: pointer;
    border-color: #dce1ea;
    box-shadow: 0px 5px 10px rgba(138, 172, 223, 0.1);

    .item__icon {
      fill: #2b3851;
    }
    .item__text {
      color: $text-black;
    }
  }
  .item.opened {
    .item__icon.arrow {
      transform: rotate(180deg);
    }
  }
  .item .item__link.nav-active-link {
    .item__icon {
      fill: $blue;
    }
    .item__text {
      color: $blue;
    }
  }

  .item__link {
    display: inline-flex;
    width: 100%;
    align-items: center;
    padding: 16px 20px;
    transition: all 0.3s ease;
  }

  .item__icon {
    fill: #b6bed0;
    transition: all 0.3s ease;
  }
  .item__icon.arrow {
    margin-left: auto;
  }

  .item__text {
    margin-left: 15px;
    color: #656a85;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: all 0.3s ease;
  }

  .subitem {
    display: block;
    width: 100%;
    height: 0;
    overflow: hidden;
  }
  .subitem__frame {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .subitem__link {
    display: inline-flex;
    width: 100%;
    align-items: center;
    padding: 14px 20px;
    transition: all 0.3s ease;
  }
  .subitem__link:hover {
    cursor: pointer;
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
    margin-left: 15px;
    color: #656a85;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: all 0.3s ease;
  }
</style>
