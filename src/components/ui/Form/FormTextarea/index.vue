<template>
  <div class="form-textarea">
    <textarea
      :id="id"
      :value="value"
      class="form-textarea__instance"
      :class="textareaClasses"
      :style="textareaStyles"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
    ></textarea>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FormTextareaInterface } from './interfaces';

  export default Vue.extend({
    props: {
      id: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        default: '',
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      resize: {
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
      maxWidth: {
        type: String,
        default: 'initial',
      },
      minHeight: {
        type: String,
        default: 'initial',
      },
      placeholder: {
        type: String,
        default: '',
      },
    },
    computed: {
      textareaClasses(): FormTextareaInterface.Class {
        return {
          fluid: this.fluid,
          resize: this.resize,
          valid: this.valid,
          invalid: this.invalid,
          disabled: this.disabled,
        };
      },
      textareaStyles(): FormTextareaInterface.Style {
        return {
          'max-width': this.maxWidth,
          'min-height': this.minHeight,
        };
      },
    },
    methods: {
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
  .form-textarea {
    display: block;
  }

  .form-textarea__instance {
    color: $text-black;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    font-family: 'Inter', sans-serif;

    width: auto;
    padding: 14px;
    border-radius: 5px;
    background: #ffffff;
    border: 2px solid #f7f8fa;
    box-sizing: border-box;
    resize: none;
    transition: border-color 0.3s ease;

    &:disabled {
      pointer-events: none;
      color: $disabled-font;
      border: $disabled-border;
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
    }
  }

  /** Props => Fluid */
  .fluid {
    width: 100%;
  }

  /** Props => Resize */
  .resize {
    resize: block;
  }

  /** Props => Valid */
  .form-textarea__instance.valid:not(:disabled) {
    border-color: $success;
  }

  /** Props => Invalid */
  .form-textarea__instance.invalid:not(:disabled) {
    border-color: $danger;
  }

  /** Props => Disabled */
</style>
