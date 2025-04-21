<template>
  <div class="container">
    <div class="tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'followers' }"
        @click="activeTab = 'followers'"
      >
        Followers
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'following' }"
        @click="activeTab = 'following'"
      >
        Following
      </div>
    </div>

    <!-- Followers List -->
    <div class="list" v-show="activeTab === 'followers'">
      <div class="user" v-for="(user, index) in displayedFollowers" :key="index">
        <img :src="user.img" alt="User" />
        <div class="info">
          <h4>{{ user.name }}</h4>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <div v-if="processedFollowers.length > 3 && !showAllFollowers">
        <button class="show-more-btn" @click="showAllFollowers = true">Show More</button>
      </div>
    </div>

    <!-- Following List -->
    <div class="list" v-show="activeTab === 'following'">
      <div class="user" v-for="(user, index) in displayedFollowing" :key="index">
        <img :src="user.img" alt="User" />
        <div class="info">
          <h4>{{ user.name }}</h4>
          <p>{{ user.email }}</p>
        </div>
      </div>

      <div v-if="processedFollowing.length > 3 && !showAllFollowing">
        <button class="show-more-btn" @click="showAllFollowing = true">Show More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const activeTab = ref('followers')
const showAllFollowers = ref(false)
const showAllFollowing = ref(false)

const processedFollowers = computed(() =>
  (props.user.followers || []).map((f, index) => ({
    name: f.name,
    email: f.email,
    img: `https://i.pravatar.cc/100?img=${index + 1}`,
  }))
)

const processedFollowing = computed(() =>
  (props.user.following || []).map((f, index) => ({
    name: f.name,
    email: f.email,
    img: `https://i.pravatar.cc/100?img=${index + 10}`,
  }))
)

const displayedFollowers = computed(() =>
  showAllFollowers.value
    ? processedFollowers.value
    : processedFollowers.value.slice(0, 3)
)

const displayedFollowing = computed(() =>
  showAllFollowing.value
    ? processedFollowing.value
    : processedFollowing.value.slice(0, 3)
)
</script>

<style scoped>
.container {
  margin: auto;
  width: 900px;
  max-width: 900px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
}

.tab {
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: #eee;
  border-bottom: 2px solid transparent;
  transition: background 0.3s;
}

.tab.active {
  background: #fff;
  border-bottom: 2px solid #007bff;
  color: #007bff;
}

.list {
  display: block;
}

.user {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.user img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.user .info h4 {
  margin: 0;
}

.user .info p {
  margin: 0;
  color: #555;
}

.show-more-btn {
  display: block;
  width: 100%;
  padding: 0.8rem;
  background: #007bff;
  color: white;
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

@media (max-width: 500px) {
  .user {
    flex-direction: column;
    align-items: flex-start;
  }

  .user img {
    margin-bottom: 0.5rem;
  }
}
</style>
