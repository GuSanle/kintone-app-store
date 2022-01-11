<template>
  <ais-instant-search :search-client="result" index-name="kf5-export-test">
    <ais-search-box />
    <ais-hits>
      <template #item="{ item }">
        <!-- <h2>{{ item }}</h2> -->
        <div v-html="item.content"></div>
      </template>
    </ais-hits>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

export default {
  name: 'Search',

  setup() {
    const result = algoliasearch('Q1RWDVFXAF', 'f38926629ba4ae132a7b71d36c75872c')
    const index = result.initIndex('kf')
    return {
      result,
    }
  },
}
</script>
