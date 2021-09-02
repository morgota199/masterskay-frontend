<template>
  <div :class="['tooltip', { fluid }]">
    <transition name="fade">
      <div
        v-if="visible"
        key="tooltip"
        class="tooltip-content"
        :class="this.class"
        :style="style"
      >
        <div class="tooltip-text" :style="{ textAlign }">
          {{ text }}
        </div>
      </div>
    </transition>

    <div
      class="tooltip-activator"
      @mouseenter="enterTooltip"
      @mouseleave="leaveTooltip"
    >
      <slot name="activator"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { TooltipInterface } from './interfaces';

  export default Vue.extend({
    props: {
      dark: {
        type: Boolean,
        default: false,
      },
      show: {
        type: Boolean,
        default: true,
      },
      text: {
        type: String,
        default: '',
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      textAlign: {
        type: String,
        default: 'center',
        validator(v: string) {
          return ['start', 'center', 'end', 'justify'].includes(v);
        },
      } as PropOptions<TooltipInterface.Props.textAlign>,
      position: {
        type: String,
        default: 'top',
        validator(v: string) {
          return ['top', 'left', 'right', 'bottom'].includes(v);
        },
      } as PropOptions<TooltipInterface.Props.Position>,
      justify: {
        type: String,
        default: 'center',
        validator(v: string) {
          return ['start', 'center', 'end'].includes(v);
        },
      } as PropOptions<TooltipInterface.Props.Justify>,
      maxWidth: {
        type: String,
        default: '100%',
      },
      minWidth: {
        type: String,
        default: '160px',
      },
    },
    data: () => ({
      status: false,
    }),
    computed: {
      visible(): boolean {
        return this.status && this.show;
      },
      class(): TooltipInterface.Class {
        return [
          this.position,
          this.justify,
          {
            dark: this.dark,
          },
        ];
      },
      style(): TooltipInterface.Style {
        return {
          maxWidth: this.maxWidth,
          minWidth: this.minWidth,
        };
      },
    },
    methods: {
      enterTooltip() {
        this.status = true;
      },
      leaveTooltip() {
        this.status = false;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .tooltip {
    position: relative;
    display: inline-flex;
    width: auto;
    height: auto;
  }

  .tooltip.fluid {
    width: 100%;

    & .tooltip-activator {
      width: 100%;
    }
  }

  .tooltip-content {
    position: absolute;
    display: inline-flex;
    z-index: 1;
    width: max-content;
    padding: 6px 8px;
    background: $white;
    border-radius: 4px;
    border: 1px solid #dce1ea;
    box-sizing: border-box;

    transition: border-color 0.3s ease, background 0.3s ease;
  }

  .tooltip-text {
    display: block;
    width: 100%;

    color: $text-black;
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    font-style: normal;

    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;

    transition: color 0.3s ease;
  }

  /** Props -> Dark */
  .tooltip-content.dark {
    background-color: #2b3851;
    border-color: #2b3851;
  }
  .tooltip-content.dark .tooltip-text {
    color: $white;
  }

  /** Props -> Position */
  .top {
    bottom: calc(100% + 5px);
  }
  .left {
    right: calc(100% + 5px);
  }
  .right {
    left: calc(100% + 5px);
  }
  .bottom {
    top: calc(100% + 5px);
  }

  /** Props -> Justify */
  .top,
  .bottom {
    &.start {
      left: 0;
    }
    &.center {
      left: 50%;
      transform: translateX(-50%);
    }
    &.end {
      left: 100%;
      transform: translateX(-100%);
    }
  }

  .left,
  .right {
    &.start {
      top: 0;
    }
    &.center {
      top: 50%;
      transform: translateY(-50%);
    }
    &.end {
      top: 100%;
      transform: translateY(-100%);
    }
  }

  /** Transition */
  // TODO: Вынести в animation, когда разберемся почему не подтягивает анимацию по имени напрямую
  .fade {
    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-enter-to,
    &-leave {
      opacity: 1;
    }

    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s ease;
    }
  }
</style>
