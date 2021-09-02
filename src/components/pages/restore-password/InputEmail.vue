<template>
  <div class="restore__step">
    <Collapse>
      <div v-if="notification.visible" key="notifications">
        <Hint
          :type="notification.notification.type"
          :text="notification.notification.text"
          class="restore__notifications"
        />
      </div>
    </Collapse>

    <form class="restore__form" @submit.prevent="submit">
      <FormField
        fluid
        label="Email"
        label-for="email"
        :valid="!$v.email.$error && $v.email.$dirty"
        :invalid="$v.email.$error"
      >
        <FormInput
          id="email"
          v-model.trim="$v.email.$model"
          fluid
          icon-left="email"
          placeholder="Write your Email"
          :valid="!$v.email.$error && $v.email.$dirty"
          :invalid="$v.email.$error"
        />
        <template #error>
          <div v-if="!$v.email.required">Email is required.</div>
          <div v-else-if="!$v.email.email">
            Write email in correct format: email@domain.com
          </div>
        </template>
      </FormField>

      <div class="action">
        <Button
          fluid
          size="big"
          type="basic"
          class="form__button"
          @click="cancel"
        >
          Cancel
        </Button>

        <Button fluid size="big" :type="buttonType" class="form__button">
          Log in
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '@/store';
  import { AuthGateway } from '@/api/auth';
  import { validationMixin } from 'vuelidate';
  import { email, required } from 'vuelidate/lib/validators';
  import { State } from '@/store/pushNotifications';
  import { Hint, Button } from '~/components/ui';
  import { Collapse } from '~/components/ui/Transitions';
  import { FormField, FormInput } from '~/components/ui/Form';

  export default Vue.extend({
    components: {
      Hint,
      Button,
      Collapse,
      FormField,
      FormInput,
    },

    mixins: [validationMixin],

    data: () => ({
      email: null,
    }),

    computed: {
      notification(): State {
        return store.state.pushNotification;
      },

      buttonType(): string {
        return !this.$v.$invalid ? 'success' : 'primary';
      },
    },

    validations: {
      email: {
        email,
        required,
      },
    },

    methods: {
      async cancel(event: Event) {
        event.preventDefault();

        await this.$router.push('/sign-in');
      },

      async submit() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          await this.inputEmail();
        }
      },

      reset() {
        this.email = null;

        this.$v.$reset();
      },

      async inputEmail() {
        try {
          store.commit.loading.setLoading(true);

          const { token } = await AuthGateway.LinkRestorePassword({
            email: this.email,
          });

          await this.$router.push({
            path: 'reset-password',
            query: { token },
          });

          this.reset();
        } catch (e) {
          console.error(e);
        } finally {
          store.commit.loading.setLoading(false);
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .action {
    display: flex;
    margin-top: 15px;
  }

  .form__button {
    margin: 5px;
  }
</style>
