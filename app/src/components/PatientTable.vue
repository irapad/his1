<template>
    <div>
      <b-form-group label="ค้นหา" class="d-flex justify-content-end">
        <b-form-input
          v-model="searchQuery"
          placeholder="hn / ชื่อ"
          class="w-25"
        ></b-form-input>
      </b-form-group>
      
      <b-table striped hover :items="filteredPatients" :fields="fields" class="mt-3">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(HN)="data">
          {{ data.item.HN }}
        </template>
        <template #cell(firstName)="data">
          {{ data.item.firstName }}
        </template>
        <template #cell(lastName)="data">
          {{ data.item.lastName }}
        </template>
        <template #cell(nid)="data">
          {{ data.item.nid }}
        </template>
        <template #cell(gender)="data">
          {{ data.item.gender }}
        </template>
        <template #cell(dob)="data">
          {{ data.item.dob }}
        </template>
        <template #cell(age)="data">
          {{ data.item.age }}
        </template>
        <template #cell(nationality)="data">
          {{ data.item.nationality }}
        </template>
        <template #cell(allergies)="data">
          {{ data.item.allergies }}
        </template>
        <template #cell(status)="data">
          {{ data.item.status }}
        </template>
        <template #cell(bloodType)="data">
          {{ data.item.bloodType }}
        </template>
      </b-table>
      
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        class="mt-3"
      ></b-pagination>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        currentPage: 1,
        perPage: 10,
        fields: [
          { key: 'index', label: '#' },
          { key: 'HN', label: 'HN' },
          { key: 'firstName', label: 'ชื่อ' },
          { key: 'lastName', label: 'นามสกุล' },
          { key: 'nid', label: 'NID | PASSPORT' },
          { key: 'gender', label: 'เพศ' },
          { key: 'dob', label: 'วันเกิด' },
          { key: 'age', label: 'อายุ' },
          { key: 'nationality', label: 'สัญชาติ' },
          { key: 'allergies', label: 'แพ้ยา' },
          { key: 'status', label: 'สถานะ' },
          { key: 'bloodType', label: 'หมู่เลือด' },
        ],
        patients: [
          { HN: '5007006', firstName: 'Johr', lastName: 'Wick', nid: '1450900070018', gender: 'Male', dob: '0', age: 30, nationality: 'Thai', allergies: 'no', status: 'Married', bloodType: 'B' },
          { HN: '', firstName: '', lastName: '', nid: '1029294093', gender: '', dob: '', age: '', nationality: '', allergies: '', status: '', bloodType: '' }
        ]
      }
    },
    computed: {
      filteredPatients() {
        return this.patients.filter(patient => {
          return (
            patient.HN.includes(this.searchQuery) ||
            patient.firstName.includes(this.searchQuery) ||
            patient.lastName.includes(this.searchQuery)
          )
        })
      },
      totalRows() {
        return this.filteredPatients.length
      }
    }
  }
  </script>
  
  <style>
  </style>
  