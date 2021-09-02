<template>
  <div class="v-hint" :class="type">
    <div class="v-hint__icon">
      <SvgIcon :name="`icons/${icon}`" width="10" height="10" />
    </div>
    <div class="v-hint__text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { HintInterface } from './interfaces';

  export default Vue.extend({
    props: {
      text: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'primary',
        validator(v: string): boolean {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(
            v,
          );
        },
      } as PropOptions<HintInterface.Props.Type>,
    },
    computed: {
      icon(): HintInterface.Icon {
        const icons: HintInterface.Icons = {
          primary: 'icon-i',
          success: 'success-icon',
          warning: 'warning-icon',
          danger: 'icon-i',
          info: 'icon-i',
        };

        return icons[this.type];
      },
    },
  });
</script>

<style lang="scss" scoped>
  .v-hint {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    align-items: center;

    padding: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;

    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  .v-hint__icon {
    display: inline-flex;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    & svg {
      fill: #fff;
    }
  }

  .v-hint__text {
    display: block;
    width: calc(100% - 40px);
    margin-left: 14px;
    align-items: center;

    color: $text-black;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 20px;

    text-overflow: ellipsis;
    overflow: hidden;
  }

  /** Props => Types */
  .primary {
    color: $primary;
    background: #fafcff;
    border-color: #ddebff;

    .v-hint__text {
      color: $primary;
    }

    .v-hint__icon {
      background-color: $primary;
    }
  }
  .success {
    color: $success;
    // background: #f9fdf8;
    border-color: #e1f0da;

    .v-hint__text {
      color: $success;
    }

    .v-hint__icon {
      background-color: $success;
    }
  }
  .warning {
    color: $warning;
    // background: #fffbf8;
    border-color: #fee9da;

    .v-hint__text {
      color: $warning;
    }

    .v-hint__icon {
      background-color: $warning;
    }
  }
  .danger {
    color: $danger;
    // background: #fff9f9;
    border-color: #f8ddde;

    .v-hint__text {
      color: $danger;
    }

    .v-hint__icon {
      background-color: $danger;
    }
  }
  .info {
    color: $info;
    background: #fafcff;
    border-color: #fafcff;

    .v-hint__text {
      color: $text-black;
    }
    .v-hint__icon {
      background-color: #b6bed0;
    }
  }
</style>
