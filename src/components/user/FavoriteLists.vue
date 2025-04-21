<template>
  <section class="Table">
    <div class="Table-Favorites">
      <h3>Favorite Lists</h3>
      <button v-if="!readonly" class="create-list-button" @click="$emit('open-create-modal')">
        Create New List
      </button>

      <div class="Table-content">
        <div v-if="favoriteLists.length > 0">
          <ul class="favorite-list">
            <li v-for="list in favoriteLists" :key="list.id" class="favorite-card">
              <div class="favorite-info">
                <input
                  v-model="list.name"
                  @blur="$emit('update-name', list)"
                  class="list-name-input"
                  :disabled="editingListId !== list.id"
                />
                <div class="favorite-actions">
                  <button v-if="!readonly" @click="$emit('toggle-edit', list.id)">Edit Name</button>
                  <button v-if="!readonly" @click="$emit('open-add-modal', list.id)">
                    Add Restaurant
                  </button>
                  <button v-if="!readonly" @click="$emit('delete-list', list.id)">Delete</button>
                </div>
              </div>
              <ul class="restaurant-list">
                <li
                  v-for="restaurant in list.restaurants"
                  :key="restaurant.id"
                  class="restaurant-card"
                >
                  <div class="restaurant-info">
                    <p>
                      <router-link :to="`/Restaurant/${restaurant.id}`" class="restaurant-link">
                        <strong>{{ restaurant.name }}</strong>
                      </router-link>
                      | Rating: {{ (restaurant.rating || 0).toFixed(1) }} ★
                      <button
                        v-if="!readonly"
                        class="remove-button"
                        @click="$emit('remove-restaurant', list.id, restaurant.id)"
                      >
                        Remove
                      </button>
                    </p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div v-else class="no-favorites">
          <p1>You haven't created any favorite lists yet!</p1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.Table-Favorites {
  width: 1200px;
  padding: 20px;
}
.create-list-button {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}
.create-list-button:hover {
  background-color: #a5a1a1;
}
.favorite-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.favorite-card {
  border: 1px solid #f55702;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
.favorite-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.list-name-input {
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 50%;
}
.favorite-actions {
  display: flex;
  gap: 10px;
}
.favorite-actions button {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.favorite-actions button:hover {
  background-color: #a5a1a1;
}
.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.remove-button:hover {
  background-color: #c82333;
}
.no-favorites {
  text-align: center;
  padding: 50px;
  width: 100%;
}
p1 {
  font-size: 40px;
  padding: 25px;
}

@media (max-width: 1200px) {
  .Table-Favorites {
    width: 95%;
    padding: 10px;
  }

  .favorite-card {
    padding: 10px;
  }

  .list-name-input {
    width: 100%;
    font-size: 16px;
  }

  .favorite-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .restaurant-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .restaurant-link {
    font-size: 16px;
  }

  .remove-button {
    margin-top: 5px;
    margin-left: 0;
  }
}
</style>
<script setup>
defineProps({
  favoriteLists: {
    type: Array,
    required: true,
  },
  editingListId: {
    type: String,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

defineEmits([
  'open-create-modal',
  'update-name',
  'toggle-edit',
  'open-add-modal',
  'delete-list',
  'remove-restaurant',
])
</script>
