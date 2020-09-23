<template>
    <div>
        <h2>{{msg}}</h2>
        <Blogs></Blogs>
    </div>
</template>


<script>
import Blogs from './components/Blogs'
export default {
    data(){
        return {
            msg:'aa'
        }
    },
    components:{
        Blogs
    }
}
</script>


<style>
    
</style>