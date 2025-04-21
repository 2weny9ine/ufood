<template>
  <section class="Table">
    <div class="Table-Visit">
      <h3>Following</h3>
      <div class="Table-content scrollable">
        <ul v-if="following.length > 0" class="following-list">
          <li v-for="user in following" :key="user.id" class="following-item">
            <router-link :to="`/user/${user.id}`" class="link">
              {{ user.name }}
            </router-link>
          </li>
        </ul>
        <div v-else class="no-following">You are not following anyone yet.</div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  following: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.Table {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}

.Table-Visit {
  width: 1200px;
  padding: 40px;
  margin-top: 100px;
}
.Table-content {
  width: 100%;
  border-radius: 50px;
  background-color: #f3efef;
  border: 1px solid #f55702;
  padding: 30px;
  box-sizing: border-box;
}

.Table-content::-webkit-scrollbar {
  width: 8px;
}
.Table-content::-webkit-scrollbar-thumb {
  background-color: #f55702;
  border-radius: 5px;
}

.following-list {
  list-style: none;
  padding: 0 10px 0 10px;
  margin: 0;
  max-height: 180px;
  overflow-y: auto;
}
.following-item {
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: left;
  padding-left: 10px;
}

.following-list::-webkit-scrollbar {
  width: 6px;
}

.following-list::-webkit-scrollbar-thumb {
  background-color: #f55702;
  border-radius: 5px;
}

.following-item {
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.link {
  text-decoration: none;
  color: #f55702;
}

.link:hover {
  text-decoration: underline;
}

.no-following {
  font-size: 18px;
  color: #777;
  text-align: left;
}
</style>
