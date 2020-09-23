<template>
  <ul class="todo-main">
    <Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo" :deleteTodo="deleteTodo" :index="index"/>
  </ul>
</template>

<script type="text/ecmascript-6">
import Item from '@/components/Item';
export default {
  props:{
    todos:Array,
    deleteTodo:Function,
  },
  data() {
    return {
     
    };
  },
  components:{
    Item
  }
};
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
