<template>
  <section class="Table">
    <div class="Table-Visit">
      <h3>Recently Visited</h3>
      <div class="Table-content">
        <div v-if="recentVisits && recentVisits.length > 0">
          <ul class="restaurant-list">
            <li
              v-for="visit in recentVisits"
              :key="visit.date + visit.name"
              class="restaurant-card"
            >
              <div class="restaurant-info">
                <p class="restaurant-name">{{ visit.name }}</p>
                <p class="visit-date">Date: {{ new Date(visit.date).toLocaleDateString() }}</p>
                <button class="more-button" @click="openModal(visit)">Details</button>
              </div>
            </li>
          </ul>
          <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
              <h3>{{ selectedVisit.name }}</h3>
              <p><strong>Rating:</strong> {{ selectedVisit.rating }} ★</p>
              <p><strong>Comment:</strong> {{ selectedVisit.comment || 'No comment' }}</p>
              <p><strong>Date:</strong> {{ new Date(selectedVisit.date).toLocaleDateString() }}</p>
              <button class="close-button" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
        <div v-else class="no-visits">
          <p1>You haven't visited any restaurants yet!</p1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.more-button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #f55702;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.more-button:hover {
  background-color: #a5a1a1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 25px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.close-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #9c9c9c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.close-button:hover {
  background-color: #383737;
}

.Table {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}
.Table-Visit {
  width: 1200px;
  padding: 20px;
  margin-top: 180px;
}
.Table-content {
  width: 100%;
  border-radius: 50px;
  background-color: #f3efef;
  border: 1px solid #f55702;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}
.restaurant-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}
.restaurant-name {
  font-size: 23px;
  font-weight: bold;
  color: #f55702;
}
.visit-rating,
.visit-comment,
.visit-date {
  font-size: 16px;
  color: #333;
}
.visit-comment {
  font-style: italic;
}
.no-visits {
  text-align: center;
  padding: 50px;
  width: 100%;
}
p1 {
  font-size: 40px;
  padding: 25px;
}
</style>
<script setup>
import { ref } from 'vue'

defineProps({
  recentVisits: {
    type: Array,
    required: true,
  },
})

const selectedVisit = ref(null)
const showModal = ref(false)

const openModal = (visit) => {
  console.log('Visit object:', visit)
  selectedVisit.value = visit
  showModal.value = true
}

const closeModal = () => {
  selectedVisit.value = null
  showModal.value = false
}
</script>
