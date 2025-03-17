<template>
  <div id="container-drop">
    <div id="dropDown-container">
      <div class="search-bar">
        <img
          src="../assets/images/search-svgrepo-com%20(1).svg"
          alt="search-logo"
          class="search-icon"
        />
        <input id="text-field" type="text" placeholder="Search for users..." />
        <button id="reset-button">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container-drop {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

#dropDown-container {
  position: relative;
  color: black;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 8px;
  background-color: #ffffff;
  width: 750px;
  max-width: 750px;
  min-width: 200px;
}

.search-bar input {
  border: none;
  padding: 10px;
  font-size: 16px;
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  min-width: 100px;
}

.search-icon {
  width: 30px;
  height: 25px;
  margin-right: 10px;
}

#reset-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #0b0b0b;
  cursor: pointer;
  margin-left: 10px;
}

#reset-button:hover {
  color: #333;
}
#suggestions-container {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 15px;
  width: 100%;
  font-size: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}

.suggestion {
  padding: 8px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #9f9a9a;
}

.no-result {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 15px;
  font-size: 20px;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
@media (max-width: 1300px) {
  .search-bar {
    padding: 5px;
    max-width: 500px;
  }

  .search-bar input {
    font-size: 16px;
  }

  .search-icon {
    width: 25px;
  }

  #reset-button {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .search-bar {
    padding: 5px;
    max-width: 100%;
  }

  .search-bar input {
    font-size: 16px;
  }

  .search-icon {
    width: 25px;
  }

  #reset-button {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    flex-wrap: nowrap;
    padding: 4px;
  }

  .search-bar input {
    font-size: 16px;
    width: 100%;
  }

  .search-icon {
    width: 20px;
    margin-right: 5px;
  }

  #reset-button {
    font-size: 14px;
    margin-left: 5px;
  }
}
</style>
