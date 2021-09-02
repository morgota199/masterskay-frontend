<template>
  <div class="push-notification" :class="[type]">
    <div class="push-notification__container">
      <div class="push-notification__content">
        <SvgIcon
          :key="icon"
          :name="`icons/${icon}`"
          width="20"
          height="20"
          class="push-notification__icon"
        />

        <span class="push-notification__text">
          <slot></slot>
        </span>
      </div>

      <Button
        is-icon
        rounded
        size="small"
        type="white"
        icon-left="cancel"
        @click="onCancel"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { Button } from '~/components/ui';
  import { IPushNotification } from './interfaces';

  export default Vue.extend({
    components: {
      Button,
    },
    props: {
      type: {
        validator(s) {
          return ['primary', 'success', 'warning', 'danger'].includes(s);
        },
        default: 'primary',
      } as PropOptions<IPushNotification.Type>,
    },
    computed: {
      icon(): IPushNotification.Icon {
        const icons: IPushNotification.Icons = {
          primary: 'info',
          success: 'info',
          warning: 'warning',
          danger: 'warning',
        };
        return icons[this.type];
      },
    },
    methods: {
      onCancel() {
        this.$emit('cancel');
      },
    },
  });
</script>
<style lang="scss" scoped>
  .push-notification {
    padding: 12px 20px;
    border: 1px solid;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    transition: all 0.3s ease;
  }
  .push-notification__container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .push-notification__content {
    display: flex;
    align-items: center;
  }
  .push-notification__text {
    margin: 0 14px;
    width: calc(100% - 20px);
  }

  /** Props => Type */
  .primary {
    color: $primary;
    background: #fafcff;
    border: 1px solid #ddebff;

    .push-notification__icon {
      fill: $primary;
    }
  }

  .success {
    color: $success;
    background: #f9fdf8;
    border: 1px solid #e1f0da;

    .push-notification__icon {
      fill: $success;
    }
  }

  .warning {
    color: $warning;
    background: #fffbf8;
    border: 1px solid #fee9da;

    .push-notification__icon {
      fill: $warning;
    }
  }

  .danger {
    color: $danger;
    background: #fff9f9;
    border: 1px solid #f8ddde;

    .push-notification__icon {
      fill: $danger;
    }
  }
</style>
