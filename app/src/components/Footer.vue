<!-- components/Footer.vue -->
<template>
  <footer class="text-center text-lg-start">
    <div class="text-center p-3">
      © 2024 Developed by 10bit:
      <a class="text-light" href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.dataforthai.com/company/0115558023430/&ved=2ahUKEwjInKzy7uSGAxW4wjgGHdiJCY4QFnoECC4QAQ&usg=AOvVaw2IqU0SxVc3btqF0ofWQMhP">บริษัท 10 บิต เดเวลอปเมนต์ จํากัด</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
footer {
  background-color: #000000; /* เปลี่ยนสีพื้นหลัง */
  color: #ffffff; /* เปลี่ยนสีตัวอักษร */
  padding: 1px; /* เพิ่ม padding */
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1); /* เพิ่มเงา */
  
  width: 100%; /* ทำให้ footer ครอบคลุมความกว้างของหน้าจอ */
  bottom: 0; /* ตำแหน่งล่างสุด */
}

footer a {
  color: #ffffff; /* เปลี่ยนสีลิงก์ */
}

footer a:hover {
  color: #ddd; /* เปลี่ยนสีลิงก์เมื่อ hover */
}
</style>
