<template>
  <nav>
    <ul>
      <li>
        <router-link to="/Home">Home</router-link>
      </li>
      <li>
        <router-link to="/restaurant">Restaurant</router-link>
      </li>
      <li>
        <router-link to="/user">User Profile</router-link>
      </li>
    </ul>
  </nav>
</template>

<style>
nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
}
nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
}
nav a:hover {
  color: #f4b4b4;
}
</style>
