<template>
  <el-link :href="href" target="_blank" type="primary">{{ $t('privacy') }} ></el-link>
</template>

<script>
export default {
  name: 'License',
  inheritAttrs: false,
}
</script>
<script setup>
const href = "https://cybozudev.kf5.com/hc"
</script>
