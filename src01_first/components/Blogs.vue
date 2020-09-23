<template>
  <div>
    <h2>博客</h2>
    <ul>
      <Blog v-for="blog in blogs" :key="blog.id" :blog="blog"></Blog>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Blog from "./Blog";
export default {
  data() {
    return {
      blogs: [
        { id: 1, title: "博客标题11111" },
        { id: 3, title: "博客标题222222" },
        { id: 15, title: "博客标题3333" },
      ],
    };
  },
  components: {
    Blog,
  },
};
</script>

<style scoped>
  h2 {
    color: red;
  }
</style>
