<template>
  <div
    :style="{
      maxHeight: viewportHeight + 'px',
      overflow: 'scroll',
      border: '1px solid red',
      width: '400px',
    }"
    v-on:scroll="throttledUpdateScrollInfo"
    ref="virtualScroller"
  >
    <div
      :style="{ height: rowHeight * amountOfRows + 'px', position: 'relative' }"
    >
      <slot
        :list="
          props.data.slice(
            context.calculatedStartIndex,
            context.calculatedEndIndex + 1
          )
        "
      >
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import useThrottle from "./useThrottle";

interface ListProps {
  rowHeight: number;
  amountOfRows: number;
  viewportHeight: number;
  data: any[];
}

const props = withDefaults(defineProps<ListProps>(), {
  rowHeight: 0,
  amountOfRows: 0,
  viewportHeight: 0,
});

const virtualScroller = ref(null);

const rowHeight = computed(() => props.rowHeight);
const amountOfRows = computed(() => props.amountOfRows);
const viewportHeight = computed(() => props.viewportHeight);

const context = ref({
  calculatedStartIndex: 0,
  calculatedEndIndex: props.viewportHeight / props.rowHeight || 0,
  scrollTop: 0,
});
const updateScrollInfo = () => {
  console.assert(virtualScroller.value !== null, "virtualScroller is null");
  // update the scrollTop

  context.value.scrollTop = virtualScroller.value?.scrollTop;

  // update the start index
  context.value.calculatedStartIndex = Math.floor(
    context.value.scrollTop / props.rowHeight
  );
  // update the end index
  context.value.calculatedEndIndex = Math.ceil(
    (context.value.scrollTop + props.viewportHeight) / props.rowHeight - 1
  );
  console.table(context.value);
};

const throttledUpdateScrollInfo = useThrottle(updateScrollInfo, 50);

watch(props, (newProps) =>
  console.log("props: ", newProps, "viewportHeight: ", viewportHeight)
);
watch(context, (context) => console.log("context", context));
</script>
