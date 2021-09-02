<template>
  <form class="form" @submit.prevent="submit">
    <div class="form__row">
      <FormField
        label="Email address"
        label-for="email"
        fluid
        :invalid="$v.email.$error"
      >
        <template #default>
          <FormInput
            id="email"
            v-model="$v.email.$model"
            placeholder="Your email address"
            icon-left="email"
            fluid
            :valid="$v.email.$dirty && !$v.email.$error"
            :invalid="$v.email.$error"
            :tabindex="1"
          />
        </template>

        <template #error>
          <div v-if="!$v.email.required" key="email-required">
            Email address is required
          </div>
          <div v-if="!$v.email.email" key="email-email">
            Please enter valid email address
          </div>
        </template>
      </FormField>
    </div>

    <div class="form__row">
      <FormField
        info-top
        label="Password"
        label-for="password"
        fluid
        :autocomplete="true"
        :invalid="$v.password.$error"
      >
        <template #default>
          <FormInput
            id="password"
            v-model="$v.password.$model"
            fluid
            type="password"
            :tabindex="2"
            placeholder="Write your password"
            icon-left="lock-icon"
            :invalid="$v.password.$error"
            :valid="$v.password.$dirty && !$v.password.$error"
          />
        </template>

        <template #error>
          <div v-if="!$v.password.required" key="password-required">
            Password is required
          </div>
          <div v-if="!$v.password.minLength" key="password-minLength">
            Password length should be at least 8 characters
          </div>
        </template>
      </FormField>
    </div>

    <div class="form__row">
      <FormField
        info-top
        label="Confirm password"
        label-for="confirmPassword"
        fluid
        :autocomplete="true"
        :invalid="$v.confirmPassword.$error"
      >
        <template #default>
          <FormInput
            id="confirmPassword"
            v-model="$v.confirmPassword.$model"
            fluid
            type="password"
            :tabindex="3"
            placeholder="Write your confirm password"
            icon-left="lock-icon"
            :invalid="$v.confirmPassword.$error"
            :valid="$v.confirmPassword.$dirty && !$v.confirmPassword.$error"
          />
        </template>

        <template #error>
          <div v-if="!$v.confirmPassword.required" key="password-required">
            Password is required
          </div>
          <div v-if="!$v.confirmPassword.minLength" key="password-minLength">
            Password length should be at least 8 characters
          </div>
        </template>
      </FormField>
    </div>

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
        Start
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FormField, FormInput, Button } from '@/components/ui';
  import { validationMixin } from 'vuelidate';
  import { required, minLength, email } from 'vuelidate/lib/validators';
  import { store } from '@/store';

  export default Vue.extend({
    components: {
      Button,
      FormInput,
      FormField,
    },

    computed: {
      matchingPasswords(): boolean {
        return this.password === this.confirmPassword;
      },

      buttonType(): string {
        return !this.$v.$invalid && this.matchingPasswords
          ? 'success'
          : 'primary';
      },
    },

    data: () => ({
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        userNotFound: 'User does not exist',
        wrongCredentials: 'Username and password combination not found',
      },
    }),

    mixins: [validationMixin],

    validations: {
      email: {
        email,
        required,
      },

      password: {
        required,
        minLength: minLength(8),
      },

      confirmPassword: {
        required,
        minLength: minLength(8),
      },
    },

    methods: {
      async cancel(event: Event) {
        event.preventDefault();

        await this.$router.push('main');
      },

      async submit() {
        this.$v.$touch();

        if (!this.$v.$invalid && this.matchingPasswords) {
          try {
            store.commit.loading.setLoading(true);

            await store.dispatch.auth.signUp({
              email: this.email,
              password: this.password,
            });

            await this.$router.push('main');
          } catch (error) {
            console.log(error);
          } finally {
            store.commit.loading.setLoading(false);
          }
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .form {
    display: inline-flex;
    width: 100%;
    flex-direction: column;
    min-width: 320px;
  }

  .form__row + .form__row {
    margin-top: 20px;
  }

  .form__button {
    margin-top: 20px;
  }

  .forgot-password {
    background: #f1f4fa;
    margin-top: 10px;
    padding: 8.1px;
    width: 100%;
    color: #8a91a4;
    font-size: 13.5px;
    line-height: 17px;
    font-weight: 500;
    text-align: center;
  }

  .action {
    display: flex;
    margin-top: 15px;
  }

  .form__button {
    margin: 5px;
  }
</style>
