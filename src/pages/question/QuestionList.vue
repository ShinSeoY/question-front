<script setup>
import { computed, ref } from 'vue'
import * as dayjs from 'dayjs'

const count = ref(0)
const inputValue = ref()
const now = dayjs().format('YYYY.MM.DD HH:mm:ss')

const increment = () => {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
  <input v-model="inputValue" />
  value : {{ inputValue }} <br />
  now : {{ now }} <br />
</template>
