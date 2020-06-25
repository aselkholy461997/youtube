<template>
  <div>
    <div class="row mb-2 px-2" v-if="windowWidth < 600">
      <select class="select-filter mr-2" @change="changeMobileTypeFilter($event)" :disabled="disabledMobileTypeFilter">
        <option :value="-1" :selected="mobileTypeFilterDefault">All</option>
        <option v-for="(type, index) in types.slice(1)" :key="'type' + index" :value="index">
          {{ type }}
        </option>
      </select>

      <select
        class="select-filter"
        @change="changeMobileUploadDateFilter($event)"
        :disabled="disabledMobileUploadDateFilter"
      >
        <option :value="-1" :selected="mobileUploadDateFilterDefault">Anytime</option>
        <option v-for="(uploadDate, index) in uploadDates.slice(1)" :key="'uploadDate' + index" :value="index">
          {{ uploadDate }}
        </option>
      </select>
    </div>

    <div class="border-bottom-ccc mb-5" v-else>
      <div class="row desktop-filters-bar px-2">
        <p>About {{ changedTotalResults }} results</p>
        <div @click="desktopFilterIsShown = !desktopFilterIsShown" class="filter-button-container cursor-pointer">
          <p class="mr-3">FILTER</p>
          <img class="mr-2" src="../assets/filter-icon.png" alt="Filter Icon" />
        </div>
      </div>
      <div v-show="desktopFilterIsShown" class="row desktop-filters">
        <table>
          <tr>
            <th>UPLOAD DATE</th>
          </tr>
          <tr v-for="(uploadDate, index) in uploadDates" :key="'uploadDate' + index">
            <td
              @click="selectUploadDateFilter(index)"
              :class="[selectedUploadDateFilterIndex === index ? 'selected-filter' : '', unselectUploadDate===true? 'unselected-filter' : '']"
            >
              {{ uploadDate }}
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <th>TYPE</th>
          </tr>
          <tr v-for="(type, index) in types" :key="'type' + index">
            <td
              @click="selectTypeFilter(index)"
              :class="[selectedTypeFilterIndex === index ? 'selected-filter' : '', unselectType===true? 'unselected-filter' : '']"
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
              :class="selectedOrderFilterIndex === -1 ? 'selected-order-filter' : 'unselected-order-filter'"
            >
              Relevance
            </td>
          </tr>
          <tr v-for="(order, index) in orders" :key="'order' + index">
            <td
              @click="selectOrderFilter(index)"
              :class="selectedOrderFilterIndex === index ? 'selected-order-filter' : 'unselected-order-filter'"
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
import { Component, Prop, Vue } from 'vue-property-decorator';

import AxiosClient from '@/api/index';
import store from '@/store';

@Component
export default class SearchFilters extends Vue {
  @Prop({ required: true }) windowWidth!: number;
  @Prop({ required: true }) changedTotalResults!: string;

  axiosClient = AxiosClient.getInstance();

  filters = { type: '', order: '', uploadDate: '' };

  uploadDates = ['Last hour', 'Today', 'This week', 'This month', 'This year'];
  types = ['Video', 'Channel', 'Playlist'];
  orders = ['Upload date', 'View count', 'Rating'];

  selectedUploadDateFilterIndex = -1;
  selectedTypeFilterIndex = -1;
  selectedOrderFilterIndex = -1;

  mobileTypeFilterDefault = false;
  mobileUploadDateFilterDefault = false;

  disabledMobileTypeFilter = false;
  disabledMobileUploadDateFilter = false;

  desktopFilterIsShown = false;

