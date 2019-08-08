<template>
  <v-layout tag="section" class="panel-layout">
    <v-hover>
      <v-navigation-drawer
        flat
        class="app-drawer"
        clipped
        persistent
        v-model="drawer"
        app
        width="300"
        hide-overlay
        slot-scope="{ hover }"
        :mini-variant="mini && !hover"
        stateless
      >
        <v-img :src="image" :gradient="sidebarOverlayGradiant" height="100%">
          <!-- <v-img  height="100%" > -->
          <v-layout tag="v-list" column>
            <v-list-item avatar>
              <v-list-item-avatar
                @click="expand"
                class="drawer-avatar"
                title="点击收缩/展开"
              >
                <v-img :src="logo" height="34" contain />
              </v-list-item-avatar>
              <v-list-item-title>
                客户中心
              </v-list-item-title>
              <v-list-item-action>
                <v-btn v-if="!mini" icon @click.stop="mini = !mini">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider />

            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              :active-class="'info active-menu'"
              avatar
              class="v-list__tile"
            >
              <v-list-item-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-title v-text="link.text" />
            </v-list-item>
          </v-layout>
        </v-img>
      </v-navigation-drawer>
    </v-hover>

    <v-content class="admin-panel-content" style="padding:0px 0px 0px 0px;">
      <div style="height:100%;" v-bar>
        <div>
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
        </div>
      </div>
    </v-content>
  </v-layout>
</template>

<script type="text/ecmascript-6">

export default {
    components: {

    },
    name: "AdminPanel",
    data () {
      return {
        mini:false,
        drawer: true
      }
    },
    computed:{
      sidebarOverlayGradiant(){
        let rgba = this.$store.getters.dark?"rgba(27, 27, 27, 0.74),rgba(27, 27, 27, 0.74)":"rgba(255, 255, 255, 0.74),rgba(255, 255, 255, 0.74)";
        // return "rgba(27, 27, 27, 0.74),rgba(27, 27, 27, 0.74)";
        return rgba;
      }
    },
    props: {
      image: {
        type: String,
        default(){
          return "https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg";
        }
      },
      logo: {
        type: String,
        default(){
          return "/static/images/doc/Freeform.Office.512.png";
        }
      },
      links:{
        type:Array,
        default: function(){
            return []
        }
      }
    },
    methods:{
      expand(){
        this.mini = !this.mini
      }
    }
}
</script>

<style lang="scss">
.admin-panel-content {
  height: calc(100vh - 70px - 77px);
  // border:1px solid gray;
}
// .panel-layout{
//   height: calc(100vh - 70px - 82px);
//   border:3px solid gray;
// }

.app-drawer {
  .drawer-avatar {
    cursor: pointer;
  }
  .v-sheet--tile {
    border-radius: 4px;
  }
  .v-list__tile {
    border-radius: 4px;
    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  // .v-image__image--contain {
  //   top: 9px;
  //   height: 60%;
  // }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }

  div.v-responsive.v-image > div.v-responsive__content {
    overflow-y: auto;
  }
  .active-menu {
    color: white;
  }
}
</style>
