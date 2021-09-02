<template>
  <div class="form-input" :class="layoutClass" :style="layoutStyle">
    <input
      :id="id"
      ref="input"
      :readonly="readonly"
      class="form-input__field"
      :class="inputClass"
      :type="newType"
      :value="value"
      :disabled="disabled"
      :tabindex="tabindex"
      :placeholder="placeholder"
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
        class="form-input__icon-left"
        :class="iconLeftClass"
        @click="iconClick('left-icon-click', $event)"
      />
    </transition>

    <SvgIcon
      v-if="isPassword"
      key="password-icon"
      width="20"
      height="20"
      :name="`icons/${passwordIcon}`"
      class="form-input__icon-right clickable"
      @click="togglePasswordVisibility"
    />
    <span v-else-if="append" class="form-input__append">
      {{ append }}
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FormInputInterface } from './interfaces';

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

      type: {
        type: String,
        default: 'text',
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

      placeholder: {
        type: String,
        default: '',
      },

      append: {
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

    data() {
      return {
        newType: this.type,

        isPassword: this.type === 'password',
        isPasswordVisible: false,
      };
    },

    computed: {
      layoutClass(): FormInputInterface.Class.Layout {
        return {
          fluid: this.fluid,
          'has-icon-left': this.iconLeft,
          'has-icon-right': this.isPassword,
          'has-append': !!(this.append && !this.isPassword),
        };
      },

      layoutStyle(): FormInputInterface.Style.Layout {
        return {
          'max-width': this.maxWidth,
        };
      },

      inputClass(): FormInputInterface.Class.Input {
        return [
          this.customClass,
          {
            valid: this.valid && !this.invalid,
            invalid: this.invalid,
          },
        ];
      },

      iconLeftClass(): FormInputInterface.Class.LeftIcon {
        return [{ clickable: this.iconLeftClickable }];
      },

      passwordIcon(): string {
        return this.isPasswordVisible ? 'eye' : 'eye-off';
      },
    },

    mounted() {
      if (this.autocomplete === 'off') {
        const input = this.$refs.input as HTMLInputElement;

        input.setAttribute('readonly', 'readonly');

        if (!this.readonly) input.removeAttribute('readonly');
      }
    },

    methods: {
      togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.newType = this.isPasswordVisible ? 'text' : 'password';

        this.onFocus();
      },

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
  $input-padding-with-icon: 2.6em;

  .form-input {
    position: relative;
    display: inline-flex;
    align-items: center;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    font-family: 'Inter', sans-serif;

    &.has-icon-right {
      .form-input__field {
        padding-right: $input-padding-with-icon;
      }
    }
    &.has-icon-left {
      .form-input__field {
        padding-left: $input-padding-with-icon;
      }
    }
    &.has-append {
      .form-input__field {
        padding-right: 70px;
      }
    }
  }
  .form-input__append {
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
  .form-input__field {
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
    cursor: pointer;

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
      ~ .form-input__icon-right,
      ~ .form-input__append {
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
  .form-input__icon-left,
  .form-input__icon-right {
    position: absolute;
    fill: #b6bed0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .form-input__icon-left {
    left: 15px;
    fill: #b6bed0;
  }
  .form-input__icon-right {
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
