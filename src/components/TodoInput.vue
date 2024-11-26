<template>
  <form @submit.prevent="addItem">
    <input type="text" v-model="todoItem" placeholder="할일을 입력하세요.">
    <button type="submit">추가</button>
  </form>
  <div class="text-al-ce">
    <span class="txt-red">※ 할일을 체크할 경우 삭제할 수 있습니다.</span>
  </div>
</template>

<script>
import { ref } from 'vue'
  export default {
    emits: ['addTodo'],
    setup(_, {emit}){
      const todoItem = ref('')
      function addItem() {
        if(todoItem.value === ''){
          return alert('값을 추가해주세여');
        }
        emit('addTodo', todoItem.value);
        clearInput();
      }
      function clearInput(){
        todoItem.value = '';
      }
      return {todoItem, addItem};
    }
  }
</script>

<style lang="scss" scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

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
    background: #0066ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background: #0052cc;
    }
  }
}
span{
  display: inline-block;
  margin-left: auto; 
  margin-right: 0;
  margin-bottom: 1rem;
}
</style>