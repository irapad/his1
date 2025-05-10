<template>
  <div id="nurse-orders">
    <HeaderComponent />
    <div class="main-container d-flex">
      <Sidebar />
      <div class="content-container flex-grow-1 d-flex flex-column">
        <div class="scrollable-content flex-grow-1 my-4 p-4 rounded bg-white">
          <h2>Orders for Nurse</h2>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Gender</th>
                  <th>Order Type</th>
                  <th>Details</th>
                  <th>Prescriber</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="combinedData.length === 0">
                  <td colspan="7" class="text-center">No orders available</td>
                </tr>
                <tr v-for="(order, index) in combinedData" :key="order.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ order.patientName }}</td>
                  <td>{{ order.gender }}</td>
                  <td>{{ order.type }}</td>
                  <td v-if="order.type === 'medicine'">
                    ยา: {{ order.medicine }}
                    <br />
                    ระยะเวลา: {{ order.dosage }}
                    <br />
                    ปริมาณ: {{ order.frequency }}
                    <br />
                  </td>
                  <td v-if="order.type === 'lab'">
                    ผลแลป: {{ order.labTest }}
                    <br />
                    รายละเอียด: {{ order.details }}
                    <br />
                  </td>
                  <td v-if="order.type === 'xray'">
                    X-ray: {{ order.part }}
                    <br />
                    รายละเอียด: {{ order.details }}
                    <br />
                  </td>
                  <td>{{ order.prescriber }}</td>
                  <td v-if="order.date">
                     {{ formatDate(order.date) }}
                 </td>
                 <td v-if="order.startDate != null && order.endDate">
                    เริ่ม
                    {{ formatDate(order.startDate) }}<br>
                    ถึง
                    {{ formatDate(order.endDate) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebase.js";
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Sidebar
  },
  setup() {
    const orddata = ref([]);
    const ptdata = ref([]);
    const combinedData = ref([]);

    const fetchdata = async () => {
      try {
        const getorder = await getDocs(collection(database, "Orders"));
        const getpatient = await getDocs(collection(database, "patients"));

        orddata.value = [];
        ptdata.value = [];

        getorder.forEach(doc => {
          const data = doc.data();
          if (data.status !== "inactive") {
            orddata.value.push({
              ...data,
              id: doc.id
            });
          }
        });

        getpatient.forEach(doc => {
          const data = doc.data();
          ptdata.value.push({
            ...data,
            id: doc.id
          });
        });

        combinedData.value = orddata.value.map(order => {
          const patient = ptdata.value.find(patient => patient.id === order.patientId);
          console.log(combinedData);
          return {
            ...order,
            patientName: patient ? patient.firstName + " " + patient.lastName : " ",
            gender: patient ? patient.gender : " ",
          };

          
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const formatDate = dateString => {
      const date = new Date(dateString);
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit" };
      const formattedDate = date.toLocaleDateString("th-TH", options);
      const formattedTime = date
        .toLocaleTimeString("th-TH", timeOptions)
      return `${"วันที่" + formattedDate} ${"เวลา" + formattedTime}`;
    };

    onMounted(async () => {
      await fetchdata();
    });

    return {
      combinedData,
      formatDate
    };
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
}
.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}
.scrollable-content {
  flex-grow: 1;
  overflow-y: auto;
  margin: 1rem 0;
  padding: 1rem;
}
.table-responsive {
  margin-top: 20px;
}
.table-bordered th,
.table-bordered td {
  border: 1px solid #ddd;
  padding: 10px;
}
.table thead th {
  background-color: #f8f9fa;
  font-weight: bold;
}
.table tbody tr:hover {
  background-color: #f1f1f1;
}
.card-header {
  background-color: #f0f0f0;
  font-weight: bold;
}
</style>
