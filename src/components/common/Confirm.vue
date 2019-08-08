<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    @keydown.esc="cancel"
    v-bind:style="{ zIndex: options.zIndex }"
  >
    <v-card>
      <v-toolbar :color="options.type" dense flat>
        <v-toolbar-title height="20" class="white--text">{{
          title
        }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message">
        <!-- <v-icon large>mdi-information</v-icon> -->
        {{ message }}</v-card-text
      >
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click.native="cancel">{{
          options.cancelBtnText
        }}</v-btn>
        <v-btn color="primary darken-1" text @click.native="agree">{{
          options.confirmBtnText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script type="text/ecmascript-6">
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      type: 'primary',
      width: 290,
      zIndex: 200,
      icon:"",
      cancelBtnText:"取消",
      confirmBtnText: "确定"
    },
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>
