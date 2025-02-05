<template>
  <div class="User">
    <section class="main">
      <div class="Home">
        <div class="wrapper">
          <img src="../assets/background%20pic.png" alt="Background Image" class="image" />
          <div class="overlay">
            <h1>Welcome To your profile</h1>
            <img class="logo-main" src="../assets/Logo.png" alt="Logo" />
          </div>
          <div class="profile-picture">
            <h2>IB</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="Table">
      <div class="Table-Visit">
        <h3>Recently Visited</h3>
        <div class="Table-content">
          <div class="restaurant-content">
            <div class="content-each-restaurant">
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p1>Pizza Pizza</p1>
                    <p2>Visits: 1</p2>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>4.0 &#11088;</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p1>Pizza Pizza</p1>
                    <p2>Visits: 1</p2>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>4.0 &#11088;</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p1>Pizza Pizza</p1>
                    <p2>Visits: 1</p2>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>4.0 &#11088;</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p1>Pizza Pizza</p1>
                    <p2>Visits: 1</p2>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>4.0 &#11088;</p3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Table-favourits">
        <h3>Favourits</h3>
        <div class="Table-content">
          <div class="restaurant-content">
            <div class="content-each-restaurant">
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p4>Pizza Pizza</p4>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>❤️</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p4>Pizza Pizza</p4>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>❤️</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p4>Pizza Pizza</p4>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>❤️</p3>
                </div>
              </div>
              <div class="restaurant-item">
                <div class="restaurant-item-part1">
                  <img src="../assets/Pizza-Pizza-Logo.png" alt="Pizza Pizza" />
                  <div class="restaurant-item-part1-2">
                    <p4>Pizza Pizza</p4>
                  </div>
                </div>
                <div class="restaurant-item-part2">
                  <p3>❤️</p3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.User {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main {
  width: 100%;
  display: block;
}
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: 750px;
  padding-top: 30px;
  margin-top: 0;
}

.image {
  width: 1200px;
  border-radius: 50px;
  height: 550px;
  object-fit: cover;
  object-position: right;
  z-index: -1;
  filter: brightness(90%);
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
}
.wrapper {
  position: relative;
}

.overlay h1 {
  font-size: 3em;
  color: white;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
.overlay .logo-main {
  width: 350px;
}
.profile-picture {
  width: 200px;
  height: 230px;
  background-color: #ffffff;
  border-radius: 50px;
  position: absolute;
  top: 75%;
  right: 76%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 1);
}
.profile-picture h2 {
  text-align: center;
  margin-top: 40%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 80px;
  color: #f55702;
}
.Table {
  display: flex;
  gap: 180px;
  width: 100%;
  justify-content: center;
}
.Table-content {
  width: 750px;
}
.content-each-restaurant {
  width: 100%;
  height: 100%;
  background-color: #e3dede;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.restaurant-content img {
  width: 70px;
  height: 90px;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-left: 15px;
  margin-top: 22px;
}
h3 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 50px;
  color: #0b0b0b;
}
.restaurant-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.restaurant-item-part1 {
  display: flex;
}
.restaurant-item-part1-2 {
  display: flex;
  flex-direction: column;
  margin: 25px;
  padding: 20px;
}
.restaurant-item-part1-2 p1 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 25px;
}
.restaurant-item-part1-2 p2 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  color: grey;
  font-weight: bold;
}
.restaurant-item-part1-2 p4 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 25px;
  padding: 13px;
}
.restaurant-item-part2 p3 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 35px;
  width: 250px;
  margin: 25px;
  padding: 20px;
  justify-content: center;
  align-content: center;
}

.restaurant-item-part2 {
  align-content: center;
  justify-content: center;
  margin-right: 0;
}

.table-favourits .restaurant-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-favourits .restaurant-item-part1 {
  display: flex;
  align-items: center;
}

.table-favourits .restaurant-item-part2 {
  align-content: center;
  justify-content: center;
  margin-right: 0;
}

.table-favourits .restaurant-item-part1 img {
  width: 70px;
  height: 90px;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-left: 15px;
  margin-top: 22px;
}

.table-favourits .restaurant-item-part2 p3 {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  font-size: 35px;
  width: 250px;
  margin: 25px;
  padding: 20px;
  justify-content: center;
  align-content: center;
}
</style>
<script setup lang="ts"></script>
