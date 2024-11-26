import { onMounted, ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/storage';

function useTodo(){
  const itemList = ref([]);
  const selectedItem = ref({});

  // Computed
  const incompleteTodosCount = computed(() => itemList.value.filter(e => e.completed !== true).length);

  // Methods
  function loadTodos(){
    itemList.value = storage.getAllTodos();
  }
  function addTodo(item){
    const idx = uuidv4();
    const addTodoAbout = {
      idx: idx,
      content: item,
      completed: false,
    }
    storage.setItem(idx, addTodoAbout);
    itemList.value.push(addTodoAbout);
  }
  function deleteTodo(item, i){
    itemList.value.splice(i, 1);
    storage.removeItem(item.idx);
    cancelEditing();
  }
  function startEditing(item){
    // Object.assign(selectedItem.value, item);
    selectedItem.value = {...item};
  }
  function toggleTodo(item){
    storage.setItem(item.idx, item);
  }
  function updateTodo(item){
    const index = itemList.value.findIndex(e => e.idx === item.idx);
    if(index !== -1){
      itemList.value[index] = {...item};
      storage.setItem(item.idx, item);
    }
    
  }
  function cancelEditing(){
    selectedItem.value = '';
  }
  onMounted(() => {
    loadTodos();
  })
  return { addTodo, itemList, deleteTodo, startEditing, selectedItem, toggleTodo, updateTodo, cancelEditing, loadTodos, incompleteTodosCount }
}

export default useTodo;