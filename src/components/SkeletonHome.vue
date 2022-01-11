<template>
  <el-skeleton animated>
    <template #template>
      <el-skeleton :rows="2" class="skeleton-text" />
      <div class="skeleton-flex">
        <div v-for="n in 2" :key="n" class="skeleton-flex" style="width: 50%">
          <el-skeleton-item variant="image" class="skeleton-img" />
          <div style="width: 70%">
            <el-skeleton-item variant="h3" class="skeleton-app-title" />
            <br />
            <el-skeleton-item variant="p" class="skeleton-app-button" />
          </div>
        </div>
      </div>
      <el-skeleton :rows="2" class="skeleton-text" />
    </template>
  </el-skeleton>
</template>
