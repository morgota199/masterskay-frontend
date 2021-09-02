<template>
  <div
    v-click-outside="outside ? onClickOutside : () => {}"
    class="v-dropdown"
    :class="dropdownClass"
  >
    <div class="v-dropdown-activator" @click="onDropdown">
      <slot name="activator"></slot>
    </div>

    <transition name="dropdown-fade">
      <div
        v-if="value || innerValue"
        key="v-dropdown"
        class="v-dropdown-content"
        :style="contentStyle"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import vClickOutside from 'v-click-outside';
  import { DropdownInterface } from './interfaces';

  export default Vue.extend({
    directives: {
      clickOutside: vClickOutside.directive,
    },
    props: {
      value: {
        type: Boolean,
        default: null,
      },
      hover: {
        type: Boolean,
        default: false,
      },
      outside: {
        type: Boolean,
        default: false,
      },
      relative: {
        type: Boolean,
        default: true,
      },
      minWidth: {
        type: String,
        default: 'initial',
      },
      minHeight: {
        type: String,
        default: 'initial',
      },
      maxWidth: {
        type: String,
        default: 'initial',
      },
      maxHeight: {
        type: String,
        default: 'initial',
      },
    },
    data: () => ({
      innerValue: false,
    }),
    computed: {
      dropdownClass(): DropdownInterface.Class {
        return {
          relative: this.relative,
        };
      },
      contentStyle(): DropdownInterface.Style {
        return {
          minWidth: this.minWidth,
          minHeight: this.minHeight,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
        };
      },
    },
    methods: {
      onDropdown() {
        if (this.value !== null) {
          this.$emit('input', !this.value);
        } else {
          this.innerValue = !this.innerValue;
        }
      },
      onDropdownClose() {
        if (this.value !== null) {
          this.$emit('input', false);
        } else {
          this.innerValue = false;
        }
      },
      onClickOutside() {
        this.onDropdownClose();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .v-dropdown-content {
    position: absolute;
    top: calc(100% + 5px);

    display: block;
    height: auto;
    width: 100%;

    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;

    z-index: 1;
  }

  .v-dropdown-activator {
    flex: 1;
  }

  /** Props => Relative */
  .relative {
    position: relative;
  }

  /** Transition */
  .dropdown-fade {
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(20px);
    }

    &-enter-to,
    &-leave {
      opacity: 1;
      transform: translateY(0);
    }

    &-enter-active,
    &-leave-active {
      transition: opacity 0.2s ease, transform 0.4s ease;
    }
  }
</style>
