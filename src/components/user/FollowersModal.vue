<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>Followers</h3>
      <ul v-if="followers.length > 0" class="user-list">
        <li v-for="user in followers" :key="user.id" class="user-item">
          <router-link :to="`/user/${user.id}`" class="link">
            {{ user.name }}
          </router-link>
        </li>
      </ul>
      <p v-else class="empty-message">No one is following you yet.</p>
      <button class="close-button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  followers: {
    type: Array,
    required: true,
  },
})
defineEmits(['close'])
</script>

<style scoped>
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
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 400px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}
h3 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 15px;
}
.user-list {
  list-style: none;
  padding: 0;
}
.user-item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.link {
  color: #f55702;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.empty-message {
  text-align: center;
  color: #777;
}
.close-button {
  margin-top: 15px;
  background-color: #9c9c9c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.close-button:hover {
  background-color: #383737;
}
</style>
