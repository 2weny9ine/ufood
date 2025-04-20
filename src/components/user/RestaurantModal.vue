<template>
  <div class="modal-overlay">
    <div class="favorite-modal">
      <h2>Add Restaurant to List</h2>
      <div class="favorite-infos">
        <label for="restaurant-select">Select Restaurant:</label>
        <select
          id="restaurant-select"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
        >
          <option value="" disabled>Select a restaurant</option>
          <option v-for="restaurant in allRestaurants" :key="restaurant.id" :value="restaurant.id">
            {{ restaurant.name }}
          </option>
        </select>
      </div>
      <p v-if="addSuccess" class="success-message">Restaurant added successfully!</p>
      <div class="modal-buttons">
        <button class="submit-favorite" @click="$emit('add')" :disabled="!modelValue">Add</button>
        <button class="close-modal" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

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
.favorite-modal {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
}
.favorite-modal h2 {
  font-size: 24px;
  margin-bottom: 15px;
}
.favorite-infos {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.favorite-infos label {
  font-weight: bold;
  margin-bottom: 5px;
}
.favorite-infos select {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.submit-favorite {
  background-color: #f55702;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
}
.submit-favorite:hover {
  background-color: #a5a1a1;
}
.close-modal {
  background-color: #9c9c9c;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
}
.close-modal:hover {
  background-color: #383737;
}
.success-message {
  color: green;
  margin-top: 10px;
  font-size: 16px;
}
</style>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  addSuccess: Boolean,
  allRestaurants: {
    type: Array,
    required: true,
  },
})

defineEmits(['add', 'close', 'update:modelValue'])
</script>
