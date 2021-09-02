<template>
  <div class="tabs">
    <div class="tabs__head">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tabs__item"
        :class="[{ active: isSelected(index) }]"
        @click="selectTab(index)"
      >
        <SvgIcon
          v-if="tab.icon"
          class="icon"
          :name="tab.icon"
          :fill="isSelected(index) ? '#2968C8' : '#BCC4D1'"
          width="14"
          height="14"
        />
        {{ tab.title }}

        <Tooltip
          v-if="tab.tooltipText"
          light
          fluid
          position="bottom"
          :text-align="'start'"
          :justify="'start'"
          :text="tab.tooltipText"
          :max-width="'280px'"
          class="tooltip"
        >
          <template #activator>
            <SvgIcon
              class="tooltip__icon"
              name="info"
              :fill="isSelected(index) ? '#2968C8' : '#BCC4D1'"
              width="14"
              height="14"
            />
          </template>
        </Tooltip>
      </div>
    </div>

    <div class="tabs__content">
      <transition name="fade-absolute" mode="out-in">
        <component
          :is="selected.component"
          :key="selected.title"
          v-bind="$attrs"
          class="tabs__item"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { TabsInterface } from './interfaces';
  import { Tooltip } from '@/components/ui';

  export default Vue.extend({
    components: {
      Tooltip,
    },

    props: {
      tabs: {
        type: Array,
        default: () => [] as TabsInterface.Props.Tab[],
      } as PropOptions<TabsInterface.Props.Tab[]>,
    },

    data: () => ({
      selectedIndex: 0,
    }),

    computed: {
      selected(): TabsInterface.Props.Tab {
        return this.tabs[this.selectedIndex];
      },
    },

    methods: {
      selectTab(index: number) {
        this.selectedIndex = index;
      },

      isSelected(index: number) {
        return this.selectedIndex === index;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .tabs {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .icon {
    margin-right: 10px;
    margin-top: 2px;
  }

  .tooltip__icon {
    transition: $default-transition;
    margin-left: 6px;
    margin-top: 2px;
  }

  .tooltip {
    cursor: pointer;
  }

  .tooltip:hover {
    .tooltip__icon {
      fill: #8a91a4;
    }
  }

  .tabs__head {
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    border-bottom: 1px solid #f7f8fa;
  }

  .tabs__content {
    position: relative;
  }

  .tabs__item {
    position: relative;
    display: inline-flex;
    padding-bottom: 16px;

    color: #656a85;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    transition: color 0.3s ease, opacity 0.3s ease;

    &.active {
      color: #2968c8;

      &::after {
        opacity: 1;
        visibility: visible;
      }
    }

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 2px solid #accdff;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .tabs__item + .tabs__item {
    margin-left: 30px;
  }

  @include media(mobile) {
    .tabs__item + .tabs__item {
      margin-left: 12px;
    }
  }
</style>
