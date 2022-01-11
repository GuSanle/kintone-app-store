<template>
  <ais-instant-search
    :search-client="result"
    :transform-items="transformItems"
    index-name="article_search_via_dev_center"
    :class-names="{
      'ais-InstantSearch': 'MyCustomInstantSearch',
    }"
  >
    <div style="display: block">
      <ais-search-box
        placeholder="Search for APIs..."
        :class-names="{
          'ais-SearchBox': 'MySearchBox',
          'ais-SearchBox-form': 'MySearchBoxForm',
          'ais-SearchBox-input': 'MySearchBoxInput',
          'ais-SearchBox-submit': 'MySearchBoxSubmit',
          'ais-SearchBox-submitIcon': 'MySearchBoxSubmitIcon',
          'ais-SearchBox-reset': 'MySearchBoxRest',
          'ais-SearchBox-resetIcon': 'MySearchBoxResetIcon',
          'ais-SearchBox-loadingIndicator': 'MySearchBoxLoadingIndicator',
          'ais-SearchBox-loadingIcon': 'MySearchBoxLoadingIcon',
        }"
      >
        <template v-slot:submit-icon>🔍</template>
        <template v-slot:reset-icon>✕</template>
      </ais-search-box>
      <ais-hits-per-page
        :class-names="{
          'ais-HitsPerPage': 'MyCustomHitsPerPage',
          'ais-HitsPerPage-select': 'MyCustomHitsPerPageSelect',
          'ais-HitsPerPage-option': 'MyCustomHitsPerPageOption',
        }"
        :items="[
          { label: '每页12条', value: 12, default: true },
          { label: '每页16条', value: 16 },
        ]"
      />
    </div>
    <ais-pagination
      :class-names="{
        'ais-Pagination': 'MyCustomPagination',
        'ais-Pagination-list': 'MyCustomPaginationList',
        'ais-Pagination-item': 'MyCustomPaginationItem',
        'ais-Pagination-item--selected': 'MyCustomPaginationItemSelected',
        'ais-Pagination-link': 'MyCustomPaginationLink',
      }"
    />

    <ais-hits
      :transform-items="transformItems"
      :class-names="{
        'ais-Hits': 'MyCustomHits',
        'ais-Hits-list': 'MyCustomHitsList',
        'ais-Hits-item': 'MyCustomHitsItem',
      }"
    >
      <template v-slot:item="{ item }">
        <div class="resultTitle">
          <!-- {{ item.title }} -->
          <a :href="item.url" target="_blank">
            <ais-highlight attribute="title" :hit="item" />
          </a>
        </div>
        <!-- <a :href="item.url"> <ais-highlight attribute="url" :hit="item" /></a> -->
        <div class="resultcontent">
          <ais-snippet attribute="content" :hit="item" />
        </div>
        <!-- <ul>
          <li v-for="contentele in item.content" :key="contentele">
            {{ contentele }}
          </li>
        </ul>-->
      </template>
    </ais-hits>
  </ais-instant-search>
  <div class="MySearchLogo">
    <img
      class="fxs-0 d-none sm:d-block"
      alt="Search by Algolia"
      loading="lazy"
      src="https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1631888269/Algolia_com_Website_assets/images/search/search-by-algolia.svg"
    />
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/satellite-min.css'

export default {
  name: 'Search',
  setup() {
    const result = algoliasearch("I7HSTD9JRR", "0b959a909341b04c102e5b374edfe836")
    // const index = result.initIndex('kf')
    return {
      transformItems(items) {
        return items.filter((item) => {
          return item
        })
      },
      result,
    }
  },
}
</script>
<style>
.MyCustomInstantSearch {
  width: 95%;
  margin: 0 40px 0 16px;
  padding-top: 12px;
}

.MySearchBox {
  display: inline-block;
  width: 88%;
}

.MySearchBoxForm {
  width: 98%;
  height: 60px;
}

.MySearchBoxForm::before {
  top: 30%;
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 0;
  background: url("@/assets/icons/articlesearch.svg") no-repeat center/100%;
}

.MySearchBoxInput {
  height: 100%;
  padding-left: 3.5rem;
  color: #303c50;
  font-size: 1.5em;
  background-color: #f4f3f9;
  border: 0;
  border-radius: 5px;
  box-shadow: none;
}

.MySearchBoxInput::placeholder {
  color: #8c9eba;
}

.MySearchBoxRest {
  font-size: 20px;
}

.MyCustomHitsPerPage {
  display: inline-block;
  width: 11%;
}

.MyCustomHits {
  height: calc(80vh - 194px);
  margin-top: 4px;
  padding-top: 4px;
  overflow-y: auto;
}

.MyCustomHitsList {
  display: block;
}

.MyCustomHitsItem {
  display: inline-block;
  width: 49%;
  margin-right: 0;
  margin-left: 8px;
  padding: 1.1rem;
  overflow: hidden;
  white-space: nowrap;

  /* text-overflow: ellipsis; */
}

.resultTitle {
  font-size: 1.1em;
  line-height: 200%;
}

.resultTitle a,
.resultTitle a:visited,
.resultTitle a:active {
  color: #3f516d;
}

.resultTitle a:hover {
  color: #0065ff;
}

.resultcontent {
  overflow: hidden;
  color: #8c9eba;
  font-size: 0.9em;
  overflow-wrap: break-word;
}

.MyCustomPagination {
  margin: 20px 6px 10px 0;
  text-align: right;
}

.MyCustomPaginationList {
  display: inline-block;
}

.MyCustomPaginationItem a {
  color: #50688d;
}

.MyCustomPaginationItem a:visited,
.MyCustomPaginationItem a:hover,
.MyCustomPaginationItem a:active {
  color: #0065ff;
}

.MyCustomPaginationItemSelected .MyCustomPaginationLink {
  color: #0065ff;
  background-color: #f4f3f9;
  background-image: none;
  box-shadow: none;
}

.MySearchLogo {
  width: 97%;
  margin-top: 10px;
  text-align: right;
}
</style>
