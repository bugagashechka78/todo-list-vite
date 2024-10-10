<template>
  <n-flex justify="space-around" size="large">
    <n-flex vertical>
      <h2>СПИСОК ДЕЛ</h2>
      <n-button size="large" @click="openNewTodoModal" style="min-width: 630px">Добавить дело</n-button>
      <n-text depth="3" v-if="!store.lengthTodos">
        Список дел пуст. Нажмите "Добавить дело" для создания нового дела.
      </n-text>
      <n-flex justify="space-between" v-for="todo in store.allTodos" :key='todo.id'>
        <n-checkbox
            size="large"
            :checked="todo.isFinished"
            style="margin-top: auto; margin-bottom: auto"
            @update:checked="handleCheckedChange(todo.id)"
        >
        </n-checkbox>
        <n-card
            v-if="!todo.isFinished"
            style="cursor: pointer; width: 95%; min-width: 600px"
            :title='todo.title'
            @click="openEditTodoModal(todo)"
        >
          {{ todo.description }}
        </n-card>
        <n-card
            v-else
            style="cursor: pointer; width: 95%; text-decoration: line-through; color: darkgray; min-width: 600px"
            :key='todo.id'
            @click="openEditTodoModal(todo)"
        >
          {{ todo.title }}
        </n-card>
      </n-flex>
    </n-flex>
  </n-flex>
  <TodoModal v-model="modalData"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {NFlex, NCard, NButton, NCheckbox, NText} from 'naive-ui'
import TodoModal from "./TodoModal.vue"
import {useTodosStore, Todo, ModalData} from "../stores/TodosStore";

const store = useTodosStore();

const modalData = ref<ModalData>(
    {
      showModal: false,
      modalTitle: "",
      isNew: true,
      todoId: 0,
      todoTitle: "",
      todoDescription: ""
    }
);

function handleCheckedChange(todoId: number) {
  store.finishTodo(todoId)
}

function openNewTodoModal() {
  modalData.value = {
    showModal: true,
    modalTitle: "Новое дело",
    isNew: true,
    todoId: Date.now(),
    todoTitle: "",
    todoDescription: ""
  };
}


function openEditTodoModal(todo: Todo) {
  modalData.value = {
    showModal: true,
    modalTitle: "Редактировать дело",
    isNew: false,
    todoId: todo.id,
    todoTitle: todo.title,
    todoDescription: todo.description
  };
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
