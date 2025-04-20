<template>
  <section class="similar-restaurants">
    <h2>Restaurants Similaires</h2>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else-if="restaurants.length === 0" class="no-results">
      Aucun restaurant similaire trouvé.
    </div>
    <div v-else class="restaurants-grid">
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
        @open-visit-modal="$emit('open-visit-modal', restaurant)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchSimilarRestaurants } from '@/api/restaurants'
import RestaurantCard from '@/components/home/RestaurantCard.vue'

const props = defineProps({
  genres: {
    type: Array,
    default: () => [],
  },
  currentRestaurantId: {
    type: String,
    required: true,
  },
})

const restaurants = ref([])
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    restaurants.value = await fetchSimilarRestaurants(
      props.genres,
      null,
      props.currentRestaurantId,
      50,
    )
  } catch {
    errorMessage.value = 'Impossible de charger les restaurants similaires.'
  } finally {
    loading.value = false
  }
})

defineEmits(['open-visit-modal'])
</script>

<style scoped>
.similar-restaurants {
  margin: 20px auto;
  max-width: 1200px;
  padding: 0 20px;
  font-family: Arial, Helvetica, sans-serif;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.restaurants-grid {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.restaurants-grid > * {
  flex: 0 0 auto;
  width: 300px;
  scroll-snap-align: start;
}

.restaurants-grid::-webkit-scrollbar {
  height: 8px;
}

.restaurants-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.restaurants-grid::-webkit-scrollbar-thumb {
  background: #cc5200;
  border-radius: 4px;
}

.restaurants-grid::-webkit-scrollbar-thumb:hover {
  background: #e1650d;
}

.loading,
.error,
.no-results {
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin: 20px 0;
}
</style>
