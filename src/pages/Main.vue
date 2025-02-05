<template>
  <div class="Home">
    <div class="wrapper">
      <img src="../assets/background%20pic.png" alt="Background Image" class="image" />
      <div class="overlay">
        <div class="logo">
          <img src="../assets/Logo.png" alt="logo" />
        </div>
        <h1>Discover Flavor, Share the Love!</h1>
        <h2>Find & Share Your Favorite Restaurants!</h2>
        <div class="Buttons">
          <button class="Explore">Explore</button>
          <button class="Start">Get Started →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Home {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  overflow: hidden;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
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
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  margin-bottom: 10px;
}

.overlay h2 {
  font-size: 2em;
  color: white;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  margin-bottom: 20px;
}

.Buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.Explore,
.Start {
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
}

.Explore {
  color: #f55702;
}

.Start {
  background-color: #f55702;
}

.Explore:hover,
.Start:hover {
  opacity: 0.8;
}
</style>
