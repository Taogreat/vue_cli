<template>
  <li @mouseenter="enter(true)" @mouseleave="enter(false)" :style="{background:bgColor}">
    <label>
      <input type="checkbox" v-model="todo.completed" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="btnShow" @click="toDelete">删除</button>
  </li>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    todo:Object,
    deleteTodo:Function,
    index:Number
  },
  data() {
    return {
      bgColor:'#fff',
      btnShow:false
    };
  },
  methods:{
    enter(isEnter){
      if(isEnter){
        this.bgColor="#ccc"
        this.btnShow=true
      }else{
        this.bgColor="#fff"
        this.btnShow=false
      }
    },
    toDelete(){
      this.deleteTodo(this.index)
    }
  }
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
