<template>
  <Modal :value="value" @input="close">
    <div class="category-edit">
      <div class="category-edit__header">
        <div class="header__title">
          Edit Category {{ subCategory ? subCategory.name : '' }}
        </div>
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

      <div class="category-edit__setup">
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
              :placeholder="subCategory ? subCategory.name : ''"
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
            Save
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { Modal, FormField, FormInput, Button } from '@/components/ui';
  import { ISubCategory, SubCategoryGateway } from '~/api/sub-category';
  import { validationMixin } from 'vuelidate';
  import { required } from 'vuelidate/lib/validators';
  import { store } from '@/store';

  export default Vue.extend({
    components: {
      Modal,
      FormInput,
      FormField,
      Button,
    },

    props: {
      value: {
        type: Boolean,
        required: true,
      },
      subCategory: {
        type: Object,
        default: null,
      } as PropOptions<ISubCategory.Model>,
    },

    mixins: [validationMixin],

    validations: {
      name: {
        required,
      },
    },

    data() {
      return {
        name: this.subCategory ? this.subCategory.name : '',
      };
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

          const newSubCategory = await SubCategoryGateway.UpdateOneById({
            subCategoryId: this.subCategory._id,
            params: {
              name: this.name,
            },
          });

          const categories = store.state.categories.subCategories;

          const updatedCategories = categories.map(category => {
            if (category._id === this.subCategory._id) {
              return newSubCategory;
            }

            return category;
          });

          store.commit.categories.setSubCategories(updatedCategories);

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
  .category-edit {
    display: flex;
    position: relative;
    background: #fff;
    border-radius: 5px;
    flex-direction: column;
    margin: auto;
  }

  .category-edit__header {
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

  .category-edit__setup {
    width: 600px;
    padding: 30px;
  }

  .send-form__field {
    margin-bottom: 20px;
  }

  .action {
    padding: 0 30px 34px 30px;
    display: flex;
    justify-content: flex-end;
  }

  .action__button {
    margin-left: 20px;
  }

  @include media(tablet) {
    .category-edit__setup {
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

    .delete__setup {
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
