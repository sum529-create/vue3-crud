<template>
  <div class="todo-container">
    <input type="text" v-model="newContent">
    <button @click="onChangeTodo">변경</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: ['selectedItem'],
  setup (props, {emit}) {
    const newContent = ref(props.selectedItem.content)

    function onChangeTodo(){
      const updatedItem = {...props.selectedItem, content: newContent.value};
      emit('changeTodo', updatedItem)
      clearInput();
    }
    watch(() => props.selectedItem, (newVal) => {
      newContent.value = newVal.content
    }, { immediate: true })
    function clearInput(){
      newContent.value = '';
    }

    return { newContent, onChangeTodo }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #0066ff;
    }
  }

  button {
    padding: 8px 16px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background: #218838;
    }
  }
}
</style>