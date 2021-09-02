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
      <div
        v-if="!$v.password.$error && $v.password.$dirty"
        class="security security__info"
      >
        <div class="security__text" :style="{ color: description.color }">
          {{ description.text }}
        </div>
        <div class="security__indicator">
          <div
            class="security__progress"
            :style="{ background: description.color, width: description.width }"
          ></div>
        </div>
      </div>

      <FormField
        fluid
        label="Reset code"
        class="reset_code"
        label-for="resetCode"
        :valid="!$v.resetCode.$error && $v.resetCode.$dirty"
        :invalid="$v.resetCode.$error"
      >
        <FormInput
          id="resetCode"
          v-model.trim="$v.resetCode.$model"
          fluid
          icon-left="lock-icon"
          placeholder="Insert reset code"
          :valid="!$v.resetCode.$error && $v.resetCode.$dirty"
          :invalid="$v.resetCode.$error"
        />
        <template #error>
          <div v-if="!$v.resetCode.required">Recovery code is required.</div>
          <div v-if="!$v.resetCode.numeric">Recovery code is number.</div>
          <div v-if="!$v.resetCode.maxLength">
            The recovery code cannot be longer than 4 characters.
          </div>
        </template>
      </FormField>

      <FormField
        fluid
        label="Create a password"
        label-for="password"
        :valid="!$v.password.$error && $v.password.$dirty"
        :invalid="$v.password.$error"
      >
        <FormInput
          id="password"
          v-model.trim="$v.password.$model"
          fluid
          icon-left="lock-icon"
          placeholder="Write new password"
          :valid="!$v.password.$error && $v.password.$dirty"
          :invalid="$v.password.$error"
        />
        <template #error>
          <div v-if="!$v.password.required">Password is required.</div>
          <div v-if="!$v.password.minLength">
            Password length should be at least 8 characters
          </div>
        </template>
      </FormField>

      <div class="security security__checkpoints">
        <div
          v-for="(checkpoint, index) in checkpoints"
          :key="index"
          class="security__checkpoint"
        >
          <div
            class="security__checkpoint-circle"
            :style="{ background: checkpointColor(checkpoint.check) }"
          ></div>
          <div class="security__checkpoint-text">
            {{ checkpoint.text }}
          </div>
        </div>
      </div>

      <Button fluid size="big" :type="buttonType" class="restore__submit">
        Confirm password
      </Button>
    </form>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { store } from '@/store';
  import { AuthGateway } from '@/api/auth';
  import { validationMixin } from 'vuelidate';
  import { State } from '@/store/pushNotifications';
  import { Hint, Button } from '@/components/ui';
  import { Collapse } from '@/components/ui/Transitions';
  import { FormField, FormInput } from '@/components/ui/Form';
  import {
    required,
    minLength,
    maxLength,
    numeric,
  } from 'vuelidate/lib/validators';
  import { mediumPassword, strongPassword } from '~/helpers/vuelidate';

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
      password: '',
      resetCode: '',
      checkpoints: [
        { text: 'One lowercase character', check: /[a-z]+/ },
        { text: 'One uppercase character', check: /[A-Z]+/ },
        { text: '8 characters minimum', check: /^.{8,}$/ },
        { text: 'Special character', check: /[^a-zA-Z0-9]+/ },
        { text: 'At least One digit', check: /\d+/ },
      ],
    }),

    computed: {
      notification(): State {
        return store.state.pushNotification;
      },

      buttonType(): string {
        return !this.$v.$invalid ? 'success' : 'primary';
      },

      description(): Record<string, string> {
        switch (true) {
          case strongPassword.test(this.password):
            return {
              text: 'Good',
              color: '#639A2C',
              width: '90px',
            };

          case mediumPassword.test(this.password):
            return {
              text: 'Medium',
              color: '#E07919',
              width: '60px',
            };

          default:
            return {
              text: 'Weak',
              color: '#DA3640',
              width: '30px',
            };
        }
      },
    },

    validations: {
      password: {
        required,
        minLength: minLength(8),
      },

      resetCode: {
        numeric,
        required,
        maxLength: maxLength(8),
      },
    },

    methods: {
      checkpointColor(check: RegExp) {
        return check.test(this.password) ? '#79B83A' : '#BCC4D1';
      },

      async submit() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          await this.newPassword();
        }
      },

      reset() {
        this.password = null;

        this.$v.$reset();
      },

      async newPassword() {
        try {
          store.commit.loading.setLoading(true);

          const token = this.$route.query.token as string;

          await AuthGateway.RestorePassword({
            token,
            password: this.password,
            resetCode: +this.resetCode,
          });

          this.reset();

          await this.$router.push('/sign-in');
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
  .restore__form {
    position: relative;
  }

  .restore__submit {
    margin-top: 10px;
  }

  .security__info {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0px;
    top: 0px;
  }

  .security__text {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    margin-right: 5px;
    color: #e07919;
  }

  .security__indicator {
    width: 90px;
    height: 6px;
    background: #dbe1e9;
    position: relative;
    border-radius: 100px;
  }

  .security__progress {
    position: absolute;
    border-radius: 100px 0px 0px 100px;
    width: 60px;
    height: 6px;
    top: 0px;
    left: 0px;
  }

  .security__checkpoints {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .security__checkpoint-circle {
    width: 8px;
    flex: none;
    height: 8px;
    border-radius: 50%;
    background: #bcc4d1;
    margin-right: 10px;
  }

  .reset_code {
    margin-bottom: 15px;
  }

  .security__checkpoint {
    display: flex;
    align-items: center;
    min-width: 150px;
    flex: 1;
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(2n) {
      margin-right: 0px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }
</style>
