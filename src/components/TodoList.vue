<template>
  <ul>
    <li v-for="(item, i) in itemList" :key="i">
      <input
        type="checkbox"
        v-model="item.completed"
        @change="toggleTodo(item)"
      />
      <span
        @click="startEditing(item, i)"
        :class="{ completed: item.completed }"
        >{{ item.content }}</span
      >
      <button v-show="item.completed" @click="deleteTodo(item, i)">삭제</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      requied: true,
    },
  },
  emits: ["deleteTodo", "startEditing", "toggleTodo"],
  setup(_, { emit }) {
    function deleteTodo(item, i) {
      emit("deleteTodo", item, i);
    }
    function startEditing(item) {
      emit("startEditing", item);
    }
    function toggleTodo(item) {
      emit("toggleTodo", item);
    }

    return { deleteTodo, startEditing, toggleTodo };
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid #eee;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    span {
      flex: 1;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;

      &:hover {
        background: #f5f5f5;
      }

      &.completed {
        text-decoration: line-through;
        color: #999;
      }
    }

    button {
      padding: 6px 12px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #cc0000;
      }
    }
  }
}
</style>
