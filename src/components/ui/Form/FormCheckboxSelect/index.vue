<template>
  <div class="form-select" :class="this.class">
    <div class="form-select__field" @click.stop="toggle">
      <FormInput
        :id="id"
        fluid
        v-model="search"
        :disabled="disabled"
        :placeholder="placeholder"
        :valid="valid"
        :invalid="invalid"
        :icon-left="icon"
      />

      <div class="form-select__control">
        <SvgIcon
          width="12"
          height="7"
          :fill="iconColor"
          name="icons/form-select-arrow"
        />
      </div>
    </div>

    <transition name="dropdown">
      <Dropdown v-model="active" max-height="166px">
        <div class="form-select__dropdown">
          <div
            v-for="(item, index) in searchItems"
            :key="index"
            class="form-select__item"
          >
            <FormCheckbox
              :value="checked.includes(item._id)"
              @input.native="selectItem(item._id)"
            />
            {{ item.name }}
          </div>
        </div>
      </Dropdown>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import vClickOutside from 'v-click-outside';
  import Dropdown from '../../Dropdown/index.vue';
  import FormInput from '../FormInput/index.vue';
  import FormCheckbox from '../FormCheckbox/index.vue';
  import { IFormCheckboxSelect } from './interfaces';

  export default Vue.extend({
    directives: {
      clickOutside: vClickOutside.directive,
    },

    components: {
      Dropdown,
      FormInput,
      FormCheckbox,
    },

    props: {
      id: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
      checked: {
        type: Array,
        default: () => [],
      } as PropOptions<string[]>,
      icon: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        default: () => [],
      } as PropOptions<IFormCheckboxSelect.Item[]>,
      disabled: {
        type: Boolean,
        default: false,
      },
      placeholder: {
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
    },

    data: () => ({
      isActive: false,
      search: '',
    }),

    computed: {
      active(): boolean {
        return this.isActive && this.isExists;
      },

      current(): string {
        return this.value ? this.value : this.placeholder;
      },

      searchItems(): IFormCheckboxSelect.Item[] {
        return this.items.filter(item => item.name.includes(this.search));
      },

      isExists(): boolean {
        return this.searchItems.length > 0;
      },

      class(): IFormCheckboxSelect.Class {
        return { disabled: this.disabled };
      },

      iconColor(): string {
        return !this.disabled ? '#B6BED0' : '#DCE1EA';
      },
    },

    methods: {
      toggle() {
        this.isActive = !this.isActive;
      },

      close() {
        this.isActive = false;
      },

      selectItem(id: string) {
        this.$emit('input', id);
      },
    },
  });
</script>

<style lang="scss" scoped>
  .form-select {
    position: relative;
    display: block;
    width: 100%;
    box-sizing: border-box;

    &:hover {
      cursor: pointer;
    }
  }
  .form-select__field {
    display: flex;
    width: 100%;
    align-items: flex-start;
    transition: color 0.3s ease, border-color 0.3s ease,
      background-color 0.3s ease-in-out;
  }

  .form-select__control {
    position: absolute;
    display: inline-flex;
    top: 24px;
    right: 20px;
    transform: translateY(-50%);
  }

  /** Dropdown */
  .form-select__dropdown {
    display: flex;
    flex-flow: row wrap;

    height: auto;
    width: 100%;

    background: $white;
    border-radius: 5px;
    border: 1px solid #edf2fa;

    box-sizing: border-box;
  }

  .form-select__item {
    display: block;
    width: 100%;
    padding: 12px;

    color: $text-black;
    font-size: 14px;
    line-height: 17px;
    font-style: normal;
    font-weight: normal;

    text-overflow: ellipsis;
    overflow: hidden;

    transition: color 0.3s ease, background 0.3s ease;

    &.active {
      color: $blue;
    }

    &:hover {
      background: #fafcff;
    }
  }
</style>
