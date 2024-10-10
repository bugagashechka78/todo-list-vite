<template>
  <n-message-provider>
    <TodoList/>
  </n-message-provider>
</template>

<script setup lang="ts">
import TodoList from "./components/TodoList.vue";
import {NMessageProvider} from 'naive-ui'
</script>

<style scoped>
</style>
