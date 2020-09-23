<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completed}}</span> / 全部{{this.todos.length}}
    </span>
    <button class="btn btn-danger" @click="remove">清除已完成任务</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:['todos','deleteCompleted','toCheckAll'],
  data() {
    return {
     
    };
  },
  methods:{
    remove(){
      this.deleteCompleted()
    }
  },
  computed:{
    completed(){
      return this.todos.reduce((preTotal,todo,index)=>preTotal+(todo.completed?1:0),0)
    },
    isCheckAll:{
      get(){
        return this.completed===this.todos.length && this.completed>0
      },
      set(isCheck){
        this.toCheckAll(isCheck)
      }
      // set:this.toCheckAll
    }
  }
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>
