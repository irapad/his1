<template>
  <div id="app" class="d-flex flex-column vh-100">
    <HeaderComponent />
    <div class="d-flex flex-grow-1">
      <Sidebar />
      <div class="flex-grow-1 container my-4 bg-white p-4 rounded">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>ข้อมูลส่วนบุคคล</h3>
          <div>
            <button class="btn btn-primary me-2">ข้อมูลบัตร</button>
            <button class="btn btn-danger me-2" @click="resetForm">ยกเลิก</button>
            <button class="btn btn-success" @click="saveData">บันทึก</button>
          </div>
        </div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <form @submit.prevent="saveData" class="flex-grow-1">
          <div class="row">
            <div class="col-md-3 text-center">
              <img
                src="https://clawset.co/wp-content/uploads/2023/01/%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%99%E0%B8%AD%E0%B8%99%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81.png"
                alt="Profile" class="img-fluid rounded mb-3 profile-img" />
              <div class="form-check">
                <input class="form-check-input" type="radio" name="profile" value="JohnDOE" id="profileOld" v-model="formData.profile" />
                <label class="form-check-label" for="profileOld">ใช้ข้อมูลเก่า</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="profile" value="JaneDOE" id="profileNew" v-model="formData.profile" />
                <label class="form-check-label" for="profileNew">Benz</label>
              </div>
            </div>
            <div class="col-md-9">
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="title">คำนำ</label>
                  <select id="title" class="form-select" v-model="formData.title">
                    <option value="">select</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="firstName">ชื่อ</label>
                  <input type="text" id="firstName" class="form-control" v-model="formData.firstName" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="middleName">ชื่อกลาง</label>
                  <input type="text" id="middleName" class="form-control" v-model="formData.middleName" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">นามสกุล</label>
                  <input type="text" id="lastName" class="form-control" v-model="formData.lastName" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="gender">เพศ</label>
                  <select id="gender" class="form-select" v-model="formData.gender">
                    <option value="">โปรดระบุ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="birthDate">วันเกิด</label>
                  <input type="date" id="birthDate" class="form-control" v-model="formData.birthDate" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="age">อายุ</label>
                  <input type="text" id="age" class="form-control" v-model="formData.age" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="idCard">ID Card</label>
                  <input type="text" id="idCard" class="form-control" v-model="formData.idCard" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="religion">ศาสนา</label>
                  <input type="text" id="religion" class="form-control" v-model="formData.religion" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="nationality">สัญชาติ</label>
                  <input type="text" id="nationality" class="form-control" v-model="formData.nationality" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="ethnicity">เชื้อชาติ</label>
                  <input type="text" id="ethnicity" class="form-control" v-model="formData.ethnicity" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status">สถานะ</label>
                  <select id="status" class="form-select" v-model="formData.status">
                    <option value="">โปรดระบุ</option>
                    <option value="แต่งงาน">แต่งงาน</option>
                    <option value="โสด">โสด</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="bloodType">หมู่เลือด</label>
                  <select id="bloodType" class="form-select" v-model="formData.bloodType">
                    <option value="">โปรดระบุ</option>
                    <option value="AB">AB</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="O">O</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="rh">Rh</label>
                  <select id="rh" class="form-select" v-model="formData.rh">
                    <option value="">โปรดระบุ</option>
                    <option value="positive">+</option>
                    <option value="negative">-</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="allergies">แพ้ยา/แพ้อาหาร</label>
                <div>
                  <label><input type="checkbox" id="allergy" v-model="formData.allergies" value="แพ้ยา" /> แพ้ยา</label> 
                  <label><input type="checkbox" id="foodAllergy" v-model="formData.allergies" value="แพ้อาหาร" /> แพ้อาหาร</label> 
                  <div class="col-md-3 mb-3"><label><input type="checkbox" id="otherAllergy" v-model="formData.allergies" value="อื่นๆ" /> อื่นๆ</label>
                  <input type="text" id="otherAllergy" class="form-control" v-model="formData.otherAllergy" /></div>

                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4>ข้อมูลติดต่อ(บัตรประชาชน)</h4>
          <div class="row mb-3">
            <div class="col-md-4 mb-3">
              <label for="houseNo">บ้านเลขที่</label>
              <input type="text" id="houseNo" class="form-control" v-model="formData.houseNo" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="village">หมู่ที่</label>
              <input type="text" id="village" class="form-control" v-model="formData.village" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="subDistrict">ตำบล</label>
              <input type="text" id="subDistrict" class="form-control" v-model="formData.subDistrict" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="street">ถนน</label>
              <input type="text" id="street" class="form-control" v-model="formData.street" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="postalCode">รหัส</label>
              <input type="text" id="postalCode" class="form-control" v-model="formData.postalCode" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="country">ประเทศ</label>
              <select id="country" class="form-select" v-model="formData.country">
                <option value="TH">ไทย</option>
                <option value="CN">จีน</option>
              </select>
            </div>
          </div>
          <hr />
          <h4>ข้อมูลติดต่อ(ทะเบียนบ้าน)</h4>
          <div class="row mb-3">
            <div class="col-md-4 mb-3">
              <label for="houseRegNo">บ้านเลขที่</label>
              <input type="text" id="houseRegNo" class="form-control" v-model="formData.houseRegNo" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="villageReg">หมู่ที่</label>
              <input type="text" id="villageReg" class="form-control" v-model="formData.villageReg" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="subDistrictReg">ตำบล</label>
              <input type="text" id="subDistrictReg" class="form-control" v-model="formData.subDistrictReg" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="streetReg">ถนน</label>
              <input type="text" id="streetReg" class="form-control" v-model="formData.streetReg" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="postalCodeReg">รหัส</label>
              <input type="text" id="postalCodeReg" class="form-control" v-model="formData.postalCodeReg" />
            </div>
            <div class="col-md-4 mb-3">
              <label for="countryReg">ประเทศ</label>
              <select id="countryReg" class="form-select" v-model="formData.countryReg">
                <option value="TH">ไทย</option>
                <option value="CN">จีน</option>
              </select>
            </div>
          </div>
          <hr />
          <h4>ข้อมูลผู้ติดต่อ(ผู้ปกครอง/ญาติ)</h4>
          <div class="row mb-3">
            <div class="col-md-6 mb-3">
              <label for="contact1">ชื่อผู้ติดต่อที่ 1</label>
              <input type="text" id="contact1" class="form-control" v-model="formData.contact1" />
            </div>
            <div class="col-md-3 mb-3">
              <label for="phone1">เบอร์โทรศัพท์</label>
              <input type="text" id="phone1" class="form-control" v-model="formData.phone1" />
            </div>
            <div class="col-md-3 mb-3">
              <label for="relation1">สถานะ</label>
              <input type="text" id="relation1" class="form-control" v-model="formData.relation1" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 mb-3">
              <label for="contact2">ชื่อผู้ติดต่อที่ 2</label>
              <input type="text" id="contact2" class="form-control" v-model="formData.contact2" />
            </div>
            <div class="col-md-3 mb-3">
              <label for="phone2">เบอร์โทรศัพท์</label>
              <input type="text" id="phone2" class="form-control" v-model="formData.phone2" />
            </div>
            <div class="col-md-3 mb-3">
              <label for="relation2">สถานะ</label>
              <input type="text" id="relation2" class="form-control" v-model="formData.relation2" />
            </div>
          </div>
        </form>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>


