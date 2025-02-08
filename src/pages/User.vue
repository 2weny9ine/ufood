<template>
  <div class="User">
    <section class="main">
      <div class="Home">
        <div class="wrapper">
          <img src="../assets/images/background%20pic.png" alt="Background Image" class="image" />
          <div class="overlay">
            <h1>Welcome To your profile</h1>
            <img class="logo-main" src="../assets/images/Logo.png" alt="Logo" />
          </div>
          <div class="info">
            <div class="info-item">
              <div class="info-item-part1">
                <div class="info-item-part1-2">
                  <div class="info-item-part1-2-3">
                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                    <span class="rating">
                      <span v-for="star in user.rating" :key="star">&#11088;</span>
                    </span>
                  </div>
                  <div class="info-item-part2">
                    <p6>{{ user.followers }} Follower</p6>
                    <p6>{{ user.following }} Following</p6>
                  </div>
                </div>
                <button class="Follow">Follow</button>
              </div>
            </div>
            <div class="profile-picture">
              <h2>{{ getInitials() }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="Table">
      <div class="Table-Visit">
        <h3>Recently Visited</h3>
        <div class="Table-content">
          <div v-if="recentVisits.length > 0">
            <ul class="restaurant-list">
              <li v-for="visit in recentVisits" :key="visit.name" class="restaurant-card">
                <div class="restaurant-info">
                  <p>
                    <span class="restaurant-name">{{ visit.name }}</span>
                  </p>
                  <p>
                    <span class="visit-count">Visits: {{ visit.visits }}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-visits">
            <p>You haven't visited any restaurants yet!</p>
            <div class="btn">
              <router-link to="/Home">⬅️ Home Page</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.info {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 25px;
  padding-left: 300px;
}
.info-item-part1-2 {
  padding: 0;
  margin: 0;
}
.info-item-part1-2-3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.info-item-part1 {
  display: flex;
  justify-content: space-between;
}
.info-item-part2 {
  display: flex;
  gap: 30px;
}
.Follow {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  background-color: #f55702;
  border-radius: 15px;
  width: 150px;
  height: 95px;
  color: white;
  font-size: 25px;
}
.Follow:hover {
  background-color: #c8c0c0;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s;
}
p {
  align-content: center;
  justify-content: center;
  font-weight: bold;
}
.rating {
  font-size: 20px;
}
.User {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.main {
  width: 100%;
  display: block;
}
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: 750px;
  padding-top: 30px;
  margin-top: 0;
}

.image {
  width: 1200px;
  border-radius: 50px;
  height: 550px;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  filter: brightness(90%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
}
.wrapper {
  position: relative;
}

.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
.overlay .logo-main {
  width: 350px;
}
.profile-picture {
  width: 200px;
  height: 230px;
  background-color: #ffffff;
  border-radius: 50px;
  position: absolute;
  top: 70%;
  right: 76%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
}
.profile-picture h2 {
  text-align: center;
  margin-top: 40%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 80px;
  color: #f55702;
}
.Table {
  display: flex;
  gap: 180px;
  width: 100%;
  justify-content: center;
}

h3 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 50px;
  color: #0b0b0b;
}

.restaurant-item-part1-2 p1 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 25px;
}
.restaurant-item-part1-2 p2 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  color: grey;
  font-weight: bold;
}
.restaurant-item-part1-2 p4 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 25px;
  padding: 13px;
}
.restaurant-item-part2 p3 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 35px;
  width: 250px;
  margin: 25px;
  padding: 20px;
  justify-content: center;
  align-content: center;
}
.Table-content {
  justify-content: center;
  width: 1200px;
  text-align: center;
  border-radius: 50px;
  height: 550px;
  object-fit: cover;
  object-position: right;
  background-color: #f3efef;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid #f55702;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 35px;
}

.no-visits {
  text-align: center;
}

p1 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 35px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: #f55702;
  border-radius: 25px;
  margin: 20px auto;
}

.btn a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.btn:hover {
  background-color: #a5a1a1;
}

ul li {
  margin: 10px 0;
}

ul li p {
  font-weight: bold;
}
.restaurant-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: center;
  height: 200px;
}

.restaurant-name {
  font-size: 23px;
  font-weight: bold;
  color: #f55702;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.visit-count {
  font-size: 20px;
  color: grey;
  font-weight: normal;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.restaurant-info {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.restaurant-list {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userData from '@/assets/user.json'

const user = ref({ firstName: '', lastName: '', followers: 0, following: 0, rating: 0 })
const recentVisits = ref([])

onMounted(() => {
  user.value = userData
  recentVisits.value = JSON.parse(localStorage.getItem('recentVisits') || '[]')
})

const getInitials = () => {
  return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase()
}
</script>
