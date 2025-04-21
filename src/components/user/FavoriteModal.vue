<template>
  <div class="modal-overlay">
    <div class="favorite-modal">
      <h2>Create New Favorite List</h2>
      <div class="favorite-infos">
        <label for="new-list-name">List Name:</label>
        <input
          id="new-list-name"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="Enter list name"
        />
      </div>
      <p v-if="createListSuccess" class="success-message">List created successfully!</p>
      <div class="modal-buttons">
        <button class="submit-favorite" @click="$emit('create')" :disabled="!modelValue">
          Create
        </button>
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
.favorite-infos input {
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
  modelValue: String,
  createListSuccess: Boolean,
})
defineEmits(['create', 'close', 'update:modelValue'])
</script>
