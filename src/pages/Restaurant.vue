<template>
  <div class="restaurant-info">
    <div class="restaurant-header">
      <div class="image-container">
        <img
          src="../assets/Recipes_2400_Spicy-Pepperoni-Pizza.jpg"
          alt="Restaurant Image"
          class="restaurant-image"
        />
        <img src="../assets/Pizza-Pizza-Logo.png" alt="Restaurant logo" class="restaurant-logo" />
        <div class="logo-text-container">
          <div class="restaurant-details">
            <div class="name-category">
              <h2 class="restaurant-name">Pizza Pizza</h2>
              <p class="restaurant-category">
                <img src="../assets/food-restaurant-svgrepo-com.svg" height="15" /> Pizza
              </p>
            </div>
            <div class="contact-info">
              <p class="restaurant-location">
                <img src="../assets/location-pin-alt-1-svgrepo-com.svg" height="18" /> 2360 Ch
                Ste-Foy, Québec, QC G1V 1T1
              </p>
              <p class="separator">|</p>
              <p class="restaurant-phone">
                <img src="../assets/phone-rounded-svgrepo-com.svg" height="18" /> 418-874-1111
              </p>
              <p class="separator">|</p>
              <div class="rating">
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star">&#9733;</span>
                <span class="star-empty">&#9734;</span>
                <span class="rating-text">4.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="gallery-container">
      <img
        src="../assets/Screen-Shot-2020-06-30-at-9.24.59-AM.png"
        alt="Restaurant Gallery Image"
        class="gallery-image"
      />
    </div>

    <div class="opening-hours">
      <h3>Opening Hours</h3>
      <ul>
        <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
        <li>Saturday - Sunday: 12:00 PM - 11:00 PM</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.restaurant-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.restaurant-header {
  width: 100%;
  max-width: 950px;
  margin-bottom: 80px; /* Ensures space for gallery */
}

.image-container {
  position: relative;
  width: 100%;
  overflow: visible;
}

.restaurant-image {
  margin-top: 100px;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.restaurant-logo {
  position: absolute;
  bottom: -40px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 20%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  padding: 10px;
  z-index: 1;
}

.logo-text-container {
  position: absolute;
  bottom: -60px;
  left: 130px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.restaurant-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.name-category {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.restaurant-name {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.restaurant-category {
  font-size: 1em;
  color: #666;
  margin: 0;
}

.restaurant-location,
.restaurant-phone {
  font-size: 0.9em;
  color: #555;
  margin: 0;
}

.separator {
  font-size: 0.9em;
  color: #aaa;
  margin: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 3px;
}

.star {
  color: gold;
  font-size: 1em;
}

.star-empty {
  color: lightgray;
  font-size: 1em;
}

.rating-text {
  font-size: 0.9em;
  color: #333;
  font-weight: bold;
}

.gallery-container,
.opening-hours {
  margin-top: 20px;
}

.gallery-container {
  width: 80%;
  max-width: 900px;
}

.gallery-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.opening-hours {
  text-align: center;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.opening-hours h3 {
  font-size: 1.5em;
  color: #333;
}

.opening-hours ul {
  list-style-type: none;
  padding: 0;
}

.opening-hours li {
  font-size: 1em;
  color: #555;
  margin: 5px 0;
}
</style>
