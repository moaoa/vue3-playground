<template>
  <div>
    <div style="background-color: purple !important">
      <h3>hi</h3>
      <List
        :data="data"
        :rowHeight="40"
        :amountOfRows="data.length"
        :viewportHeight="300"
        v-slot="props"
      >
        <div
          v-for="(item, i) in props.list"
          :style="{
            backgroundColor: 'white',
            color: 'black',
            position: 'sticky',
            top: i * 40 + 'px',
          }"
        >
          {{ item.name }}
        </div>
      </List>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import List from "./components/List.vue";
const data = ref<{ name: string; age: number }[]>([{ name: "old", age: 22 }]);

setTimeout(() => {
  let arr = Array(1_000_00).fill(0);
  arr = arr.map((_, i) => ({ name: "moaad " + i, age: i }));
  data.value = arr;
}, 3_000);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
