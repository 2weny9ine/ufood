<template>
  <section class="restaurants">
    <div class="Table">
      <Card
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
        @visit="$emit('visit', restaurant)"
      />
    </div>
  </section>
</template>

<script setup>
import Card from './RestaurantCard.vue'
defineProps(['restaurants'])
defineEmits(['visit'])
</script>

<style scoped>
.restaurants {
  gap: 180px;
  width: 50%;
  justify-content: center;
}

.Table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1600px) and (min-width: 1200px) {
  .Table {
    grid-template-columns: repeat(2, 1fr);
  }

  .restaurants {
    width: 50%;
  }
}

@media (max-width: 1199px) and (min-width: 768px) {
  .Table {
    grid-template-columns: repeat(2, 1fr);
  }

  .restaurants {
    width: 70%;
  }
}

@media (max-width: 1100px) and (min-width: 920px) {
  .Table {
    grid-template-columns: 1fr;
  }

  .restaurants {
    width: 100%;
  }
}

@media (max-width: 919px) {
  .restaurants {
    width: 100%;
  }

  .Table {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
