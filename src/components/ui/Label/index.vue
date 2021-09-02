<template>
  <div
    class="label"
    :class="classes"
    :style="styles"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { LabelInterface } from './interfaces';

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
            'white',
          ].includes(s);
        },
        default: 'primary',
      } as PropOptions<LabelInterface.Type>,
      size: {
        validator(s) {
          return ['big', 'medium', 'small'].includes(s);
        },
        default: 'medium',
      } as PropOptions<LabelInterface.Size>,
      fluid: { type: Boolean, default: false },
      rounded: { type: Boolean, default: false },
      maxWidth: { type: String, default: 'auto' },
    },
    computed: {
      classes(): LabelInterface.Class {
        return [
          this.type,
          this.size,
          { rounded: this.rounded, fluid: this.fluid },
        ];
      },
      styles(): LabelInterface.Style {
        return {
          maxWidth: this.maxWidth,
        };
      },
    },
  });
</script>

<style lang="scss" scoped>
  .label {
    display: inline-flex;
    font-weight: 600;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease, background-color 0.3s ease;

    &.rounded {
      border-radius: 50%;
    }
  }

  // Props => Size
  .big {
    font-size: 14px;
    line-height: 24px;

    &:not(.rounded) {
      min-height: 41px;
      padding: 0 24px;
    }
    &.rounded {
      width: 42px;
      height: 42px;
    }
  }

  .medium {
    font-size: 14px;
    line-height: 21px;

    &:not(.rounded) {
      min-height: 33px;
      padding: 0 16px;
    }
    &.rounded {
      width: 34px;
      height: 34px;
    }
  }

  .small {
    font-size: 12px;
    line-height: 18px;

    &:not(.rounded) {
      min-height: 26px;
      padding: 0 12px;
    }
    &.rounded {
      width: 26px;
      height: 26px;
      min-height: 20px;
    }
  }

  // Props => Type
  .primary {
    color: $primary;
    background-color: #e8f1ff;
    &:hover {
      background-color: rgba(#e8f1ff, 0.8);
    }
  }
  .success {
    color: $success;
    background-color: #e8f7e7;
    &:hover {
      background-color: rgba(#e8f7e7, 0.8);
    }
  }
  .danger {
    color: $danger;
    background-color: #ffe9ea;
    &:hover {
      background-color: rgba(#ffe9ea, 0.8);
    }
  }
  .warning {
    color: $warning;
    background-color: #fff4ea;
    &:hover {
      background-color: rgba(#fff4ea, 0.8);
    }
  }
  .info {
    color: $info;
    background-color: #edf2fa;
    &:hover {
      background-color: rgba(#edf2fa, 0.8);
    }
  }
  .white {
    color: #656a85;
    border: 1px solid #edf2fa;
    background-color: $white;

    &:hover {
      background-color: #dce1ea;
    }
  }
</style>
