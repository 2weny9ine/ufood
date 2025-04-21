<template>
  <section class="main">
    <div class="Home">
      <div class="wrapper">
        <img src="@/assets/images/background%20pic.png" alt="Background Image" class="image" />
        <div class="info">
          <div class="top-container">
            <div class="profile-picture">
              <img :src="gravatarUrl" alt="Gravatar" class="gravatar" />
            </div>

            <div class="name-rating">
              <p>{{ user.firstName }} {{ user.lastName }}</p>
              <span class="rating">
                <span v-for="star in Math.min(user.rating, 5)" :key="star">⭐</span>
              </span>
            </div>
          </div>

          <div class="stats-bar">
            <div class="stat" @click="$emit('open-followers')">
              <strong>{{ user.followers.length }}</strong>
              <span>Followers</span>
            </div>
            <div class="stat" @click="$emit('open-following')">
              <strong>{{ user.following.length }}</strong>
              <span>Following</span>
            </div>
          </div>

          <button
            v-if="currentUserId !== user.id"
            class="Follow"
            @click="isFollowing ? unfollowUser() : followUser()"
          >
            {{ isFollowing ? 'Unfollow' : 'Follow' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import md5 from 'md5'
import { computed, ref, onMounted, watch } from 'vue'
import Cookies from 'js-cookie'
import { fetchUserDetails, follow, unfollow } from '@/api/users'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  initials: String,
  email: {
    type: String,
    required: false,
    default: '',
  },
})

const gravatarUrl = computed(() =>
  props.email
    ? `https://www.gravatar.com/avatar/${md5(props.email.trim().toLowerCase())}?s=200&d=identicon`
    : '',
)

const isFollowing = ref(false)
const currentUserId = Cookies.get('userId')

const checkFollowingStatus = async () => {
  if (currentUserId !== props.user.id) {
    const currentUser = await fetchUserDetails(currentUserId)
    isFollowing.value = currentUser.following?.some((u) => u.id === props.user.id)
  }
}

onMounted(checkFollowingStatus)
watch(() => props.user.id, checkFollowingStatus)

const followUser = async () => {
  await follow(props.user.id)
  isFollowing.value = true
}

const unfollowUser = async () => {
  await unfollow(props.user.id)
  isFollowing.value = false
}
</script>

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
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  height: 400px;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  filter: brightness(90%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.info {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  color: #000;
  z-index: 2;
}

.top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 100px;
  border: solid 5px #f55702;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 1);
  overflow: hidden;
  z-index: 1;
}

.name-rating {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
}

.rating {
  color: #ffc107;
  font-size: 1.1rem;
}

.stats-bar {
  display: flex;
  gap: 40px;
  margin-top: 20px;
  justify-content: center;
  cursor: pointer;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #333;
}

.stat strong {
  font-size: 22px;
  color: #000;
}

.Follow {
  margin-top: 15px;
  background-color: #f55702;
  border-radius: 15px;
  padding: 10px 25px;
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
}

.Follow:hover {
  background-color: #c8c0c0;
  transition:
    background-color 0.3s ease,
    transform 0.2s;
}

@media (max-width: 960px) {
  .profile-picture {
    width: 140px;
    height: 140px;
  }

  .info {
    top: 85%;
    font-size: 20px;
  }

  .name-rating {
    font-size: 1rem;
  }

  .Follow {
    font-size: 1rem;
    padding: 8px 20px;
  }

  .stat strong {
    font-size: 18px;
  }

  .stat span {
    font-size: 14px;
  }
}
</style>
