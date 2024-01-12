<template>
  <div>
    <CommonHeader></CommonHeader>
    <router-view></router-view>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader.vue'
import CommonFooter from './CommonFooter.vue'

export default {
  components: {
    CommonHeader,
    CommonFooter
  }
}
</script>
