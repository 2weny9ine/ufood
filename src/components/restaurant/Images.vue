<template>
  <div class="gallery-wrapper">
    <h2 class="gallery-title">Gallery</h2>
    <div class="gallery-container">
      <div class="gallery" ref="gallery">
        <img v-for="(image, i) in pictures" :key="i" :src="image" />
      </div>
      <button class="btn prev" @click="moveSlide(-1)">❮</button>
      <button class="btn next" @click="moveSlide(1)">❯</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ pictures: Array })
const gallery = ref(null)
let index = 0

const moveSlide = (direction) => {
  const total = props.pictures?.length || 0
  if (!gallery.value || total === 0) return

  const width = gallery.value.clientWidth
  index += direction
  if (index >= total) index = 0
  if (index < 0) index = total - 1

  gallery.value.style.transform = `translateX(${-index * width}px)`
  gallery.value.style.transition = 'transform 0.5s ease-in-out'
}
</script>

<style scoped>
.gallery-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.gallery-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
.gallery-container {
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.gallery {
  display: flex;
  transition: transform 0.9s ease-in-out;
  width: 800px;
  height: 400px;
}

.gallery img {
  width: 800px;
  height: 400px;
  object-fit: cover;
  flex: 0 0 auto;
  display: block;
}

.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 900px) {
  .gallery-container {
    width: 100%;
    height: auto;
  }

  .gallery img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 480px) {
  .gallery-container {
    height: auto;
  }

  .gallery img {
    width: 100%;
    height: auto;
  }
}
</style>
