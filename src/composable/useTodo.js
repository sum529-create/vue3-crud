import { onMounted, ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/storage';

function useTodo(){
  const itemList = ref([]);
  const selectedItem = ref({});

  // Computed
  const todayTodo = computed(() => itemList.value.filter(e => e.completed !== true).length);

  // Methods
  function fetchList(){
    itemList.value = storage.getAllTodos();
  }
  function newItem(item){
    const idx = uuidv4();
    const newItemAbout = {
      idx: idx,
      content: item,
      completed: false,
    }
    storage.setItem(idx, newItemAbout);
    itemList.value.push(newItemAbout);
  }
  function removeTodo(item, i){
    itemList.value.splice(i, 1);
    storage.removeItem(item.idx);
  }
  function modifyTodo(item){
    // Object.assign(selectedItem.value, item);
    selectedItem.value = {...item};
  }
  function toggleCompleted(item){
    storage.setItem(item.idx, item);
  }
  function changeTodo(item){
    const index = itemList.value.findIndex(e => e.idx === item.idx);
    if(index !== -1){
      itemList.value[index] = {...item};
      storage.setItem(item.idx, item);
    }
    
  }
  function onCancelTodo(){
    selectedItem.value = '';
  }
  onMounted(() => {
    fetchList();
  })
  return { newItem, itemList, removeTodo, modifyTodo, selectedItem, toggleCompleted, changeTodo, onCancelTodo, fetchList, todayTodo }
}

export default useTodo;