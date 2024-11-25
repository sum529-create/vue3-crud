<template>
  <ul>
    <li v-for="(item, i) in itemList" :key="i">
      <input type="checkbox" v-model="item.completed" @change="toggleCompleted(item)">
      <span @click="modifyTodo(item, i)" :class="{'completed': item.completed}">{{ item.content }}</span>
      <button v-show="item.completed" @click="removeTodo(item, i)">삭제</button>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    itemList:{
      type: Array,
      requied: true
    }
  },
  setup (_, {emit}) {
    function removeTodo(item, i){
      emit('removeTodo', item, i);
    }
    function modifyTodo(item){
      const sendItem = {...item}
      emit('modifyTodo', sendItem);
    }
    function toggleCompleted(item){
      emit('toggleCompleted', item);
    }

    return { removeTodo, modifyTodo, toggleCompleted }
  }
}
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