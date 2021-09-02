<template>
  <Collapse>
    <div v-if="notification" class="collapse">
      <div key="notification" class="notify">
        <div class="notify__frame">
          <div class="notify__icon">
            <SvgIcon name="icons/stop" width="20" height="20" />
          </div>
          <div class="notify__text">
            {{ notification }}
          </div>
        </div>
      </div>
    </div>
  </Collapse>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '@/store';
  import { Collapse } from '@/components/ui/Transitions';

  export default Vue.extend({
    components: {
      Collapse,
    },

    computed: {
      notification() {
        return store.state.auth.notification;
      },
    },
  });
</script>

<style lang="scss" scoped>
  .notify {
    display: block;
    padding-bottom: 14px;
  }

  .notify__frame {
    display: flex;
    width: 100%;
    padding: 16px;
    border-radius: 4px;
    background: #fff9f9;
    border: 1px solid #f8ddde;
    transition: all 0.3s ease, padding 0s;
    align-items: center;
  }

  .notify__icon {
    fill: $danger;
  }

  .notify__text {
    margin-left: 14px;
    color: $danger;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
</style>
