<template>
  <div class="form-field" :class="classes" :style="styles">
    <div class="form-field__head">
      <label :for="labelFor" class="form-field__label">
        {{ label }}
      </label>
      <transition name="fade-absolute">
        <span v-if="infoTop" key="info-top" class="form-field__info-top">
          <slot name="infoTop"></slot>
        </span>
      </transition>
    </div>
    <label>
      <div class="form-field__content">
        <slot></slot>
      </div>
    </label>
    <div class="form-field__bottom" :class="bottomClasses">
      <transition name="fade">
        <div v-if="invalid" key="invalid" class="form-field__invalid">
          <slot name="error"></slot>
        </div>

        <div
          v-else-if="infoBottom"
          key="info-bottom"
          class="form-field__info-bottom"
        >
          <slot name="infoBottom"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FormFieldInterface } from './interfaces';

  export default Vue.extend({
    props: {
      for: {
        type: String,
        default: '',
      },
      valid: {
        type: Boolean,
        default: false,
      },
      invalid: {
        type: Boolean,
        default: false,
      },
      label: {
        type: String,
        default: '',
      },
      labelFor: {
        type: String,
        default: '',
      },
      infoTop: {
        type: Boolean,
        default: false,
      },
      infoBottom: {
        type: Boolean,
        default: false,
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: 'auto',
      },
    },
    computed: {
      classes(): FormFieldInterface.Class.Field {
        return {
          fluid: this.fluid,
        };
      },
      styles(): FormFieldInterface.Style.Field {
        return {
          maxWidth: this.maxWidth,
        };
      },
      bottomClasses(): FormFieldInterface.Class.Bottom {
        return {
          show: this.invalid || !!this.infoBottom,
        };
      },
    },
  });
</script>

<style lang="scss" scoped>
  .form-field {
    position: relative;
    display: flex;
    flex-direction: column;

    color: $grey-light-3;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    font-family: 'Inter', sans-serif;
  }
  .form-field__head {
    display: flex;
    width: 100%;
    margin-bottom: 5px;

    justify-content: space-between;
  }
  .form-field__label {
    color: $grey-light-3;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .form-field__info-top {
    display: inline-flex;
    top: 0;
    right: 0;
    margin-left: 20px;
    flex: 1 0 auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .form-field__bottom {
    margin-top: 6px;
    height: 0;
    max-height: 0;
    transition: all 0.3s ease;

    &.show {
      height: 14px;
      max-height: 14px;
    }
  }
  .form-field__invalid {
    color: $danger;
  }
  .form-field__info-bottom,
  .form-field__invalid {
    display: block;
    margin: 0;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;

    v-deep * {
      overflow: hidden;
      text-overflow: inherit;
    }
  }

  /** Modification fade-absolute */
  .form-field {
    .fade-absolute {
      &-enter,
      &-leave-to {
        opacity: 0;
        height: 0;
        max-height: 0px;
      }

      &-enter-to,
      &-leave {
        opacity: 1;
        height: 14px;
        max-height: 14px;
      }

      &-enter-active,
      &-leave-active {
        bottom: 0;
        transition: all 0.3s ease;
      }
    }
  }
</style>
