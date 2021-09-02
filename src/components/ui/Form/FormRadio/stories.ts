import Vue from 'vue';
import { FormField, FormRadio } from '~/components/ui/Form';

export default {
  title: 'FormRadio',
  argTypes: {
    label: {
      name: 'Label',
      control: {
        type: 'text',
      },
      defaultValue: 'Label',
    },
    infoTop: {
      name: 'Info Top',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    infoBottom: {
      name: 'Info Bottom',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    fluid: {
      name: 'Fluid',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    valid: {
      name: 'Valid',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    invalid: {
      name: 'Invalid',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean',
        defaultValue: false,
      },
    },
    infoTopContent: {
      name: 'Info Top Value',
      control: {
        type: 'text',
      },
      defaultValue: 'Top',
    },
    infoBottomContent: {
      name: 'Info Bottom Value',
      control: {
        type: 'text',
      },
      defaultValue: 'Bottom',
    },
    maxWidth: {
      control: {
        type: 'range',
        min: 250,
        max: 750,
        step: 50,
      },
      defaultValue: 500,
    },
  },
};

export const FormRadioWithFormField = (args: {}) =>
  Vue.extend({
    components: {
      FormField,
      FormRadio,
    },
    props: {
      error: Boolean,
      fluid: Boolean,
      valid: Boolean,
      invalid: Boolean,
      disabled: Boolean,
      infoTop: Boolean,
      infoBottom: Boolean,
      iconLeftClickable: Boolean,

      label: { type: String, default: '' },
      infoTopContent: { type: String, default: '' },
      infoBottomContent: { type: String, default: '' },

      type: { type: String, default: 'text' },
      placeholder: { type: String, default: '' },
      customClass: { type: String, default: '' },
      maxWidth: { type: [String, Number], default: 'initial' },
    },
    data: () => ({
      value: '',
    }),
    template: `
      <FormField
        :label="label"
        :fluid="fluid"
        :valid="valid"
        :invalid="invalid"
        label-for="input"
        :infoTop="infoTop"
        :infoBottom="infoBottom"
        :maxWidth="maxWidth + 'px'"
      >
        <template #infoTop>
          {{ infoTopContent }}
        </template>

        <template #default>
          <FormRadio
            v-model="value"
            id="input"
            :type="type"
            :fluid="true"
            :valid="valid"
            :invalid="invalid"
            :disabled="disabled"
            :maxWidth="maxWidth + 'px'"
            />
        </template>

        <template #error>
          <div>Text on error</div>
        </template>

        <template #infoBottom>
          {{ infoBottomContent }}
        </template>
      </FormField>
    `,
  });
