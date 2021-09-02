<template>
  <div class="form-radio" :style="layoutStyle">
    <input
      :id="id"
      ref="input"
      :readonly="readonly"
      class="form-radio__field"
      :class="radioClass"
      type="radio"
      :value="value"
      :disabled="disabled"
      :tabindex="tabindex"
      :autocomplete="autocomplete"
      :name="name"
      :checked="checked"
      @input="onInput"
      @change="onChange"
    />

    <transition name="fade" mode="out-in">
      <SvgIcon
        v-if="iconLeft"
        :key="iconLeft"
        :name="`icons/${iconLeft}`"
        width="15"
        height="15"
        class="form-radio__icon-left"
        @click="iconClick('left-icon-click', $event)"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FormRadioInterface } from './interfaces';

  export default Vue.extend({
    inheritAttrs: false,
    props: {
      id: {
        type: String,
        default: '',
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      valid: {
        type: Boolean,
        default: false,
      },
      invalid: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
        default: '',
      },
      checked: {
        type: Boolean,
        default: false,
      },

      value: {
        type: String,
        default: '',
      },
      customClass: {
        type: String,
        default: '',
      },
      autocomplete: {
        type: String,
        default: 'off',
      },

      maxWidth: {
        type: String,
        default: 'initial',
      },
      iconLeft: {
        type: String,
        default: '',
      },
      iconLeftClickable: {
        type: Boolean,
        default: false,
      },
      tabindex: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      layoutStyle(): FormRadioInterface.Style.Layout {
        return {
          'max-width': this.maxWidth,
        };
      },
      radioClass(): FormRadioInterface.Class.Radio {
        return [
          this.customClass,
          {
            valid: this.valid && !this.invalid,
            invalid: this.invalid,
          },
        ];
      },
    },
    methods: {
      iconClick(emit: string, event: Event) {
        this.$emit(emit, event);
        this.onFocus();
      },

      onFocus() {
        const input = this.$refs.input as HTMLInputElement;
        this.$nextTick(() => {
          input.focus();
        });
      },
      onChange(event: InputEvent) {
        const el = event.target as HTMLInputElement;
        this.$emit('change', el.value);
      },
      onInput(event: InputEvent) {
        const el = event.target as HTMLInputElement;
        this.$emit('input', el.value);
      },
    },
  });
</script>

<style lang="scss" scoped>
  $radio-padding-with-icon: 2.6em;

  .form-radio {
    position: relative;
    display: inline-flex;
    align-items: center;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    font-family: 'Inter', sans-serif;

    &.has-icon-right {
      .form-radio__field {
        padding-right: $radio-padding-with-icon;
      }
    }
    &.has-icon-left {
      .form-radio__field {
        padding-left: $radio-padding-with-icon;
      }
    }
    &.has-append {
      .form-radio__field {
        padding-right: 70px;
      }
    }
  }
  .form-radio__append {
    position: absolute;
    z-index: 1;
    right: 10px;
    max-width: 55px;
    color: #8287a6;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color 0.3s ease;
  }
  .form-radio__field {
    flex: 1;
    width: 100%;
    height: 45px;
    padding: 14px;
    color: #2b3851;
    background: #fff;
    border-radius: 5px;
    border: 2px solid #edf2fa;
    box-sizing: border-box;
    filter: none !important;
    transition: all 0.3s ease;

    &:disabled {
      pointer-events: none;
      color: $disabled-font;
      background-color: #fafcff;
      border: 2px solid #f2f6fc;
    }
    &::placeholder:not(:disabled) {
      color: #8287a6;
      font-size: 12px;
    }
    &:hover:not(:disabled) {
      border-color: $blue-light;
    }

    &:focus:not(:disabled) {
      border-color: $blue-light;

      &,
      ~ .form-radio__icon-right,
      ~ .form-radio__append {
        fill: $text-black;
        color: $text-black;
      }
    }

    &.invalid:not(:disabled) {
      border-color: $danger;
    }

    &.valid:not(:disabled) {
      border-color: $success;
    }
  }

  // Icon styles
  .form-radio__icon-left,
  .form-radio__icon-right {
    position: absolute;
    fill: #b6bed0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .form-radio__icon-left {
    left: 15px;
    fill: #b6bed0;
  }
  .form-radio__icon-right {
    right: 15px;
    &:active {
      color: $primary;
    }
  }
  .clickable {
    cursor: pointer;
    pointer-events: auto;
  }
</style>
