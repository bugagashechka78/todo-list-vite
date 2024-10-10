import {defineStore} from 'pinia'
import {ref, computed, watch} from "vue";

export interface Todo {
    id: number,
    title: string,
    description: string,
    isFinished: boolean
}

export interface ModalData {
    showModal: boolean;
    modalTitle: string;
    isNew: boolean;
    todoId: number;
    todoTitle: string;
    todoDescription: string;
}

export const useTodosStore = defineStore('todosStore', () => {

    const todos = ref<Todo[]>([])

    const allTodos = computed(() => todos.value)

    const lengthTodos = computed(() => todos.value.length);

    const loadTodos = () => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {
                todos.value = JSON.parse(storedTodos);
            } catch (error) {
                console.error('Ошибка при загрузке todos из localStorage:', error);
            }
        }
    };

    const findTodoIndex = (todoId: number): number => {
        return todos.value.findIndex(todo => todo.id === todoId);
    }

    const removeTodo = (todoId: number) => {
        todos.value = todos.value.filter((t) => t.id !== todoId)
    }

    const addTodo = (todoId: number, todoTitle: string, todoDescription: string) => {
        todos.value.unshift({
            id: todoId,
            title: todoTitle,
            description: todoDescription,
            isFinished: false,
        })
    }

    const editTodo = (todoId: number, todoTitle: string, todoDescription: string) => {
        const index = findTodoIndex(todoId);
        if (index !== -1) {
            todos.value[index].title = todoTitle;
            todos.value[index].description = todoDescription;
        } else {
            console.warn("Задача не найдена.");
        }
    }

    const finishTodo = (todoId: number) => {
        const index = findTodoIndex(todoId);
        if (index !== -1) {
            todos.value[index].isFinished = !todos.value[index].isFinished;
        } else {
            console.warn("Задача не найдена.");
        }
    }

    watch(todos, (newTodos) => {
        //console.log('Сохраняем todos в localStorage:', newTodos);
        try {
            localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (error) {
            console.error('Ошибка при сохранении todos в localStorage:', error);
        }
    }, {deep: true});


    loadTodos();

    return {
        todos,
        allTodos,
        lengthTodos,
        removeTodo,
        addTodo,
        editTodo,
        finishTodo
    }
})
