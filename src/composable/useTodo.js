import { onMounted, ref } from 'vue';

function useTodo(){
  const itemList = ref([]);
  const selectedItem = ref({});
  
  function fetchList(){
    const result = [];
    for(let i=0; i<localStorage.length; i++){
      const key = localStorage.key(i);
      const todoItem = localStorage.getItem(key);
      
      try {
        const parsedItem = JSON.parse(todoItem);
        result.push(parsedItem); // 객체로 변환하여 배열에 추가
      } catch (error) {
        console.error("Invalid JSON format for key:", key, todoItem);
      }
    }
    itemList.value = result;
  }
  function newItem(item){
    const idx = crypto.randomUUID();
    const newItemAbout = {
      idx: idx,
      content: item,
      completed: false,
    }
    localStorage.setItem(idx, JSON.stringify(newItemAbout));
    itemList.value.push(newItemAbout);
  }
  function removeTodo(item, i){
    itemList.value.splice(i, 1);
    localStorage.removeItem(item.idx);
  }
  function modifyTodo(item){
    // Object.assign(selectedItem.value, item);
    selectedItem.value = {...item};
  }
  function toggleCompleted(item){
    localStorage.setItem(item.idx, JSON.stringify(item));
  }
  function changeTodo(item){
    const index = itemList.value.findIndex(e => e.idx === item.idx);
    if(index !== -1){
      itemList.value[index] = {...item};
      localStorage.setItem(item.idx, JSON.stringify(item))
    }
    
  }
  function onCancelTodo(){
    selectedItem.value = '';
  }
  onMounted(() => {
    fetchList();
  })
  return { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo, onCancelTodo }
}

export default useTodo;