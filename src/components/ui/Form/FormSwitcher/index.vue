<template>
  <div class="form-switcher" :class="switcherClass" @click="onSwitch">
    <div class="form-switcher__frame">
      <div class="form-switcher__slider"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { FormSwitcherInterface } from './interfaces';

  export default Vue.extend({
    props: {
      size: {
        type: String,
        default: 'medium',
        validator(v: string) {
          return ['small', 'medium', 'big'].includes(v);
        },
      } as PropOptions<FormSwitcherInterface.Props.Size>,

      type: {
        type: String,
        default: 'primary',
        validator(v: string) {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(
            v,
          );
        },
      } as PropOptions<FormSwitcherInterface.Props.Type>,

      value: {
        type: Boolean,
        default: false,
      },

      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      selectedType(): FormSwitcherInterface.Props.Type {
        return this.value ? this.type : '';
      },
      switcherClass(): FormSwitcherInterface.Class {
        return [
          this.size,
          this.selectedType,
          {
            active: this.value,
            disabled: this.disabled,
          },
        ];
      },
    },
    methods: {
      onSwitch() {
        if (!this.disabled) this.$emit('input', !this.value);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .form-switcher {
    position: relative;
    border-width: 1px;
    border-style: solid;
    transition: all ease 0.3s;
    border-radius: 100px;

    border-color: $grey-light;
    background: #f2f6fc;

    &:hover {
      cursor: pointer;
    }
  }

  .form-switcher__frame {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  }

  /** Slider */
  .form-switcher__slider {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: $white;
    transition: all 0.3s ease;
  }

  /** Props => Sizes */
  .big {
    width: 60px;
    height: 36px;
    padding: 4px;
  }
  .big .form-switcher__slider {
    width: 26px;
    height: 26px;
  }
  .big.active .form-switcher__slider {
    left: calc(100% - 26px);
  }

  .medium {
    width: 40px;
    height: 24px;
    padding: 3px;
  }
  .medium .form-switcher__slider {
    width: 16px;
    height: 16px;
  }
  .medium.active .form-switcher__slider {
    left: calc(100% - 16px);
  }

  .small {
    width: 20px;
    height: 12px;
    padding: 1px;
  }
  .small .form-switcher__slider {
    width: 8px;
    height: 8px;
  }
  .small.active .form-switcher__slider {
    left: calc(100% - 8px);
  }

  /** Props => Type */
  .primary:not(:disabled):not(.disabled) {
    border-color: $primary;
    background-color: $primary;

    &:hover {
      border-color: $primary-hover;
      background-color: $primary-hover;
    }
    &:active {
      border-color: $primary-active;
      background-color: $primary-active;
    }
  }

  .success:not(:disabled):not(.disabled) {
    border-color: $success;
    background-color: $success;
    border-color: $success;

    &:hover {
      border-color: $success-hover;
      background-color: $success-hover;
      border-color: $success-hover;
    }
    &:active {
      border-color: $success-active;
      background-color: $success-active;
      border-color: $success-active;
    }
  }
  .warning:not(:disabled):not(.disabled) {
    border-color: $warning;
    background-color: $warning;
    border-color: $warning;

    &:hover {
      border-color: $warning-hover;
      background-color: $warning-hover;
      border-color: $warning-hover;
    }
    &:active {
      border-color: $warning-active;
      background-color: $warning-active;
      border-color: $warning-active;
    }
  }

  .danger:not(:disabled):not(.disabled) {
    border-color: $danger;
    background-color: $danger;
    border-color: $danger;

    &:hover {
      border-color: $danger-hover;
      background-color: $danger-hover;
      border-color: $danger-hover;
    }
    &:active {
      border-color: $danger-active;
      background-color: $danger-active;
      border-color: $danger-active;
    }
  }

  .info:not(:disabled):not(.disabled) {
    border-color: $info;
    background-color: $info;
    border-color: $info;

    &:hover {
      border-color: $info-hover;
      background-color: $info-hover;
      border-color: $info-hover;
    }
    &:active {
      border-color: $info-active;
      background-color: $info-active;
      border-color: $info-active;
    }
  }

  /** Props => Disabled */
  .disabled .form-switcher__slider {
    pointer-events: none;
    cursor: default;
    border-color: $disabled-border;
    background-color: $disabled-font;
  }
</style>
