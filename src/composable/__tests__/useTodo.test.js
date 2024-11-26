import { nextTick } from 'vue';
import useTodo from '../useTodo';

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};


describe('useTodo composable', () => {
  let todo;

  beforeEach(() => {
    // 초기화
    localStorage.clear();
    todo = useTodo();
  });

  test('초기 로드: loadTodos()', async () => {
    // Arrange: 로컬 스토리지에 항목 추가
    const mockItem = { idx: '1', content: 'Test Todo', completed: false };
    localStorage.setItem('1', JSON.stringify(mockItem));

    // Act: loadTodos 호출
    todo.loadTodos();

    // Assert: itemList가 로드되었는지 확인
    expect(todo.itemList.value).toEqual([mockItem]);
  });

  test('새로운 할 일 추가: addTodo()', async () => {
    // Act: 새로운 할 일을 추가
    todo.addTodo('New Todo');

    // Assert: itemList에 항목이 추가되었는지 확인
    expect(todo.itemList.value.length).toBe(1);
    expect(todo.itemList.value[0].content).toBe('New Todo');
  });

  test('할 일 삭제: deleteTodo()', () => {
    // Arrange: 초기 데이터 추가
    const mockItem = { idx: '1', content: 'Delete Me', completed: false };
    todo.itemList.value.push(mockItem);
    localStorage.setItem('1', JSON.stringify(mockItem));

    // Act: 삭제 수행
    todo.deleteTodo(mockItem, 0);

    // Assert: itemList와 localStorage에서 삭제되었는지 확인
    expect(todo.itemList.value).toEqual([]);
    expect(localStorage.getItem('1')).toBeNull();
  });

  test('할 일 완료 토글: toggleTodo()', () => {
    // Arrange: 초기 데이터 추가
    const mockItem = { idx: '1', content: 'Toggle Me', completed: false };
    todo.itemList.value.push(mockItem);
    localStorage.setItem('1', JSON.stringify(mockItem));

    // Act: 완료 상태 토글
    mockItem.completed = true;
    todo.toggleTodo(mockItem);

    // Assert: localStorage에 업데이트되었는지 확인
    const updatedItem = JSON.parse(localStorage.getItem('1'));
    expect(updatedItem.completed).toBe(true);
  });

  test('할 일 수정: updateTodo()', () => {
    // Arrange: 초기 데이터 추가
    const mockItem = { idx: '1', content: 'Old Content', completed: false };
    todo.itemList.value.push(mockItem);
    localStorage.setItem('1', JSON.stringify(mockItem));

    const updatedItem = { ...mockItem, content: 'Updated Content' };

    // Act: 수정 수행
    todo.updateTodo(updatedItem);

    // Assert: itemList와 localStorage가 업데이트되었는지 확인
    expect(todo.itemList.value[0].content).toBe('Updated Content');
    const storedItem = JSON.parse(localStorage.getItem('1'));
    expect(storedItem.content).toBe('Updated Content');
  });

  test('선택 취소: cancelEditing()', () => {
    // Arrange: 선택된 항목 추가
    const mockItem = { idx: '1', content: 'Selected', completed: false };
    todo.selectedItem.value = mockItem;

    // Act: 선택 취소
    todo.cancelEditing();

    // Assert: selectedItem이 초기화되었는지 확인
    expect(todo.selectedItem.value).toBe('');
  });
});
