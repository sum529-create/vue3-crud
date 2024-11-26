<template>
  <div class="todo-container">
    <todo-header :itemCount="todayTodo"/>
    <todo-input @newItem="newItem" />
    <todo-list :itemList="itemList" @removeTodo="removeTodo" @modifyTodo="modifyTodo"
      @toggleCompleted="toggleCompleted" />
  </div>
  <todo-modify v-show="selectedItem.content" :selectedItem="selectedItem" @onCancelTodo="onCancelTodo" @changeTodo="changeTodo" />
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue';
import TodoModify from './components/TodoModify.vue';
import useTodo from './composable/useTodo';
export default {
  components: { TodoInput, TodoList, TodoModify, TodoHeader },
  setup () {
    const { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo, todayTodo, onCancelTodo } = useTodo();

    return { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo, todayTodo, onCancelTodo }
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