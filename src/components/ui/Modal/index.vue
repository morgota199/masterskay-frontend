<template>
  <transition name="fade">
    <div v-if="value" key="v-modal" class="v-modal" :style="modalStyle">
      <div
        class="v-modal__overlay"
        :style="overlayStyle"
        @click.esc="trigger"
      ></div>
      <div class="v-modal__frame" :style="frameStyle">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ModalInterface } from './interfaces';

  export default Vue.extend({
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      fluid: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: 'initial',
      },
      maxHeight: {
        type: String,
        default: 'initial',
      },
      zIndex: {
        type: Number,
        default: 5,
      },
    },
    computed: {
      modalStyle(): ModalInterface.Style.Modal {
        return { zIndex: this.zIndex };
      },

      overlayStyle(): ModalInterface.Style.Overlay {
        const zIndex = this.zIndex - 1;

        return { zIndex };
      },

      frameStyle(): ModalInterface.Style.Frame {
        const width = this.fluid ? '100%' : 'initial';

        return {
          width,
          maxWidth: this.maxWidth,
          maxHeight: this.maxHeight,
          zIndex: this.zIndex,
        };
      },
    },
    methods: {
      trigger() {
        const value = !this.value;

        this.$emit('input', value);

        if (!value) this.$emit('close');
      },
    },
  });
</script>

<style lang="scss" scoped>
  .v-modal {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .v-modal__overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(34, 49, 80, 0.6);

    &:hover {
      cursor: pointer;
    }
  }

  .v-modal__frame {
    display: flex;
    margin: auto;
  }
</style>
