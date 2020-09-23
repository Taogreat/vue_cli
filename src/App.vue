<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo"/>
      <Footer :todos="todos" :deleteCompleted="deleteCompleted" :toCheckAll="toCheckAll"/>
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header";
import List from "@/components/List";
import Footer from "@/components/Footer";
import {saveTodos,readTodos} from "@/utils/utils"
export default {
  data() {
    return {
      todos:[]
    };
  },
  mounted(){
    this.todos=readTodos()
  },
  components: {
    Header,List,Footer
  },
  methods:{
    addTodo(todo){
      this.todos.unshift(todo)
    },
    deleteTodo(index){
      this.todos.splice(index,1)
    },
    deleteCompleted(){
      this.todos=this.todos.filter((todo,index)=>!todo.completed)
    },
    toCheckAll(isCheck){
      this.todos.forEach(todo=>todo.completed=isCheck)
    }
  },
  watch:{
    todos:{
      deep:true,
      handler(value){
        saveTodos(value)
      }
    }
  }
};
</script>


<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>