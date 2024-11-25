<template>
  <div class="todo-container">
    <todo-header :itemCount="todayTodo"/>
    <todo-input @newItem="newItem" />
    <todo-list :itemList="itemList" @removeTodo="removeTodo" @modifyTodo="modifyTodo"
      @toggleCompleted="toggleCompleted" />
  </div>
  <todo-modify :selectedItem="selectedItem" @changeTodo="changeTodo" />
</template>

<script>
import { computed } from 'vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue';
import TodoModify from './components/TodoModify.vue';
import useTodo from './composable/useTodo';
export default {
  components: { TodoInput, TodoList, TodoModify, TodoHeader },
  setup () {
    const { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo } = useTodo();
    const todayTodo = computed(() => itemList.value.filter(e => e.completed !== true).length);

    return { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo, todayTodo }
  }
}
</script>

<style lang="scss" scoped>
.todo-container {
 max-width: 600px;
 margin: 0 auto;
 padding: 20px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 border-radius: 8px;
 background: #fff;
}
</style>