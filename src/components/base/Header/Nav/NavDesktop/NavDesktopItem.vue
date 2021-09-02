<template>
  <div class="item">
    <NLink
      :to="item.path"
      class="item__link"
      :class="[{ coming: item.coming }]"
      :event="item.coming ? '' : 'click'"
    >
      <Tooltip
        :show="item.coming"
        fluid
        position="bottom"
        text="Coming soon"
        class="item__tooltip"
        :max-width="'100px'"
        :min-width="'100px'"
      >
        <template #activator>
          <div class="item__item">
            <SvgIcon
              :name="item.icon"
              width="16"
              height="16"
              class="item__icon"
            />

            <div class="item__text">
              {{ item.text }}
            </div>
          </div>
        </template>
      </Tooltip>
    </NLink>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { Tooltip } from '~/components/ui';
  import { NavInterface } from '../Nav.interface';

  export default Vue.extend({
    components: {
      Tooltip,
    },
    props: {
      item: {
        type: Object,
        required: true,
      } as PropOptions<NavInterface.Item>,
    },
  });
</script>

<style lang="scss" scoped>
  .item__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 18px 14px;

    &::v-deep {
      .tooltip-activator {
        display: inline-flex;
      }
    }

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: -1px;
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
  .item__link.coming {
    cursor: not-allowed;

    .item__icon {
      fill: #dce1ea;
    }
    .item__text {
      color: #dce1ea;
    }
    &::after {
      border: none;
    }
  }

  .item__tooltip {
    z-index: 1;
  }

  .item__item {
    display: inline-flex;
    align-items: center;
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
</style>
