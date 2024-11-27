<template>
  <div>
    <h1>Todo List</h1>
    <span>오늘의 할일 : {{ itemCount }}개 남음</span>
  </div>
</template>

<script>
export default {
  props: ["itemCount"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 30px;
  text-align: center;

  h1 {
    color: #2c3e50;
    font-size: 36px;
    margin: 0 0 15px 0;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  span {
    color: white;
    font-size: 14px;
    background: linear-gradient(45deg, #0066ff, #2684ff);
    padding: 6px 12px;
    border-radius: 20px;
    display: inline-block;
    box-shadow: 0 2px 5px rgba(0, 102, 255, 0.2);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-1px);
    }
  }
}
</style>
