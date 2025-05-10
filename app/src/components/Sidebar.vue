<template>
  <div :class="['dashboard', 'd-flex', { 'sidebar-collapsed': isCollapsed }]">
    <div class="d-flex flex-column vh-100 sidebar">
      <div class="text-center py-3">
        <img src="https://i.pinimg.com/736x/66/e9/3f/66e93fcceb7947d2812af638028a84bc.jpg" alt="Horizon OS" class="img-fluid" @click="isCollapsed = !isCollapsed" />
      </div>
      <ul class="nav flex-column nav-pills flex-grow-1">
        <li v-for="(item, index) in menuItems" :key="index" class="nav-item">
          <a class="nav-link d-flex justify-content-between align-items-center" @click="toggleMenu(index)" role="button" :aria-expanded="item.active" :aria-controls="'menu' + index">
            <span class="d-flex align-items-center">
              <i :class="item.icon"></i>
              <span v-if="!isCollapsed" class="ms-2">{{ item.label }}</span>
            </span>
            <i v-if="!isCollapsed" :class="item.active ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
          </a>
          <ul :class="['collapse', 'list-unstyled', 'ps-4', { show: item.active }]" :id="'menu' + index">
            <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
              <a class="nav-link d-flex align-items-center" :href="subItem.href">
                <i :class="['sub-icon', subItem.icon]"></i>
                <span class="ms-2">{{ subItem.label }}</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-gear-fill"></i>
            <span v-if="!isCollapsed" class="ms-2">ห้องฉุกเฉิน</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-file-earmark-person"></i>
            <span v-if="!isCollapsed" class="ms-2">ผู้ป่วยใน(IPD)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-capsule"></i>
            <span v-if="!isCollapsed" class="ms-2">เภสัชกรรม(Rx)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-hospital"></i>
            <span v-if="!isCollapsed" class="ms-2">ห้องปฏิบัติการ(LAB)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-radioactive"></i>
            <span v-if="!isCollapsed" class="ms-2">รังสีวิทยา(XRAY)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#">
            <i class="bi bi-currency-dollar"></i>
            <span v-if="!isCollapsed" class="ms-2">การเงินและบัญชี</span>
          </a>
        </li>
      </ul>
      <div class="mt-auto p-3 text-center">
        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ebcc6051-ce4d-443a-9d2c-32a41046cfc7/db8nd2v-29bb53b9-381e-4276-a54c-4763cce7da5f.png/v1/fill/w_894,h_894,q_70,strp/superman_icon_profile_pic_by_thejklay_db8nd2v-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2ViY2M2MDUxLWNlNGQtNDQzYS05ZDJjLTMyYTQxMDQ2Y2ZjN1wvZGI4bmQydi0yOWJiNTNiOS0zODFlLTQyNzYtYTU0Yy00NzYzY2NlN2RhNWYucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ykrlG3LId0GyHKQEEUDTSTXDwfgfSctm7U9Lt9qGjJo" alt="Profile" class="rounded-circle" width="40" height="40" />
        <div v-if="!isCollapsed">
          <div class="text">Jirapad J.</div>
          <div class="text">teet5897@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      menuItems: [
        {
          label: "เวชระเบียน",
          icon: "bi bi-house-door",
          active: false,
          subItems: [
            { label: "ลงทะเบียนผู้ป่วย", icon: "bi bi-plus-circle", href: "/register" },
            { label: "Chart audits", icon: "bi bi-check-square", href: "#" },
            { label: "บันทึกการส่งตรวจ", icon: "bi bi-floppy", href: "#" },
            { label: "ทะเบียน Refer", icon: "bi bi-r-square-fill", href: "#" },
            { label: "ตรวจสอบสิทธิ", icon: "bi bi-card-checklist", href: "#" },
            { label: "บันทึกผลการวินิจฉัย", icon: "bi bi-floppy", href: "#" },
            { label: "บันทึกยืนยันเวชระเบียน", icon: "bi bi-floppy", href: "#" }
          ]
        },
        {
          label: "ผู้ป่วยนอก(OPD)",
          icon: "bi bi-person-lines-fill",
          active: false,
          subItems: [
            { label: "ระบบคัดกรองผู้ป่วย", href: "/Patient" },
            { label: "บันทึกการนัดผู้ป่วย", href: "#" },
            { label: "แฟ้มผู้ป่วยนอก", href: "#" }
          ]
        },
        {
          label: "Physician Workplace",
          icon: "bi bi-house",
          active: false,
          subItems: [{ label: "Workspace", href: "/assessment" }]
        },
        {
          label: "ธุรการ",
          icon: "bi bi-house",
          active: false,
          subItems: [
            { label: "คลังยาและเวชภัณฑ์", href: "#" },
            { label: "ครุภัณฑ์ทางการแพทย์", href: "#" },
            { label: "จัดซื้อจัดจ้าง", href: "#" }
          ]
        }
      ]
    };
  },
  methods: {
    toggleMenu(index) {
      this.menuItems[index].active = !this.menuItems[index].active;
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #000000;
  border-right: 1px solid #f3e8e8;
  width: 250px;
  height: 100vh;
  padding: 10px;
  overflow-y: auto;
  transition: width 0.3s ease;
}

.sidebar-collapsed .sidebar {
  width: 80px;
}

.sidebar .nav-pills .nav-link {
  color: #ffffff; /* เปลี่ยนสีข้อความเป็นสีขาว */
}

.sidebar .nav-pills .nav-link i {
  color: #f9ecec; /* เปลี่ยนสีไอคอนเป็นสีขาว */
}

.sidebar .nav-pills .nav-link.active {
  background-color: #ccccd5;
  border-radius: 0;
  color: #000000; /* เปลี่ยนสีข้อความเป็นสีดำเมื่อ active */
}

.sidebar .nav-link:hover {
  background-color: #e9ecef;
  color: #000000; /* เปลี่ยนสีข้อความเป็นสีดำเมื่อ hover */
}

.sidebar .nav-item .collapse .nav-link {
  padding-left: 1rem;
}

.img-fluid {
  max-width: 80%;
  cursor: pointer;
}

.rounded-circle {
  border: 2px solid #fafafa;
}

.text {
  color: rgb(240, 240, 244);
}


.nav-link i {
  font-size: 1rem;
}

</style>
