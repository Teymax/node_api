<template>
  <div class="home-wrapper">
    <div class="container home-container">
      <div class="img-container">
        <img src="../assets/logo.svg" class="logo-img">
        <h1 class="company-name">AptoTrac</h1>
      </div>

      <div class="tabs-container">
        <div class="tabs-row">

          <div class="tab-item">
            <img src="../assets/home/vehicle-icon.svg" class="tab-icon" alt="Car image">
            <router-link :to="'/vehicle-delivery'" class="tab-title">Vehicle Delivery</router-link>
          </div>

          <div class="tab-item">
            <img src="../assets/home/inventory-icon.svg" class="tab-icon" alt="Car image">
            <h2 class="tab-title">Inventory Reports</h2>
          </div>

          <div class="tab-item">
            <img src="../assets/home/locator-icon.svg" class="tab-icon" alt="Car image">
            <h2 class="tab-title">Lot # Locator</h2>
          </div>
        </div>
        
        <div class="tabs-row">

          <div class="tab-item coming-soon">
            <img src="../assets/home/capacity-icon.svg" class="tab-icon" alt="Car image">
            <img src="../assets/home/coming-soon.svg" class="img-coming-soon" alt="">
            <h2 class="tab-title">Capacity Analytics</h2>
          </div>

          <div class="tab-item coming-soon">
            <img src="../assets/home/loader-icon.svg" class="tab-icon" alt="Car image">
            <img src="../assets/home/coming-soon.svg" class="img-coming-soon" alt="">
            <h2 class="tab-title">Loader Analytics</h2>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss">
@import "../css/variables";
@import "../css/common.scss";

.page-header {
  background-color: none;
}

.home-container {
  padding-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}

.home-container {
  .img-container {
    display: flex;
    flex-direction: column;
  }

  .company-name {
    color: $text-primary;
  }

  .tabs-container {
    display: flex;
    flex-direction: column;
    margin-top: 7rem;
    width: 100%;
  }
  
  .tabs-row {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .tab-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    width: calc((100% - 0.5rem) / 3); 
    max-width: 420px;
    border: 1px solid $bg-primary;
    border-radius: 5px;
    height: 11rem;
  }

  .tab-item:last-child {
    margin-right: 0;
  }

  .img-coming-soon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .tab-icon {
    margin-bottom: .8rem;
  }

  .tab-title {
    color: $text-primary;
    font-weight: bold;
    font-size: 1.6rem;
    text-align: center;
  }

  .tab-item.coming-soon .tab-title {
    color: $text-secondary;
  }

  .tab-title:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: 768px) {
  .home-container {
    .tabs-row {
      flex-direction: column;
    }

    .tab-item {
      max-width: initial;
      width: 100%;
    }

    .tabs-row {
      margin-bottom: 0;
    }

    .tab-item {
      margin-bottom: 1rem;
    }
  }
}
</style>

