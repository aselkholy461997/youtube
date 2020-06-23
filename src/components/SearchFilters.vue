<template>
  <div class="search-filters">
    <div>
      <select name="typeFilter">
        <option @click="selectTypeFilter(-1)" :value="types[0]" selected>All</option>
        <option
          v-for="(type, index) in types.slice(2)"
          :key="'type' + index"
          @click="selectTypeFilter(index)"
          :value="type"
        >
          {{ type }}
        </option>
      </select>
      <select name="uploadDateFilter">
        <option @click="selectUploadDateFilter(-1)" :value="uploadDates[0]" selected>Anytime</option>
        <option
          v-for="(uploadDate, index) in uploadDates.slice(2)"
          :key="'uploadDate' + index"
          @click="selectUploadDateFilter(index)"
          :value="uploadDate"
        >
          {{ uploadDate }}
        </option>
      </select>
    </div>

    <div>
      <button class="filter-button" @click="toggleDesktopFilter"></button>
      <div v-show="desktopFilterIsShown">
        <table>
          <tr>
            <th>UPLOAD DATE</th>
          </tr>
          <tr v-for="(uploadDate, index) in uploadDates.slice(1)" :key="'uploadDate' + index">
            <td
              @click="selectUploadDateFilter(index)"
              :class="
                selectedUploadDateFilterIndex === index
                  ? selected - uploaddate - filter
                  : unselected - uploaddate - filter
              "
            >
              {{ uploadDate }}
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <th>TYPE</th>
          </tr>
          <tr v-for="(type, index) in types.slice(1)" :key="'type' + index">
            <td
              @click="selectTypeFilter(index)"
              :class="selectedTypeFilterIndex === index ? selected - type - filter : unselected - type - filter"
            >
              {{ type }}
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <th>SORT BY</th>
          </tr>
          <tr>
            <td
              @click="selectOrderFilter(-1)"
              :class="selectedUploadDateFilterIndex === -1 ? selected - order - filter : unselected - order - filter"
            >
              Relevance
            </td>
          </tr>
          <tr v-for="(order, index) in orders.slice(1)" :key="'order' + index">
            <td
              @click="selectOrderFilter(index)"
              :class="selectedUploadDateFilterIndex === index ? selected - order - filter : unselected - order - filter"
            >
              {{ order }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AxiosClient from '../api/index';

@Component
export default class SearchFilters extends Vue {
  axiosClient = AxiosClient.getInstance();

  filters = { type: '', order: '', uploadDate: '' };

  uploadDates = ['', 'Last hour', 'Today', 'This week', 'This month', 'This year'];
  types = ['', 'video', 'channel', 'playlist'];
  orders = ['', 'upload date', 'view count', 'rating'];

  selectedUploadDateFilterIndex = -1;
  selectedTypeFilterIndex = -1;
  selectedOrderFilterIndex = -1;

  desktopFilterIsShown = false;

  toggleDesktopFilter() {
    this.desktopFilterIsShown = !this.desktopFilterIsShown;
  }

  selectUploadDateFilter(index: number) {
    if (this.selectedUploadDateFilterIndex !== index) {
      this.selectedUploadDateFilterIndex = index;
      index === -1 ? (this.filters.uploadDate = '') : (this.filters.uploadDate = this.uploadDates[index]);
    }
    this.sendFilter();
  }

  selectTypeFilter(index: number) {
    if (this.selectedTypeFilterIndex !== index) {
      this.selectedTypeFilterIndex = index;
      index === -1 ? (this.filters.type = '') : (this.filters.type = this.types[index]);
    }
    this.sendFilter();
  }

  selectOrderFilter(index: number) {
    if (this.selectedOrderFilterIndex !== index) {
      this.selectedOrderFilterIndex = index;
      index === -1 ? (this.filters.order = '') : (this.filters.order = this.orders[index]);
    }
    this.sendFilter();
  }

  sendFilter(): void {
    this.axiosClient.getSearchResults(String(this.$route.query.query), this.filters);
  }
}
</script>

<style scoped lang="scss">
option,
td {
  cursor: pointer;
}
// .class-name::after {
//   content: 'X';
//   margin: 0 4px;
// }

// border-collapse: collapse;
// border-spacing: 0;
// width: 100%;
// display: table;

// border: 1px solid #ccc;

// border-bottom: 1px solid #ddd;

// background-color: #f1f1f1;

// background-color: #fff;

// text-align: center;

// padding: 8px 8px;
// display: table-cell;
// text-align: left;
// vertical-align: top;

// padding-left: 16px;
</style>
