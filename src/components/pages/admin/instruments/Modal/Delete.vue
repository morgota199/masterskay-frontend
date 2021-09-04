<template>
  <Modal :value="value" @input="close">
    <div class="delete">
      <div class="delete__header">
        <div class="header__title">Delete Instrument</div>
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

      <div class="setup">
        <span> Are you sure you want to delete the instrument? </span>
      </div>

      <div class="action">
        <Button class="action__button" type="white" @click="close">
          Cancel
        </Button>
        <Button class="action__button" type="danger" @click="deleteInstrument">
          Delete
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { Modal, Button } from '@/components/ui';
  import { store } from '~/store';
  import { IInstruments, InstrumentsGateway } from '~/api';

  export default Vue.extend({
    components: {
      Modal,
      Button,
    },

    props: {
      value: {
        type: Boolean,
        required: true,
      },
      instrument: {
        type: Object,
        default: null,
      } as PropOptions<IInstruments.Model>,
    },

    computed: {
      instruments(): IInstruments.Join[] {
        return store.state.instruments.instruments;
      },
    },

    methods: {
      close() {
        this.$emit('cancel');
      },

      async deleteInstrument() {
        try {
          store.commit.loading.setLoading(true);

          await InstrumentsGateway.Delete({
            instrumentId: this.instrument._id,
          });

          const filteredInstruments = this.instruments.filter(
            ({ _id }) => _id !== this.instrument._id,
          );

          store.commit.instruments.setInstruments(filteredInstruments);

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
  .delete {
    display: flex;
    position: relative;
    background: #fff;
    border-radius: 5px;
    flex-direction: column;
    margin: auto;
  }

  .delete__header {
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

  .setup {
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
    .delete__setup {
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
