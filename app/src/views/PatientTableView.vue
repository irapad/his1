<template>
  <div id="app" class="d-flex flex-column vh-100">
    <HeaderComponent />
    <div class="main-container d-flex flex-grow-1">
      <Sidebar />
      <div class="main-content">
        <h4>ผู้ป่วยรอส่งตรวจ</h4>
        <input
          type="text"
          v-model="search"
          @input="filterPatients"
          placeholder="ค้นหา hn / ชื่อ"
          class="search-input"
        />
        <table class="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>NID | PASSPORT</th>
              <th>เพศ</th>
              <th>วันเกิด</th>
              <th>อายุ</th>
              <th>สัญชาติ</th>
              <th>แพ้ยา</th>
              <th>สถานะ</th>
              <th>หมู่เลือด</th>
              <th>ส่งตรวจ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x, index) in filteredPatients" :key="x.id">
              <template v-if="x.statuspt == 1">
                <td>{{ index + 1 }}</td>
                <td>{{ x.firstName }}</td>
                <td>{{ x.lastName }}</td>
                <td>{{ x.idCard }}</td>
                <td>{{ x.gender }}</td>
                <td>{{ x.birthDate }}</td>
                <td>{{ x.age }}</td>
                <td>{{ x.nationality }}</td>
                <td>{{ x.allergies.toString() }}</td>
                <td>{{ x.status }}</td>
                <td>{{ x.bloodType }}</td>
                <td @click="sendPatient(x)"><button type="button" class="btn btn-outline-success btn-sm"><i class="bi bi-send"></i></button></td>
              </template>
            </tr>
          </tbody>
        </table>
        <h4>ผู้ป่วยได้รับบริการเรียบร้อย</h4>
        <input
          type="text"
          v-model="search2"
          @input="filterPatients2"
          placeholder="ค้นหา hn / ชื่อ"
          class="search-input"
        />
        <table class="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>NID | PASSPORT</th>
              <th>เพศ</th>
              <th>วันเกิด</th>
              <th>อายุ</th>
              <th>สัญชาติ</th>
              <th>แพ้ยา</th>
              <th>สถานะ</th>
              <th>หมู่เลือด</th>
              <th>ส่งตรวจ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(x, index) in filteredPatients2" :key="x.id">
              <template v-if="x.statuspt == 2">
                <td>{{ index + 1 }}</td>
                <td>{{ x.firstName }}</td>
                <td>{{ x.lastName }}</td>
                <td>{{ x.idCard }}</td>
                <td>{{ x.gender }}</td>
                <td>{{ x.birthDate }}</td>
                <td>{{ x.age }}</td>
                <td>{{ x.nationality }}</td>
                <td>{{ x.allergies.toString() }}</td>
                <td>{{ x.status }}</td>
                <td>{{ x.bloodType }}</td>
                <td><i class="bi bi-check-circle-fill icon-green"></i></td>
              </template>
            </tr>
          </tbody>
        </table>
        <p>{{ filteredPatients.length }} results</p>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { database } from '@/firebase.js';
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Sidebar,
  },
  data() {
    return {
      search: '',
      search2: '',
      patients: [],
      patients2: [],
      patientData: {},
    };
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(patient =>
        patient.firstName.includes(this.search) ||
        patient.lastName.includes(this.search)
      );
    },
    filteredPatients2() {
      return this.patients2.filter(patient =>
        patient.firstName.includes(this.search2) ||
        patient.lastName.includes(this.search2)
      );
    }
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async deletePatient(patientId) {
      try {
        const patientDocRef = doc(database, 'patients', patientId);
        await updateDoc(patientDocRef, { statuspt: 0 });

        const index = this.patients.findIndex(patient => patient.id === patientId);
        if (index !== -1) {
          this.patients.splice(index, 1);
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async sendPatient(patient) {
      try {
        const patientDocRef = doc(database, 'patients', patient.id);
        await updateDoc(patientDocRef, { statuspt: 2 });

        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index !== -1) {
          this.patients.splice(index, 1);
          this.patients2.push(patient);
          this.patientData = patient;
          localStorage.setItem('patientData', JSON.stringify(this.patientData));
          this.$router.push({ name: 'assessment' });
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async getData() {
      try {
        const querySnapshot = await getDocs(collection(database, 'patients'));
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          if (data.statuspt == 1) {
            this.patients.push(data);
          } else if (data.statuspt == 2) {
            this.patients2.push(data);
          }
        });
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
    filterPatients() {
      // This method will automatically trigger the computed property to filter patients based on the search term.
    },
    filterPatients2() {
      // This method will automatically trigger the computed property to filter patients2 based on the search2 term.
    }
  }
};
</script>

<style scoped>
.icon-green {
    color: rgb(0, 197, 88);
    font-size: 24px;
}
#app {
  font-family: Arial, sans-serif;
}
.main-container {
  display: flex;
  width: 100%;
}
.main-content {
  flex: 1;
  padding: 20px;
  margin: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
}
.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}
.styled-table th {
  background-color: #ccc7c7;
}
.styled-table tr:nth-child(even) {
  background-color: #fdfdfd;
}
.styled-table tr:hover {
  background-color: #fcfcfc;
}
.styled-table th,
.styled-table td {
  text-align: center;
  font-size: 16px;
}
.delete-icon {
  cursor: pointer;
  color: red;
}
.delete-icon:hover {
  color: darkred;
}
</style>
