<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
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
  font-family: 'Optima', sans-serif;
  font-size: 15px;
}
nav a:hover {
  text-decoration: underline;
  color: #a5a1a1;
}
</style>
