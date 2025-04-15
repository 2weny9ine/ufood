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
                <p>
                  <span class="restaurant-name">{{ visit.name }}</span>
                </p>
                <p>
                  <span class="visit-rating">Rating: {{ visit.rating }} ★</span>
                </p>
                <p>
                  <span class="visit-comment">{{ visit.comment || 'No comment' }}</span>
                </p>
                <p>
                  <span class="visit-date">
                    Date: {{ new Date(visit.date).toLocaleDateString() }}
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no-visits">
          <p1>You haven't visited any restaurants yet!</p1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.Table {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}
.Table-Visit {
  width: 1200px;
  padding: 20px;
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
  text-align: left;
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
defineProps({
  recentVisits: {
    type: Array,
    required: true,
  },
})
</script>
