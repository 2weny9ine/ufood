<template>
  <div class="modal-overlay">
    <div class="visit-modal">
      <h2>Register Your Visit</h2>
      <p>
        <strong>{{ restaurant?.name }}</strong>
      </p>
      <div class="visit-infos">
        <div>
          <label for="visit-date">Date:</label>
          <input
            type="date"
            id="visit-date"
            :value="date"
            @input="$emit('update:date', $event.target.value)"
            required
          />
        </div>
        <div>
          <label for="visit-rating">Rating:</label>
          <select
            id="visit-rating"
            :value="rating"
            @change="$emit('update:rating', Number($event.target.value))"
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ★</option>
          </select>
        </div>
        <div>
          <label for="visit-comment">Comment:</label>
        </div>
        <textarea
          id="visit-comment"
          :value="comment"
          @input="$emit('update:comment', $event.target.value)"
          placeholder="Write a comment..."
        ></textarea>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="success" class="success-message">Visit recorded successfully!</p>
      <div class="modal-buttons">
        <button class="submit-visit" @click="$emit('submit')">Submit</button>
        <button class="close-modal" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['restaurant', 'date', 'rating', 'comment', 'success', 'error'])
defineEmits(['submit', 'close', 'update:date', 'update:rating', 'update:comment'])
</script>

<style scoped>
.modal-overlay {
  font-family: Arial, Helvetica, sans-serif;
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

.visit-modal {
  background: white;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  text-align: center;
}

.visit-infos {
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.visit-infos div {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
}

.visit-infos label {
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
}

.visit-infos input {
  width: 100px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.visit-infos select {
  width: 60px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.visit-infos textarea {
  width: 95%;
  min-height: 70px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.visit-modal h2 {
  margin-bottom: 10px;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.submit-visit {
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.submit-visit:hover {
  background-color: #cc5200;
}

.close-modal {
  background-color: #9c9c9c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.close-modal:hover {
  background-color: #383737;
}

.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
