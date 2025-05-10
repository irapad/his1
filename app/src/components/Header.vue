<template>
    <header>
      <nav>
        <div class="menu">
          <div class="logo">
            <h5>Hospital Information System</h5>
          </div>
          <div class="taga">
            <a href="/home"><i class="fas fa-home"></i> Home</a> 
            <a href="/orders"><i class="fas fa-info-circle"></i> Orders</a> 
            <a href="#"><i class="fas fa-concierge-bell"></i> Services</a> 
            <a href="#"><i class="fas fa-bell"></i> Notify</a> 
            <a href="/"><i class="fas fa-envelope"></i> Logout</a>
          </div>
          <div class="search-container">
            <input type="text" placeholder="Search..">
            <button type="submit"><i class="bi bi-search"></i></button>
          </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  }
  </script>
  

  <style scoped>
  header {
  background-color: #000000; /* เปลี่ยนสีพื้นหลังเป็นสีดำ */
  color: white;
  padding: 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* เพิ่มเงา */
  position: sticky; /* ทำให้ header ติดอยู่ด้านบน */
  top: 0;
  z-index: 1000; /* ทำให้ header อยู่ด้านบนสุด */
}




.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1200px; กำหนดความกว้างสูงสุด */
  /* margin: 0 auto; จัดกลาง */
  /* padding: 0 10px; ลด padding */
}

.logo {
  flex: 1;
  text-align: left; /* จัดตำแหน่งโลโก้ให้อยู่ด้านซ้าย */
  margin-left: 2%;
}

.logo h5 {
  color: white;
  text-decoration: none;
  font-size: 1.2em; /* ขนาดตัวอักษรเล็กลง */
  font-family: 'Arial', sans-serif;
  margin: 0; /* ลบ margin เพื่อให้ตำแหน่งถูกต้อง */
}

.taga {
  flex: 3;
  display: flex;
  justify-content: flex-end; /* จัดเมนูให้อยู่ติดกับช่องค้นหา */
  align-items: center;
  gap: 10px; /* ลดระยะห่างระหว่างลิงก์ */
  margin-left: 10%;
}

.taga a {
  color: white;
  text-decoration: none;
  font-size: 0.9em; /* ขนาดตัวอักษรเล็กลง */
  transition: color 0.3s ease; /* เพิ่ม transition */
  margin-right: 2%;
}

.taga a:hover {
  color: #ddd; /* เปลี่ยนสีลิงก์เมื่อ hover */
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: flex-end; /* จัดตำแหน่งให้ติดกับด้านขวา */
  align-items: center;
  background-color: white; /* พื้นหลังสีขาว */
  border-radius: 15px; /* มุมโค้งมน */
  padding: 4px ;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* เพิ่มเงา */
  margin-right: 1%;
}

.search-container input {
  border: none; /* ไม่มีขอบ */
  outline: none; /* ไม่มีเส้นขอบเมื่อ focus */
  padding: 4px;
  border-radius: 15px;
  flex: 1; /* ขยายเต็มพื้นที่ */
  font-size: 0.9em; /* ขนาดตัวอักษรเล็กลง */
  
}

.search-container button {
  border: none;
  background: none; /* ไม่มีพื้นหลัง */
  color: #4CAF50; /* เปลี่ยนสีไอคอน */
  cursor: pointer; /* เปลี่ยนเป็นรูปมือเมื่อ hover */
  margin-left: 8px; /* ลดระยะห่างระหว่างปุ่มและ input */
}

.search-container button:hover {
  color: #45a049; /* เปลี่ยนสีไอคอนเมื่อ hover */
}
</style>
  