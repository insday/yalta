<template>
  <svg class="icon" :class="className" :width="width" :height="height">
    <use :xlink:href="glyph" />
  </svg>
</template>

<script>
export default {
  name: 'icon',
  props: ['className', 'glyph', 'width', 'height'],
};
</script>

<style>
.icon {
  display: inline-block;
}
</style>
