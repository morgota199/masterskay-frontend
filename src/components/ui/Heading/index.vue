<template>
  <div>
    <div class="v-heading">
      <Button
        v-if="to"
        :to="to"
        is-icon
        icon-left="arrow-left"
        type="basic"
        size="medium"
        class="v-heading__button-back"
      />

      <div class="v-heading__title">
        <slot name="title"></slot>
      </div>

      <div v-if="label" class="v-heading__label">
        <slot name="label"></slot>
      </div>

      <div class="v-heading__buttons">
        <slot name="buttons"></slot>
      </div>
    </div>

    <div class="v-heading__tabs">
      <slot name="tabs"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Button } from '~/components/ui';

  export default Vue.extend({
    components: {
      Button,
    },

    props: {
      to: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      label(): Boolean {
        return !!this.$slots.label;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .v-heading {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .v-heading__title {
    display: block;
    color: $text-black;
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    margin-right: 15px;
    text-overflow: ellipsis;
    overflow: hidden;

    a,
    span {
      color: $blue;
    }
  }

  .v-heading__label {
    background: #f2f6fc;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #656a85;
    display: flex;
    align-items: center;
  }

  .v-heading__buttons {
    display: flex;
    margin-left: auto;

    & > *:not(:last-child) {
      margin-right: 15px;
    }
  }

  .v-heading__button-back {
    display: inline-flex;
    margin-right: 15px;
    background: #ffffff;
    border: 1px solid #dbe1e9;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(43, 56, 81, 0.04);
    border-radius: 5px;
  }

  @include media(tablet) {
    .v-heading {
      margin-bottom: 20px;
      padding-bottom: 20px;
    }

    .v-heading__title {
      margin-right: 0px;
    }
  }

  @include media(mobile) {
    .v-heading__title {
      flex-direction: column;
    }

    .v-heading__label {
      margin-left: 0px;
      margin-top: 10px;
      width: fit-content;
    }

    .v-heading__buttons::v-deep {
      .v-button.big:not(.is-icon) {
        padding: 0 9px;
        min-height: 34px;
      }

      .v-button span {
        display: none;
      }

      .v-button:not(.is-icon) .v-button__icon-left,
      .v-button:not(.is-icon) .v-button__icon-right {
        margin: 0;

        & svg {
          width: 12px !important;
          height: 12px !important;
        }
      }
    }
  }
</style>
