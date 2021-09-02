<template>
  <Modal :value="value" @input="close">
    <div class="category-add">
      <div class="category-add__header">
        <div class="header__title">Create Category</div>
        <div class="header__close">
          <SvgIcon
            name="close"
            width="20px"
            height="20px"
            fill="#DBE1E9"
            @click="close"
          />
        </div>
      </div>

      <div class="category-add__setup">
        <form class="send-form" @submit.prevent="submit">
          <FormField
            fluid
            label="Category name"
            label-for="name"
            class="send-form__field"
            :invalid="$v.name.$error"
            :valid="!$v.name.$error && $v.name.$dirty"
          >
            <FormInput
              id="name"
              v-model.trim="$v.name.$model"
              fluid
              :invalid="$v.name.$error"
              :valid="!$v.name.$error && $v.name.$dirty"
            />
            <template #error>
              <div v-if="!$v.name.required">Categoty name is required</div>
            </template>
          </FormField>
        </form>

        <div class="action">
          <Button size="big" type="white" class="action__button" @click="close">
            Cancel
          </Button>
          <Button size="big" class="action__button" @click="submit">
            Careate Category
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Modal, FormField, FormInput, Button } from '@/components/ui';
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { store } from '~/store';
  import { CategoryGateway, ICategory } from '~/api/category';

  export default Vue.extend({
    components: {
      Modal,
      Button,
      FormInput,
      FormField,
    },

    mixins: [validationMixin],

    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },

    validations: {
      name: {
        required,
      },
    },

    data: () => ({
      name: '',
    }),

    computed: {
      categories(): ICategory.Model[] {
        return store.state.categories.categories;
      },
    },

    methods: {
      close() {
        this.$emit('cancel');

        this.resetData();
      },

      resetData() {
        this.name = '';

        this.$v.$reset();
      },

      async submit() {
        try {
          store.commit.loading.setLoading(true);

          const newCategory = await CategoryGateway.Create({ name: this.name });

          store.commit.categories.setCategories([
            ...this.categories,
            newCategory,
          ]);

          this.close();
        } catch (error) {
          console.log(error);
        } finally {
          store.commit.loading.setLoading(false);
        }
      },
    },
  });
</script>

<style lang="scss" scoped>
  .category-add {
    display: flex;
    position: relative;
    background: #fff;
    border-radius: 5px;
    flex-direction: column;
    margin: auto;
  }

  .category-add__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 34px 30px 34px 30px;
    border-bottom: 1px solid #dce1ea;
  }

  .header__title {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
    color: #303744;
  }

  .header__close {
    display: flex;
    align-items: center;
  }

  .header__close svg {
    fill: #8a91a4;
  }

  .category-add__setup {
    width: 600px;
    padding: 30px;
  }

  .send-form__field {
    margin-bottom: 20px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }

  .action__button {
    margin-left: 20px;
  }

  @include media(tablet) {
    .category-add__setup {
      width: 450px;
      height: 500px;
      overflow-y: scroll;
    }

    .action {
      flex-wrap: wrap;
    }
  }

  @include media(mobile) {
    .header__close svg {
      right: -40px;
    }

    .category-add__setup {
      width: 300px;
      height: 400px;
    }

    .send-form {
      padding: 0px 20px;
    }

    .action {
      padding: 0px 20px 20px;
    }

    .action__button {
      margin-left: auto;
    }
  }
</style>
