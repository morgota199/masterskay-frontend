<template>
  <div id="app">
    <no-ssr>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        :allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        :files="myFiles"
        @addfile="addFile"
      />
    </no-ssr>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import vueFilePond from "vue-filepond";
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";
  import { FilePondErrorDescription, FilePondFile } from "filepond";

  export default Vue.extend( {
      data:() => ({
         myFiles: []
      }),

      methods: {
        addFile(error: FilePondErrorDescription | null, file: FilePondFile) {
          this.$emit('addFile', { error, file })
        }
      },

      components: {
        FilePond: vueFilePond(
          FilePondPluginFileValidateType,
          FilePondPluginImagePreview
        ),
      },
    }
  )
</script>

<style lang="scss" scoped>

</style>
