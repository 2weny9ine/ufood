<template>
  <div class="Main">
    <img src="../assets/background%20pic.png" alt="Background Image" class="image" />
    <div class="overlay">
      <div class="logo">
        <img src="../assets/Logo.png" alt="logo" />
      </div>
      <h1>Discover Flavor, Share the Love!</h1>
      <h2>Find & Share Your Favorite Restaurants!</h2>
      <div class="Buttons">
        <a href="#restaurants-section" class="Explore">Explore</a>
        <button class="Start">Get Started →</button>
      </div>
    </div>
  </div>

  <section id="restaurants-section">
    <h1 class="restaurants-label">Restaurants</h1>

    <div class="inline-container">
      <section class="filter-sidebar">
        <h3>Filters</h3>
        <label><input type="checkbox" name="filter" value="Pizza" /> Pizza</label>
        <label><input type="checkbox" name="filter" value="Burgers" /> Burgers</label>
        <label><input type="checkbox" name="filter" value="Sushi" /> Sushi</label>
        <label><input type="checkbox" name="filter" value="Desserts" /> Desserts</label>
        <button class="apply-filters">Apply Filters</button>
      </section>

      <section class="restaurants">
        <div class="Table">
          <div class="restaurant-card">
            <div class="banner-container">
              <img
                src="../assets/Recipes_2400_Spicy-Pepperoni-Pizza.jpg"
                alt="Pizza Pizza"
                class="restaurant-banner"
              />
              <div class="banner-overlay">
                <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
              </div>
            </div>
            <div class="inline-container-restaurant">
              <h3>Pizza Pizza</h3>
              <a href="#" class="details">Details →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.Main {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: brightness(90%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.logo img {
  width: 200px;
  height: auto;
}

.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0px;
}

.overlay h2 {
  font-size: 1.5em;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 40px;
}

.Buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.Explore,
.Start {
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
}

.Explore {
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  color: #f55702;
  text-decoration: none;
  background-color: white;
  display: inline-block;
}

.Start {
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background-color: #f55702;
}

.Explore:hover,
.Start:hover {
  opacity: 0.8;
}

.restaurants-label {
  margin-top: 30px;
  text-align: center;
}

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

.restaurant-card {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: fit-content;
  max-width: 400px;
  max-height: 300px;
  overflow: hidden;
}
.restaurant-banner {
  position: relative;
  width: 100%;
  height: 150px;
  filter: brightness(0.8);
  z-index: 0;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  max-width: 100%;
}

.inline-container,
.inline-container-restaurant {
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  width: 100%;
}
.inline-container-restaurant {
  align-items: center;
  justify-content: space-between;
}

.banner-container {
  position: relative;
  height: 150px;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.banner-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.banner-overlay img {
  width: 150px;
  height: auto;
}

h3 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #0b0b0b;
  text-align: left;
}

.details {
  margin-right: 20px;
  color: #ff6600;
  text-decoration: none;
  font-weight: bold;
  text-align: right;
}

.nav-links a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}

.filter-sidebar {
  padding: 20px;
  margin-right: 20px;
  height: fit-content;
  width: 200px;
  max-width: 500px;
  max-height: 300px;
  position: sticky;
  background: rgba(90, 74, 74, 0.33);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 80px;
}

.filter-sidebar h3 {
  margin-bottom: 10px;
}

.filter-sidebar label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
}

.filter-sidebar input {
  margin-right: 8px;
}

.apply-filters {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background: orange;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
<script setup lang="ts"></script>
