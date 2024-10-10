<template>
  <n-modal
      style="width: 600px"
      v-model:show="modalData.showModal"
      preset="dialog"
      v-model:title="modalData.modalTitle"
      positive-text="Сохранить"
      negative-text="Удалить дело"
      @positive-click="saveClick(modalData.todoId, modalData.todoTitle, modalData.todoDescription, modalData.isNew)"
      @negative-click="removeClick(modalData.todoId, modalData.isNew)"
  >
    <n-alert v-if="showAlert" title="Пустое дело" type="warning" closable>
      Заполните название дела
    </n-alert>
    <n-card
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-flex vertical>
        <n-input v-model:value="modalData.todoTitle" type="text" placeholder="Дело"/>
        <n-input
            v-model:value="modalData.todoDescription"
            type="textarea"
            placeholder="Как делать"
        />
      </n-flex>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import {ref, defineModel} from 'vue';
import {NFlex, NCard, NModal, NInput, NAlert, useMessage} from 'naive-ui'
import {useTodosStore, ModalData} from "../stores/TodosStore";

const store = useTodosStore()

const modalData = defineModel<ModalData>();

const showAlert = ref(false);
const message = useMessage()


function saveClick(todoId: number, valueTitle: string, valueDescription: string, isNew: boolean) {
  if (valueTitle === "" && valueDescription === "") {
    message.warning('Нельзя создать пустое дело')
  } else {
    if (isNew) {
      store.addTodo(todoId, valueTitle, valueDescription);
    } else {
      store.editTodo(todoId, valueTitle, valueDescription);
    }
  }
}

function removeClick(todoId: number, isNew: boolean) {
  if (!isNew) {
    store.removeTodo(todoId);
  } else {
    message.warning('Нельзя удалить несуществующее дело')
  }
}


</script>

<style scoped>

</style>