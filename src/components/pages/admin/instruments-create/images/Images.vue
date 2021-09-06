<template>
  <div id="app">
      <FilePond
        @addFile="addFile"
      />
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import { FilePond } from "@/components/ui"
  import { FilePondErrorDescription, FilePondFile } from "filepond";

  export default Vue.extend({
    components: { FilePond },

    data: () => ({
      myFiles: []
    }),

    methods: {
      addFile({error, file}: {error: FilePondErrorDescription | null, file: FilePondFile}) {
        if(error) console.log(error)

        this.myFiles.push(file.file)
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
