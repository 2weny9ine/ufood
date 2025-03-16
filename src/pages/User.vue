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
                    <span class="visit-date"
                      >Date: {{ new Date(visit.date).toLocaleDateString() }}</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-visits">
            <p1>You haven't visited any restaurants yet!</p1>
            <div class="btn">
              <router-link to="/Home">⬅️ Home Page</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userData from '@/assets/user.json'

const user = ref({ firstName: '', lastName: '', followers: 0, following: 0, rating: 0 })
const recentVisits = ref([])

onMounted(() => {
  user.value = userData

  const visits = JSON.parse(localStorage.getItem('recentVisits') || '[]')
  recentVisits.value = visits.sort((a, b) => new Date(b.date) - new Date(a.date)) // Trier par date décroissante
})

const getInitials = () => {
  return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`.toUpperCase()
}
</script>
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
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
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
  padding: 100px;
  gap: 30px;
  width: 850px;
}

p1 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 40px;
  padding: 25px;
  padding-bottom: 250px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: #f55702;
  border-radius: 25px;
  margin: 20px auto;
  margin-top: 50px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.btn a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 25px;
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
  align-items: flex-start;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  text-align: left;
  padding: 15px;
  height: 100%;
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
.visit-rating,
.visit-comment,
.visit-date {
  font-size: 16px;
  color: #333;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.visit-comment {
  font-style: italic;
}
.restaurant-info {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
@media (max-width: 1200px) {
  .image {
    width: 100%;
    height: auto;
  }

  .info {
    padding-left: 20px;
  }

  .profile-picture {
    right: 50%;
    transform: translateX(50%);
  }

  .image {
    width: 100%;
    height: auto;
  }
  .profile-picture {
    right: 50%;
    transform: translateX(50%);
  }
  .Table {
    gap: 50px;
  }
}

@media (max-width: 768px) {
  .overlay h1 {
    font-size: 2em;
  }

  .overlay .logo-main {
    width: 250px;
  }

  .profile-picture {
    width: 150px;
    height: 180px;
    top: 60%;
  }

  .profile-picture h2 {
    font-size: 60px;
    margin-top: 30%;
  }

  .info {
    font-size: 20px;
  }

  .Follow {
    width: 120px;
    height: 75px;
    font-size: 20px;
  }

  h3 {
    font-size: 40px;
  }

  p1 {
    font-size: 30px;
  }

  .restaurant-card {
    width: 200px;
    height: 150px;
  }

  .restaurant-name {
    font-size: 20px;
  }

  .visit-count {
    font-size: 18px;
  }

  .info-item-part1-2-3 {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .Table-Visit {
    padding: 10px;
  }
  .restaurant-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .restaurant-card {
    width: 90%;
    padding: 10px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .overlay h1 {
    font-size: 1.5em;
  }

  .overlay .logo-main {
    width: 200px;
  }

  .profile-picture {
    width: 120px;
    height: 150px;
    top: 50%;
  }

  .profile-picture h2 {
    font-size: 50px;
    margin-top: 25%;
  }

  .info {
    font-size: 18px;
  }

  .Follow {
    width: 100px;
    height: 60px;
    font-size: 18px;
  }

  h3 {
    font-size: 30px;
  }

  p1 {
    font-size: 25px;
  }

  .restaurant-card {
    width: 150px;
    height: 120px;
  }

  .restaurant-name {
    font-size: 18px;
  }

  .visit-count {
    font-size: 16px;
  }
  .info-item-part1-2-3 {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .Table-Visit h3 {
    font-size: 1.2em;
    text-align: center;
  }
  .restaurant-card {
    width: 100%;
  }
  .btn {
    text-align: center;
  }
}
</style>
