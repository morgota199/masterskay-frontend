<template>
  <label class="form-checkbox" :class="classes">
    <input
      class="form-checkbox__input"
      type="checkbox"
      :name="name"
      :checked="!!value"
      :disabled="disabled"
      @input="onChecked($event.target.checked)"
      @change="onChecked($event.target.checked)"
    />

    <SvgIcon
      name="icons/check"
      width="8"
      height="8"
      class="form-checkbox__check"
    />
  </label>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { IFormCheckbox } from './interfaces';

  export default Vue.extend({
    props: {
      type: {
        validator(s) {
          return [
            'primary',
            'success',
            'warning',
            'danger',
            'info',
            'basic',
          ].includes(s);
        },
        default: 'primary',
      } as PropOptions<IFormCheckbox.Type>,
      value: {
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

      id: {
        type: String,
        default: '',
      },
    },

    computed: {
      classes(): IFormCheckbox.Class {
        return [
          this.type,
          {
            checked: this.value,
            disabled: this.disabled,
          },
        ];
      },
    },

    methods: {
      onChecked(value: boolean) {
        this.$emit('input', value);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .form-checkbox {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    color: #fff;
    border-radius: 4px;
    background-color: #fff;
    border: 2px solid #dce1ea;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
    }
  }

  .form-checkbox__input {
    display: none;

    &:checked {
      ~ .form-checkbox__check {
        opacity: 1;
      }
    }
  }

  .form-checkbox__check {
    fill: #fff;
    opacity: 0;
    transition: all 0.3s ease;
  }

  // Props => Types
  .primary {
    border-color: $primary;

    &.checked {
      background-color: $primary;
    }
  }
  .success {
    border-color: $success;

    &.checked {
      background-color: $success;
    }
  }
  .warning {
    border-color: $warning;

    &.checked {
      background-color: $warning;
    }
  }
  .danger {
    border-color: $danger;

    &.checked {
      background-color: $danger;
    }
  }
  .info {
    border-color: $info;

    &.checked {
      background-color: $info;
    }
  }
  .basic {
    border-color: $basic;

    &.checked {
      background-color: $basic;
    }
  }

  // Props => Disabled
  .disabled {
    border-color: $disabled-border;

    &.checked {
      background-color: $disabled-background;
    }

    & .form-checkbox__check {
      & svg {
        fill: $disabled-font;
      }
    }
  }
</style>
