<template>
  <div id="app">
    <HeaderComponent />
    <div class="main-container d-flex">
      <Sidebar />
      <div class="content-container flex-grow-1 d-flex flex-column">
        <div class="scrollable-content flex-grow-1 my-4 p-4 rounded bg-white">
          <div class="row">
            <div class="col-12 col-md-9">
              <!-- Physical Examination Card -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <span>Physical examination</span>
                </div>
                <div class="card-body">
                  <form id="assessmentForm">
                    <div class="mb-3">
                      <label class="form-label">General appearance</label>
                      <input type="text" class="form-control" placeholder="Enter value" v-model="physicalExamValues.generalAppearance" />
                    </div>
                    <div class="mb-3" v-for="(label, id) in physicalExamSections" :key="id">
                      <label class="form-label">{{ label }}</label>
                      <input type="text" class="form-control" placeholder="Enter value" v-model="physicalExamValues[id]" />
                    </div>
                  </form>
                </div>
              </div>

              <!-- Orders Tables -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('orders')">
                  <span>Medicine Orders</span>
                  <i :class="{'bi bi-chevron-up': isExpanded('orders'), 'bi bi-chevron-down': !isExpanded('orders')}"></i>
                </div>
                <div v-if="isExpanded('orders')" class="card-body">
                  <div class="d-flex justify-content-between mb-3">
                    <button class="btn btn-outline-primary" @click="openModal('medicine')">
                      <i class="bi bi-plus-circle"></i> Add Medicine Order
                    </button>
                  </div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Prescriber</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(order, index) in filteredMedicineOrders" :key="order.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.type }}</td>
                        <td>
                          ยา: {{ order.medicine }}<br>
                          ระยะเวลา: {{ order.dosage }}<br>
                          ปริมาณ: {{ order.frequency }}<br>
                        </td>
                        <td>{{ order.prescriber }}</td>
                        <td>{{ formatDate(order.startDate) }}</td>
                        <td>{{ formatDate(order.endDate) }}</td>
                        <td>
                          <div class="btn-group">
                            <button class="btn btn-outline-secondary me-2" @click="editOrder(order, 'medicine')">Edit</button>
                            <button class="btn btn-outline-danger" @click="updateOrderStatusToInactive(order.id, 'medicine')">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('xrayOrders')">
                  <span>X-ray Orders</span>
                  <i :class="{'bi bi-chevron-up': isExpanded('xrayOrders'), 'bi bi-chevron-down': !isExpanded('xrayOrders')}"></i>
                </div>
                <div v-if="isExpanded('xrayOrders')" class="card-body">
                  <div class="d-flex justify-content-between mb-3">
                    <button class="btn btn-outline-primary" @click="openModal('xray')">
                      <i class="bi bi-plus-circle"></i> Add X-ray Order
                    </button>
                  </div>
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Orders by</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(order, index) in filteredXrayOrders" :key="order.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.type }}</td>
                        <td>
                          ส่วน X-ray : {{ order.part }}<br>
                          รายละเอียด: {{ order.details }}<br>
                          <a v-if="order.imageUrl" @click="openImageModal(order.imageUrl)" style="cursor: pointer;">
                            <img :src="order.imageUrl" alt="X-ray image" width="100">
                          </a>
                        </td>
                        <td>{{ order.prescriber }}</td>
                        <td>{{ formatDate(order.date) }}</td>
                        <td>
                          <div class="btn-group">
                            <button class="btn btn-outline-secondary me-2" @click="editOrder(order, 'xray')">Edit</button>
                            <button class="btn btn-outline-danger" @click="updateOrderStatusToInactive(order.id, 'xray')">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Treatment History Card -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('treatment-history')">
                  <span>ประวัติการรักษา</span>
                  <i :class="{'bi bi-chevron-up': isExpanded('treatment-history'), 'bi bi-chevron-down': !isExpanded('treatment-history')}"></i>
                </div>
                <div v-if="isExpanded('treatment-history')" class="card-body">
                  <textarea class="form-control" placeholder="Enter value" v-model="treatmentHistory"></textarea>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-danger me-2" @click="resetForm">ยกเลิก</button>
                <button class="btn btn-primary" @click="saveAssessment">บันทึก</button>
              </div>
            </div>

            <!-- Patient Information Card -->
            <div class="col-12 col-md-3">
              <div class="card mb-3">
                <div class="card-body text-center right-content">
                  <img src="https://avatarfiles.alphacoders.com/302/302676.jpg" alt="Profile" class="rounded-circle" width="100" height="100" />
                  <div class="small-text">ชื่อสกุล : {{ patientData.firstName || '' }} {{ patientData.lastName || '' }}</div>
                  <div class="small-text">เพศ : {{ patientData.gender || '' }}</div>
                  <div class="small-text">วันเกิด : {{ patientData.birthDate || '' }}</div>
                  <div class="small-text">อายุ : {{ patientData.age || '' }} ปี</div>
                  <div class="small-text">แพ้ : <p v-if="patientData.allergies">{{ patientData.allergies.toString()}}</p></div>
                </div>
              </div>

              <!-- Medical History Card -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('medical-history')">
                  <h5><span>ข้อมูลการซักประวัติ</span></h5>
                  <i :class="{'bi bi-chevron-up': isExpanded('medical-history'), 'bi bi-chevron-down': !isExpanded('medical-history')}"></i>
                </div>
                <div v-if="isExpanded('medical-history')" class="card-body">
                  <div class="mb-3">
                    <label class="form-label">น้ำหนัก</label>
                    <input type="text" class="form-control small-text" placeholder="Kg" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">ส่วนสูง</label>
                    <input type="text" class="form-control small-text" placeholder="Cm" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">DTX</label>
                    <input type="text" class="form-control small-text" placeholder="mg/dl" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">BMI</label>
                    <input type="text" class="form-control small-text" placeholder="Kg/m2" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Temp</label>
                    <input type="text" class="form-control small-text" placeholder="°C" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Bp</label>
                    <input type="text" class="form-control small-text" placeholder="mmHg" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">HR</label>
                    <input type="text" class="form-control small-text" placeholder="BPM" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">RR</label>
                    <input type="text" class="form-control small-text" placeholder="BPM" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">ประวัติการสูบบุหรี่</label>
                    <select class="form-select small-text">
                      <option value>Select...</option>
                      <option value="ไม่สูบ">ไม่สูบ</option>
                      <option value="สูบ">สูบ</option>
                      <option value="เคยสูบ">เคยสูบ</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">ประวัติการดื่มสุรา</label>
                    <select class="form-select small-text">
                      <option value>Select...</option>
                      <option value="ไม่ดื่ม">ไม่ดื่ม</option>
                      <option value="ดื่ม">ดื่ม</option>
                      <option value="เคยดื่ม">เคยดื่ม</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Lab Card -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('lab')">
                  <span>LAB</span>
                  <i :class="{'bi bi-chevron-up': isExpanded('lab'), 'bi bi-chevron-down': !isExpanded('lab')}"></i>
                </div>
                <div v-if="isExpanded('lab')" class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Lab Test</label>
                    <input type="text" class="form-control" placeholder="Enter lab test details" />
                  </div>
                </div>
              </div>

              <!-- Xray Card -->
              <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center" @click="toggleCollapse('xray')">
                  <span>XRAY</span>
                  <i :class="{'bi bi-chevron-up': isExpanded('xray'), 'bi bi-chevron-down': !isExpanded('xray')}"></i>
                </div>
                <div v-if="isExpanded('xray')" class="card-body">
                  <div class="mb-3">
                    <label class="form-label">Xray Details</label>
                    <input type="text" class="form-control" placeholder="Enter xray details" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Orders -->
    <div class="modal fade" id="ordersModal" tabindex="-1" aria-labelledby="ordersModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ordersModalLabel">{{ isEditing ? 'Edit' : 'Add' }} Prescription Orders</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="prescriptionForm">
              <div class="mb-3">
                <label for="orderType" class="form-label">Order Type</label>
                <select id="orderType" v-model="orderType" class="form-select">
                  <option value="medicine">Medicine</option>
                  <option value="xray">X-ray</option>
                </select>
              </div>
              <div v-if="orderType === 'medicine'">
                <div class="mb-3">
                  <label for="medicine" class="form-label">Medicine</label>
                  <input list="medicineList" id="medicine" v-model="prescription.medicine" class="form-control" placeholder="Enter or select medicine">
                  <datalist id="medicineList">
                    <option v-for="medicine in medicines" :key="medicine" :value="medicine">{{ medicine }}</option>
                  </datalist>
                </div>
                <div class="mb-3">
                  <label for="dosage" class="form-label">Dosage</label>
                  <input type="text" id="dosage" v-model="prescription.dosage" class="form-control" placeholder="Enter dosage" />
                </div>
                <div class="mb-3">
                  <label for="frequency" class="form-label">Frequency</label>
                  <input type="text" id="frequency" v-model="prescription.frequency" class="form-control" placeholder="Enter frequency" />
                </div>
                <div class="mb-3">
                  <div class="form-check" v-for="day in daysOfWeek" :key="day">
                    <input class="form-check-input" type="checkbox" :id="day" :value="day" v-model="prescription.days">
                    <label class="form-check-label" :for="day">{{ day }}</label>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="startDate" class="form-label">Start Date</label>
                  <input type="datetime-local" id="startDate" v-model="prescription.startDate" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="endDate" class="form-label">End Date</label>
                  <input type="datetime-local" id="endDate" v-model="prescription.endDate" class="form-control" />
                </div>
              </div>
              <div v-if="orderType === 'xray'">
                <div class="mb-3">
                  <label for="xrayPart" class="form-label">X-ray Part</label>
                  <select id="xrayPart" v-model="xray.part" class="form-select">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="xrayDetails" class="form-label">X-ray Details</label>
                  <input type="text" id="xrayDetails" v-model="xray.details" class="form-control" placeholder="Enter details" />
                </div>
                <div class="mb-3">
                  <label for="xrayImage" class="form-label">Upload X-ray Image</label>
                  <input type="file" id="xrayImage" @change="handleFileUpload" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="xrayDate" class="form-label">Date</label>
                  <input type="datetime-local" id="xrayDate" v-model="xray.date" class="form-control" />
                </div>
              </div>
              <div class="mb-3">
                <label for="prescriber" class="form-label">แพทย์</label>
                <input type="text" id="prescriber" v-model="prescriber" class="form-control" placeholder="Enter prescriber's name" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveOrder">{{ isEditing ? 'Update' : 'Save' }} changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Image Preview -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="imageModalLabel">X-ray Image</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <img :src="currentImageUrl" alt="X-ray image" class="img-fluid">
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import { reactive } from 'vue';
import { doc, updateDoc, addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '@/firebase.js';
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    Sidebar,
  },
  setup() {
    const physicalExamSections = {
      head: 'Head',
      eyes: 'Eyes',
      ears: 'Ears',
      nose: 'Nose',
      throat: 'Throat',
      chest: 'Chest',
      abdomen: 'Abdomen',
      extremities: 'Extremities'
    };

    const physicalExamValues = reactive({
      generalAppearance: '',
      head: '',
      eyes: '',
      ears: '',
      nose: '',
      throat: '',
      chest: '',
      abdomen: '',
      extremities: ''
    });

    const collapsedSections = reactive({});

    function toggleCollapse(section) {
      collapsedSections[section] = !collapsedSections[section];
    }

    function isExpanded(section) {
      return !collapsedSections[section];
    }

    return {
      physicalExamSections,
      physicalExamValues,
      collapsedSections,
      toggleCollapse,
      isExpanded
    };
  },
  data() {
    return {
      name: 'assessment',
      patientData: {
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        age: '',
        allergies: []
      },
      orderType: 'medicine',
      prescription: {
        medicine: '',
        dosage: '',
        frequency: '',
        days: [],
        startDate: '',
        endDate: ''
      },
      xray: {
        part: '',
        details: '',
        imageUrl: '',
        date: ''
      },
      prescriber: '',
      selectedFile: null,
      orders: [],
      medicines: ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Aspirin', 'Acitretin'],
      isEditing: false,
      currentOrderId: null,
      treatmentHistory: '',
      currentImageUrl: '',
      medicineFilterDate: '',
      xrayFilterDate: '',
      
    };
  },
  computed: {
    medicineOrders() {
      return this.orders.filter(order => order.type === 'medicine');
    },
    xrayOrders() {
      return this.orders.filter(order => order.type === 'xray');
    },
    filteredMedicineOrders() {
      if (this.medicineFilterDate) {
        return this.medicineOrders.filter(order => new Date(order.startDate) >= new Date(this.medicineFilterDate));
      }
      return this.medicineOrders;
    },
    filteredXrayOrders() {
      if (this.xrayFilterDate) {
        return this.xrayOrders.filter(order => new Date(order.date) >= new Date(this.xrayFilterDate));
      }
      return this.xrayOrders;
    }
  },
  mounted() {
    
    const patientData = localStorage.getItem('patientData');
    if (patientData) {
      this.patientData = JSON.parse(patientData);
      //console.log(this.patientData)
      this.getData();
    }
  },
  methods: {
    async getData() {
      try {
        if(this.patientData){
        const querySnapshot = await getDocs(collection(database, 'Orders'));
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          if (data.status !== 'inactive' && data.patientId == this.patientData.id) {
            this.orders.push(data);
          }
        });
        }
        
      } catch (error) {
        console.error('Error :', error);
      }
    },
    async saveAssessment() {
      if (this.patientData.id) {
        try {
          await addDoc(collection(database, 'Assessment'), {
            patientId: this.patientData.id,
            physicalExam: {
              generalAppearance: this.physicalExamValues.generalAppearance,
              head: this.physicalExamValues.head,
              eyes: this.physicalExamValues.eyes,
              ears: this.physicalExamValues.ears,
              nose: this.physicalExamValues.nose,
              throat: this.physicalExamValues.throat,
              chest: this.physicalExamValues.chest,
              abdomen: this.physicalExamValues.abdomen,
              extremities: this.physicalExamValues.extremities
            },
            treatmentHistory: this.treatmentHistory,
            date: new Date()
          });

          const patientDocRef = doc(database, 'patients', this.patientData.id);
          await updateDoc(patientDocRef, { statuspt: '2' });

          // Add logic to send data to orders page
          this.$router.push({ name: 'orders' }); // Navigate to orders page
          localStorage.removeItem('patientData');
          alert("Assessment saved successfully!");
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    },
    resetForm() {
      const form = document.getElementById('assessmentForm');
      form.reset();
      for (const key in this.physicalExamValues) {
        if (this.physicalExamValues.hasOwnProperty(key)) {
          this.physicalExamValues[key] = '';
        }
      }
      this.treatmentHistory = '';
    },
    openModal(orderType) {
      this.orderType = orderType;
      this.isEditing = false;
      this.currentOrderId = null;
      if (orderType === 'medicine') {
        this.prescription = { 
          medicine: '', 
          dosage: '', 
          frequency: '', 
          days: [], 
          startDate: '', 
          endDate: '' 
        };
      } else if (orderType === 'xray') {
        this.xray = { 
          part: '', 
          details: '', 
          imageUrl: '',
          date: '' 
        };
      }
      this.prescriber = '';
      var myModal = new bootstrap.Modal(document.getElementById('ordersModal'));
      myModal.show();
    },
    openImageModal(imageUrl) {
      this.currentImageUrl = imageUrl;
      var myModal = new bootstrap.Modal(document.getElementById('imageModal'));
      myModal.show();
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      try {
        const selectedFile = this.selectedFile;
        const storageReference = ref(storage, `xray-images/${selectedFile.name}`);
        await uploadBytes(storageReference, selectedFile);
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading file and saving URL:', error);
      }
    },
    async saveOrder() {
      if (this.patientData.id) {
        try {
          const orderData = { 
            patientId: this.patientData.id, 
            prescriber: this.prescriber
          };
          if (this.orderType === 'medicine') {
            orderData.type = 'medicine';
            orderData.medicine = this.prescription.medicine;
            orderData.dosage = this.prescription.dosage;
            orderData.frequency = this.prescription.frequency;
            orderData.days = this.prescription.days || [];
            orderData.startDate = this.prescription.startDate || '';
            orderData.endDate = this.prescription.endDate || '';
          } else if (this.orderType === 'xray') {
            orderData.type = 'xray';
            orderData.part = this.xray.part;
            orderData.details = this.xray.details;
            orderData.date = this.xray.date || '';
            const imageUrl = await this.uploadFile();
            if (imageUrl) {
              orderData.imageUrl = imageUrl;
            }
          }
          if (this.isEditing && this.currentOrderId) {
            const orderDocRef = doc(database, 'Orders', this.currentOrderId);
            await updateDoc(orderDocRef, orderData);
            const index = this.orders.findIndex(order => order.id === this.currentOrderId);
            if (index !== -1) {
              this.orders[index] = { ...orderData, id: this.currentOrderId };
            }
            alert('Order updated successfully!');
          } else {
            const docRef = await addDoc(collection(database, 'Orders'), orderData);
            orderData.id = docRef.id;
            this.orders.push(orderData);
            alert('Order saved successfully!');
          }
          this.resetOrderForm();
          const modalElement = document.getElementById('ordersModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        } catch (error) {
          console.error("Error saving order:", error);
          alert("Error saving order. Please try again.");
        }
      } else {
        alert("No patient data available.");
      }
    },
    resetOrderForm() {
      if (this.orderType === 'medicine') {
        this.prescription = { 
          medicine: '', 
          dosage: '', 
          frequency: '', 
          days: [], 
          startDate: '', 
          endDate: '' 
        };
      } else if (this.orderType === 'xray') {
        this.xray = { 
          part: '', 
          details: '', 
          imageUrl: '',
          date: '' 
        };
      }
      this.prescriber = '';
      this.selectedFile = null;
    },
    async updateOrderStatusToInactive(orderId, orderType) {
      try {
        const orderDocRef = doc(database, 'Orders', orderId);
        await updateDoc(orderDocRef, { status: 'inactive' });
        if (orderType === 'medicine') {
          this.orders = this.orders.filter(order => order.id !== orderId && order.type === 'medicine');
        } else if (orderType === 'xray') {
          this.orders = this.orders.filter(order => order.id !== orderId && order.type === 'xray');
        }
        alert('Order status updated to inactive successfully!');
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("Error updating order status. Please try again.");
      }
    },
    editOrder(order, orderType) {
      this.orderType = orderType;
      this.isEditing = true;
      this.currentOrderId = order.id;
      if (orderType === 'medicine') {
        this.prescription = {
          medicine: order.medicine,
          dosage: order.dosage,
          frequency: order.frequency,
          days: order.days || [],
          startDate: order.startDate || '',
          endDate: order.endDate || ''
        };
      } else if (orderType === 'xray') {
        this.xray = { 
          part: order.part, 
          details: order.details, 
          imageUrl: order.imageUrl,
          date: order.date || ''
        };
      }
      this.prescriber = order.prescriber;
      var myModal = new bootstrap.Modal(document.getElementById('ordersModal'));
      myModal.show();
    },
    async updateOrderDate(order) {
      if (this.currentOrderId) {
        try {
          const orderDocRef = doc(database, 'Orders', this.currentOrderId);
          await updateDoc(orderDocRef, { date: order.date });
          const index = this.orders.findIndex(o => o.id === this.currentOrderId);
          if (index !== -1) {
            this.orders[index].date = order.date;
          }
          alert('Order date updated successfully!');
        } catch (error) {
          console.error("Error updating order date:", error);
          alert("Error updating order date. Please try again.");
        }
      }
    },
    filterOrders(orderType) {
      // Filtering is handled by computed properties
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      const formattedDate = date.toLocaleDateString('th-TH', options);
      const formattedTime = date.toLocaleTimeString('th-TH', timeOptions).replace(':', '.');
      return `${formattedDate} ${formattedTime}`;
    }
  }
};
</script>

<style scoped>
.orders-container {
  display: flex;
  flex-direction: column;
}
.order-card {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(8, 8, 8, 0.1);
}
.card-header {
  background-color: #e5dddd;
  cursor: pointer;
}
.card-body {
  padding: 1rem;
}
.form-label {
  font-weight: bold;
}
.form-select {
  border-radius: 5px;
}
.rounded-circle {
  border: 2px solid #007bff;
}
.small-text {
  font-size: 0.875rem;
}
.bg-white {
  background-color: #ffffff;
}
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
footer {
  flex-shrink: 0;
}

.order-card img {
  display: block;
  margin: 0 auto;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

/* เพิ่มสีและขอบเพื่อความสวยงาม */
.table-bordered th, .table-bordered td {
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
.card {
  margin-bottom: 1.5rem;
}
.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}
.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}
.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #fff;
}
.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}
.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}
.form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
