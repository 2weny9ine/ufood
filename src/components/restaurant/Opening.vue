<template>
  <div class="opening-hours">
    <h3>Opening Hours</h3>
    <ul>
      <li v-for="(hours, day) in openingHours" :key="day">{{ day }}: {{ hours || 'Closed' }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ openingHours: Object })
</script>
<style scoped>
.opening-hours {
  margin-top: 20px;
  align-items: center;
  text-align: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.opening-hours h3 {
  font-size: 1.5em;
  color: #333;
}

.opening-hours ul {
  list-style-type: none;
  padding: 0;
}

.opening-hours li {
  font-size: 1em;
  color: #555;
  margin: 5px 0;
}

@media (max-width: 900px) {
  .opening-hours {
    width: 90%;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .opening-hours {
    width: 95%;
    font-size: 0.8rem;
  }
}
</style>
