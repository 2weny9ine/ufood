<template>
  <section class="main">
    <div class="Home">
      <div class="wrapper">
        <img src="@/assets/images/background%20pic.png" alt="Background Image" class="image" />
        <div class="info">
          <div class="info-item">
            <div class="info-item-part1">
              <div class="info-item-part1-2">
                <div class="info-item-part1-2-3">
                  <p>{{ user.firstName }} {{ user.lastName }}</p>
                  <span class="rating">
                    <span v-for="star in Math.min(user.rating, 5)" :key="star">⭐</span>
                  </span>
                </div>
              </div>
              <button class="Follow">Follow</button>
            </div>
          </div>
          <div class="profile-picture">
            <img :src="gravatarUrl" alt="Gravatar" class="gravatar" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.gravatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
}
.wrapper {
  position: relative;
}
.image {
  margin-top: 100px;
  width: 1200px;
  border-radius: 20px;
  height: 400px;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  filter: brightness(90%);
}
.info {
  font-size: 25px;
  padding-left: 300px;
}
.info-item-part1 {
  display: flex;
  justify-content: space-between;
}
.info-item-part1-2-3 {
  display: flex;
  align-items: center;
  gap: 10px;
}
.rating {
  font-size: 20px;
}
.Follow {
  margin-top: 10px;
  background-color: #f55702;
  border-radius: 15px;
  width: 150px;
  height: 50px;
  color: white;
  font-size: 25px;
  border: none;
  cursor: pointer;
}
.Follow:hover {
  background-color: #c8c0c0;
  transition:
    background-color 0.3s ease,
    transform 0.2s;
}
.profile-picture {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 100px;
  border: solid 5px #f55702;
  position: absolute;
  top: 70%;
  right: 76%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
}
.profile-picture h2 {
  text-align: center;
  font-size: 80px;
  color: #f55702;
}
</style>
<script setup>
import md5 from 'md5'
import Cookies from 'js-cookie'
import { computed } from 'vue'

const email = Cookies.get('userEmail')
const gravatarUrl = computed(() =>
  email
    ? `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=200&d=identicon`
    : '',
)
defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>
