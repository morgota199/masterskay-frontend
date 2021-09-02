<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="v-button"
    :class="classes"
    :style="styles"
    v-on="{ ...$listeners, click: e => buttonClick(e) }"
  >
    <SvgIcon
      v-if="iconLeft"
      :key="iconLeft"
      :name="`icons/${iconLeft}`"
      fill="currentColor"
      :width="iconSizes[size]"
      :height="iconSizes[size]"
      class="v-button__icon-left"
    />

    <span v-if="!isIcon">
      <slot></slot>
    </span>

    <SvgIcon
      v-if="iconRight"
      :key="iconRight"
      :name="`icons/${iconRight}`"
      fill="currentColor"
      :width="iconSizes[size]"
      :height="iconSizes[size]"
      class="v-button__icon-right"
    />
  </component>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { ButtonInterface } from './interfaces';

  export default Vue.extend({
    props: {
      type: {
        type: String,
        required: false,

        default: 'primary',

        validator(s) {
          return [
            'primary',
            'success',
            'warning',
            'danger',
            'info',
            'basic',
            'white',
            'transparent',
          ].includes(s);
        },
      } as PropOptions<ButtonInterface.Props.Type>,
      size: {
        type: String,
        default: 'medium',
        validator(s) {
          return ['big', 'medium', 'small'].includes(s);
        },
      } as PropOptions<ButtonInterface.Props.Size>,
      to: { default: '', type: [String, Object] },
      tag: { type: String, default: 'button' },
      fluid: { type: Boolean, default: false },
      minHeight: { type: String, default: null },
      maxWidth: { type: String, default: null },
      rounded: { type: Boolean, default: false },
      noBorder: { type: Boolean, default: false },
      isIcon: { type: Boolean, default: false },
      iconLeft: { type: String, default: '' },
      iconRight: { type: String, default: '' },
    },

    data: () => ({
      iconSizes: {
        big: '14',
        medium: '14',
        small: '12',
      },
    }),

    computed: {
      classes(): ButtonInterface.Class {
        return [
          this.size,
          this.type,
          {
            'is-icon': this.isIcon,
            'no-border': this.noBorder,
            rounded: this.rounded,
            fluid: this.fluid,
          },
        ];
      },
      styles(): ButtonInterface.Style {
        const styles = {} as ButtonInterface.Style;

        if (this.minHeight) styles.minHeight = this.minHeight;
        if (this.maxWidth) styles.maxWidth = this.maxWidth;

        return styles;
      },
    },

    methods: {
      buttonClick(e: Event) {
        this.$emit('click', e);

        if (this.to) {
          this.$router.push(this.to);
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .v-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 4px;
    outline: none;
    transition: color 0.3s ease, border-color 0.3s ease,
      background-color 0.3s ease;

    color: #fff;
    font-weight: 500;

    & svg {
      overflow: initial;
    }

    &:not(.is-icon) {
      .v-button__icon-left {
        margin-right: 12px;
      }
      .v-button__icon-right {
        margin-left: 12px;
      }
    }

    /** Props => Disabled */
    &:disabled {
      pointer-events: none;
      color: #8287a6;
      border-color: #f7f8fa;
      background-color: #f7f8fa;
    }
  }

  .is-icon.rounded {
    border-radius: 50%;
  }

  // Props => Size
  .big {
    font-size: 14px;
    line-height: 18px;

    &:not(.is-icon) {
      min-height: 41px;
      padding: 0 24px;
    }
    &.is-icon {
      width: 42px;
      height: 42px;
    }
  }

  .medium {
    font-size: 14px;
    line-height: 16px;

    &:not(.is-icon) {
      min-height: 33px;
      padding: 0 16px;
    }
    &.is-icon {
      width: 34px;
      height: 34px;
    }
  }

  .small {
    font-size: 12px;
    line-height: 14px;

    &:not(.is-icon) {
      min-height: 26px;
      padding: 0 12px;
    }
    &.is-icon {
      width: 26px;
      height: 26px;
      min-height: 20px;
    }
  }

  // Props => Type
  .primary {
    color: $white;
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

  .success {
    color: $white;
    border-color: $success;
    background-color: $success;

    &:hover {
      border-color: $success-hover;
      background-color: $success-hover;
    }
    &:active {
      border-color: $success-active;
      background-color: $success-active;
    }
  }

  .warning {
    color: $white;
    border-color: $warning;
    background-color: $warning;

    &:hover {
      border-color: $warning-hover;
      background-color: $warning-hover;
    }
    &:active {
      border-color: $warning-active;
      background-color: $warning-active;
    }
  }

  .danger {
    color: $white;
    border-color: $danger;
    background-color: $danger;

    &:hover {
      border-color: $danger-hover;
      background-color: $danger-hover;
    }
    &:active {
      border-color: $danger-active;
      background-color: $danger-active;
    }
  }

  .info {
    color: $white;
    border-color: $info;
    background-color: $info;

    &:hover {
      border-color: $info-hover;
      background-color: $info-hover;
    }
    &:active {
      border-color: $info-active;
      background-color: $info-active;
    }
  }

  .basic {
    color: $text-black;
    border-color: $basic;
    background-color: $basic;
  }

  .white {
    color: $text-black;
    border-color: #dce1ea;
    background-color: #fff;

    &:hover {
      color: $text-black;
      background-color: #fafcff;
    }
    &:active {
      color: $text-black;
      background-color: #f2f6fc;
    }
  }

  .transparent {
    color: #656a85;
    border-color: transparent;
    background-color: transparent;

    &:hover {
      color: #8287a6;
      background-color: #edf2fa;
    }

    &:active {
      color: $blue;
      background-color: #edf2fa;
    }
  }
</style>