<script>
import { doc, setDoc, collection, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
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
      formData: {
        profile: '',
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        age: '',
        idCard: '',
        religion: '',
        nationality: '',
        ethnicity: '',
        status: '',
        bloodType: '',
        rh: '',
        allergies: [],
        houseNo: '',
        village: '',
        subDistrict: '',
        street: '',
        postalCode: '',
        country: '',
        houseRegNo: '',
        villageReg: '',
        subDistrictReg: '',
        streetReg: '',
        postalCodeReg: '',
        countryReg: '',
        contact1: '',
        phone1: '',
        relation1: '',
        contact2: '',
        phone2: '',
        relation2: '',
        statuspt: 1
      },
      successMessage: ''
    };
  },
  methods: {
    async saveData() {
      const docId = `${this.formData.firstName}_${this.formData.lastName}_${Date.now()}`;
      const docRef = doc(collection(database, 'patients'), docId);
      await setDoc(docRef, this.formData);
      this.resetForm();
      this.successMessage = 'บันทึกสำเร็จ';
      this.$router.push('/Patient');
    },
    resetForm() {
      this.formData = {
        profile: '',
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        age: '',
        idCard: '',
        religion: '',
        nationality: '',
        ethnicity: '',
        status: '',
        bloodType: '',
        rh: '',
        allergies: [],
        houseNo: '',
        village: '',
        subDistrict: '',
        street: '',
        postalCode: '',
        country: '',
        houseRegNo: '',
        villageReg: '',
        subDistrictReg: '',
        streetReg: '',
        postalCodeReg: '',
        countryReg: '',
        contact1: '',
        phone1: '',
        relation1: '',
        contact2: '',
        phone2: '',
        relation2: '',
        statuspt: 1
      };
      this.successMessage = '';
    },
    async movePatientToServiced(patientId) {
      try {
        // Get the patient data from the 'patients' collection
        const patientDocRef = doc(database, 'patients', patientId);
        const patientDoc = await getDoc(patientDocRef);
        
        if (patientDoc.exists()) {
          const patientData = patientDoc.data();
          
          // Add the patient data to the 'servicedPatients' collection
          const servicedDocRef = doc(collection(database, 'servicedPatients'), patientId);
          await setDoc(servicedDocRef, { ...patientData, statuspt: 2 });

          // Delete the patient data from the 'patients' collection
          await deleteDoc(patientDocRef);
          
          // Optionally, update local state if necessary
          const index = this.patients.findIndex(patient => patient.id === patientId);
          if (index !== -1) {
            this.patients.splice(index, 1);
            this.deleteIconsVisible.splice(index, 1);
          }

          console.log("Patient moved to servicedPatients and deleted from patients");
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error moving patient to servicedPatients: ", error);
      }
    }
  }
}
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

img.img-fluid {
  width: 100%;
  height: auto;
}

.profile-img {
  max-width: 50%;
  height: auto;
}

.form-select,
.form-control {
  margin-bottom: 10px;
}

.d-flex {
  display: flex;
}

.flex-grow-1 {
  flex-grow: 1;
  overflow-y: auto;
}

.img-fluid {
  max-width: 100%;
  cursor: pointer;
}

.vh-100 {
  height: 100vh;
}
</style>
