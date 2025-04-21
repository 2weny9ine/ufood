<template>
  <section class="filter-sidebar">
    <h3>Search a Restaurant</h3>
    <SearchBarRestaurant
      class="search-bar"
      @select-restaurant="$emit('select-restaurant', $event)"
    />

    <h3>
      Filters
      <button class="clear-button" @click="$emit('clear-filters')">Clear All</button>
    </h3>

    <div class="filter-section">
      <p class="filter-title">Sort</p>
      <div class="filter-options">
        <label>
          <input
            type="radio"
            value="name"
            :checked="sortBy === 'name'"
            @change="$emit('update:sortBy', 'name')"
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            value="price_range"
            :checked="sortBy === 'price_range'"
            @change="$emit('update:sortBy', 'price_range')"
          />
          Price
        </label>
        <label>
          <input
            type="radio"
            value="rating"
            :checked="sortBy === 'rating'"
            @change="$emit('update:sortBy', 'rating')"
          />
          Rating
        </label>
      </div>
      <div class="filter-options">
        <label>
          <input
            type="radio"
            value="asc"
            :checked="sortOrder === 'asc'"
            @change="$emit('update:sortOrder', 'asc')"
          />
          Ascending
        </label>
        <label>
          <input
            type="radio"
            value="desc"
            :checked="sortOrder === 'desc'"
            @change="$emit('update:sortOrder', 'desc')"
          />
          Descending
        </label>
      </div>
    </div>

    <div class="filter-section">
      <p class="filter-title">Genres</p>
      <div class="filter-options">
        <label v-for="genre in genresList" :key="genre">
          <input
            type="checkbox"
            :id="`genre-${genre}`"
            :value="genre"
            :checked="genres.includes(genre)"
            @change="$emit('update:genres', toggleCheckbox(genres, $event.target.value))"
          />
          {{ genre }}
        </label>
      </div>
    </div>

    <div class="filter-section">
      <p class="filter-title">Price Range</p>
      <div class="filter-options">
        <label v-for="p in 5" :key="p">
          <input
            type="radio"
            :id="`price-${p}`"
            :value="p"
            :checked="price === p"
            @change="$emit('update:price', Number($event.target.value))"
          />
          {{ '$'.repeat(p) }}
        </label>
      </div>
    </div>

    <div class="filter-section">
      <p class="filter-title">Rating</p>
      <div class="filter-options">
        <label v-for="r in 5" :key="r">
          <input
            type="radio"
            :id="`rating-${r}`"
            :value="r"
            :checked="rating === r"
            @change="$emit('update:rating', Number($event.target.value))"
          />
          {{ '★'.repeat(r) }}
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
import SearchBarRestaurant from './SearchBarRestaurant.vue'

defineProps({
  genres: { type: Array, default: () => [] },
  price: { type: [Number, String], default: '' },
  rating: { type: [Number, String], default: '' },
  sortBy: { type: String, default: '' },
  sortOrder: { type: String, default: 'asc' },
  genresList: { type: Array, required: true },
})

defineEmits([
  'clear-filters',
  'select-restaurant',
  'update:genres',
  'update:price',
  'update:rating',
  'update:sortBy',
  'update:sortOrder',
])

function toggleCheckbox(list, value) {
  const copy = [...list]
  const index = copy.indexOf(value)
  if (index >= 0) {
    copy.splice(index, 1)
  } else {
    copy.push(value)
  }
  return copy
}
</script>

<style scoped>
.filter-sidebar {
  padding: 5px 20px;
  margin-right: 50px;
  height: fit-content;
  width: 250px;
  max-width: 500px;
  position: sticky;
  background: rgba(232, 232, 232, 0.33);
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.filter-sidebar h3 {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.filter-sidebar label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-title {
  font-weight: bold;
}

.clear-button {
  background: none;
  border: none;
  color: #f55702;
  font-size: 0.8em;
  cursor: pointer;
  margin-left: 10px;
}

.clear-button:hover {
  text-decoration: underline;
}

.search-bar {
  margin-top: 5px;
  margin-bottom: 20px;
  width: 90%;
  display: block;
}

@media (max-width: 920px) {
  .filter-sidebar {
    position: relative;
    width: 100%;
    z-index: 10;
    background: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
}
</style>