  unselectType = false;
  unselectUploadDate = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeMobileTypeFilter(event: any) {
    if (Number((event.target as HTMLSelectElement).value) === -1) {
      this.filters.type = '';
      this.mobileTypeFilterDefault = true;
      this.mobileUploadDateFilterDefault = true;
      this.disabledMobileTypeFilter = false;
      this.disabledMobileUploadDateFilter = false;
    } else if (Number((event.target as HTMLSelectElement).value) >= 0) {
      this.filters.type = this.types[Number((event.target as HTMLSelectElement).value) + 1].toLowerCase();
      this.mobileTypeFilterDefault = false;
      this.mobileUploadDateFilterDefault = true;
      this.disabledMobileTypeFilter = false;
      this.disabledMobileUploadDateFilter = true;
      this.filters.uploadDate = '';
    }
    this.sendFilter();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeMobileUploadDateFilter(event: any) {
    if (Number((event.target as HTMLSelectElement).value) === -1) {
      this.filters.uploadDate = '';
      this.mobileUploadDateFilterDefault = true;
      this.mobileTypeFilterDefault = true;
      this.disabledMobileUploadDateFilter = false;
      this.disabledMobileTypeFilter = false;
    } else if (Number((event.target as HTMLSelectElement).value) >= 0) {
      this.filters.uploadDate = this.uploadDates[Number((event.target as HTMLSelectElement).value) + 1];
      this.mobileUploadDateFilterDefault = false;
      this.mobileTypeFilterDefault = true;
      this.disabledMobileUploadDateFilter = false;
      this.disabledMobileTypeFilter = true;

      this.filters.type = '';
    }
    this.sendFilter();
  }

  selectUploadDateFilter(index: number) {
    if (this.selectedUploadDateFilterIndex !== index) {
      this.unselectUploadDate = false;
      this.selectedUploadDateFilterIndex = index;
      index === -1 ? (this.filters.uploadDate = '') : (this.filters.uploadDate = this.uploadDates[index]);
    } else {
      this.unselectUploadDate = true;
      this.filters.uploadDate = '';
    }
    this.desktopFilterIsShown = false;
    this.sendFilter();
  }

  selectTypeFilter(index: number) {
    if (this.selectedTypeFilterIndex !== index) {
      this.unselectType = false;
      this.selectedTypeFilterIndex = index;
      index === -1 ? (this.filters.type = '') : (this.filters.type = this.types[index].toLowerCase());
    } else {
      this.unselectType = true;
      this.filters.type = '';
    }
    this.desktopFilterIsShown = false;
    this.sendFilter();
  }

  selectOrderFilter(index: number) {
    if (this.selectedOrderFilterIndex !== index) {
      this.selectedOrderFilterIndex = index;
      if (index === -1) this.filters.order = '';
      else if (index === 0) this.filters.order = 'date';
      else if (index === 1) this.filters.order = 'viewCount';
      else this.filters.order = this.orders[index].toLowerCase();
    }
    this.desktopFilterIsShown = false;
    this.sendFilter();
  }

  sendFilter(): void {
    store.dispatch('populateFilters', this.filters);
    this.axiosClient.getSearchResults(String(this.$route.query.query), this.filters);
  }
}
</script>

<style scoped lang="scss">
option,
td {
  cursor: pointer;
}

td {
  padding: 0.5rem 0;
  display: table-cell;
}

th {
  padding-bottom: 0.25rem;
  display: table-cell;
  color: #222;
  font-size: medium;
  border-bottom: 1px solid #bbb;
  text-align: left;
}

.desktop-filters-bar {
  justify-content: space-between;
}

.filter-button-container {
  display: flex;
  flex-direction: row-reverse;
  img {
    width: 20px;
    height: auto;
  }

  p {
    font-weight: bolder;
    font-size: 13px;
    color: #555;
  }
}

.desktop-filters {
  width: 85%;
  justify-content: space-between;
}

.select-filter {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: #eee;
  padding: 10px 3px;
  border: 1px solid #777;
}

.selected-filter {
  font-weight: bold;
  color: #333;
}

.selected-filter::after {
  content: 'X';
  margin: 0 6px 0 0;
}

.unselected-filter {
  color: #777;
  font-weight: initial;
}

.unselected-filter::after {
  content: '';
  margin: 0 6px 0 0;
}

tr {
  text-align: left;
}

.selected-order-filter {
  font-weight: bold;
  color: #333;
}

.unselected-order-filter {
  color: #777;
  font-weight: initial;
}
</style>
