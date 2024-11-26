<template>
  <div class="todo-container">
    <input type="text" v-model="newContent">
    <button class="btn btn-green" @click="onupdateTodo">변경</button>
    <button class="btn btn-red" @click="cancelEditing">취소</button>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  props: ['selectedItem', 'cancelEditing'],
  emits:['updateTodo'],
  setup (props, {emit}) {
    const newContent = ref(props.selectedItem.content)

    function onupdateTodo(){
      if(props.selectedItem.content === ''){
        return alert('변경하실 할일을 선택해주세요.');
      }
      if(newContent.value === ''){
        return alert('값을 입력해주세요.');
      }
      if(newContent.value === props.selectedItem.content){
        return alert('이전 할일과 동일한 목록입니다!')
      }
      const updatedItem = {...props.selectedItem, content: newContent.value};
      emit('updateTodo', updatedItem)
      clearInput();
      cancelEditing();
    }

    watch(() => props.selectedItem, (newVal) => {
      newContent.value = newVal.content
    }, { immediate: true })

    function clearInput(){
      newContent.value = '';
    }
    function cancelEditing(){
      emit('cancelEditing')
    }

    return { newContent, onupdateTodo,cancelEditing  }
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

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &.btn-green{
      background: #28a745;
      color: white;
      &:hover {
        background: #218838;
      }
    }

    &.btn-red{
      background: #ff6347;
      color: white;
      &:hover{
        background: #c14934;
      }
    }

  }
}
</style>