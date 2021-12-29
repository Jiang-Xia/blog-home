<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import layout from '@/layout/index.vue'
</script>

<template>
  <!-- <router-view /> -->
  <layout/>
</template>

<style lang="scss">
$default: (
  $main-color: #ff0088
);
$green: (
  $main-color: #1cce42
);
$themes: (
  theme2-default: $default,
  theme2-green: $green
);
.aaaaaaa{
    color: #1cce42;

}
@each $theme-name, $theme-map in $themes {
  .#{$theme-name}{
    color: #1cce42;
    background: #000;
  }
}

</style>
