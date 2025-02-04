<template>
  <div class="Home">
    <div class="wrapper">
      <img src="../assets/background%20pic.png" alt="Background Image" class="image" />
      <div class="overlay">
        <h1>Welcome To your profile</h1>
        <img class="logo-main" src="../assets/Logo.png" alt="Logo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Home {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
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

.Home .overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
}
.wrapper {
  position: relative;
  margin-top: 0;
  padding-top: 0;
}

.Home .overlay h1 {
  font-size: 3em;
  color: white;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
.Home .overlay .logo-main {
  width: 350px;
}
</style>
