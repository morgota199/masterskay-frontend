<template>
  <NLink
    :key="item.path"
    :to="item.path"
    class="item__link"
    :class="classes"
    :event="item.coming ? '' : 'click'"
    @click.native="item.coming ? '' : onPush()"
  >
    <Tooltip
      :show="item.coming"
      position="right"
      text="Coming soon"
      class="item__tooltip"
      max-width="100px"
    >
      <template #activator>
        <div class="item__frame">
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
    computed: {
      classes(): NavInterface.Mobile.ItemClass {
        return {
          coming: this.item.coming,
        };
      },
    },
    methods: {
      onPush() {
        this.$emit('push');
      },
    },
  });
</script>

<style lang="scss" scoped>
  .item__link {
    display: inline-flex;
    align-items: center;
    padding: 16px 20px;
    border-radius: 5px;
    border: 1px solid #f7f8fa;
    transition: all 0.3s ease;
  }
  .item__link:hover {
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
  .item__link.nav-active-link {
    .item__icon {
      fill: $blue;
    }
    .item__text {
      color: $blue;
    }
  }

  .item__link.coming {
    cursor: not-allowed;
    border-color: #f7f8fa;

    .item__icon {
      fill: #dce1ea;
    }
    .item__text {
      color: #dce1ea;
    }
  }

  .item__frame {
    display: inline-flex;
    align-items: center;
  }

  .item__icon {
    fill: #b6bed0;
    transition: all 0.3s ease;
  }

  .item__text {
    margin-left: 15px;
    color: #656a85;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: all 0.3s ease;
  }
</style>
