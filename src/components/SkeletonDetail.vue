<template>
  <el-skeleton animated>
    <template #template>
      <div class="skeleton-flex">
        <el-skeleton-item variant="image" class="skeleton-img" />
        <div style="width: 30%">
          <el-skeleton-item variant="h3" class="skeleton-app-title" />
          <br />
          <el-skeleton-item variant="p" class="skeleton-app-button" />
        </div>
      </div>
      <el-skeleton class="skeleton-text" />
    </template>
  </el-skeleton>
</template>
