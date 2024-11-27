<template>
  <div class="todo-container">
    <todo-header :itemCount="incompleteTodosCount" />
    <todo-input @addTodo="addTodo" />
    <todo-list
      :itemList="itemList"
      @deleteTodo="deleteTodo"
      @startEditing="startEditing"
      @toggleTodo="toggleTodo"
    />
  </div>
  <todo-modify
    v-show="selectedItem.content"
    :selectedItem="selectedItem"
    @cancelEditing="cancelEditing"
    @updateTodo="updateTodo"
  />
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoModify from "./components/TodoModify.vue";
import useTodo from "./composable/useTodo";
export default {
  components: { TodoInput, TodoList, TodoModify, TodoHeader },
  setup() {
    const {
      addTodo,
      itemList,
      deleteTodo,
      startEditing,
      selectedItem,
      toggleTodo,
      updateTodo,
      incompleteTodosCount,
      cancelEditing,
    } = useTodo();

    return {
      addTodo,
      itemList,
      deleteTodo,
      startEditing,
      selectedItem,
      toggleTodo,
      updateTodo,
      incompleteTodosCount,
      cancelEditing,
    };
  },
};
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
