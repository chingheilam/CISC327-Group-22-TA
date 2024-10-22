<template>
    <!-- topbar -->
    <nav class="topbar">

      <!-- Logo -->
      <div class="logoText">Northwind Airlines</div>

      <!-- Centered Menu -->
      <div class="centered-menu">
        <a href="#" class="menu-item active">Flights</a>
        <a href="#" class="menu-item">Passenger</a>
        <a href="#" class="menu-item">Seats</a>
        <a href="#" class="menu-item">Payment</a>
      </div>

      <!-- User Page Button -->
      <div class="user-section">
          <span class="user-name">LName FName</span>
          <button class="userPage-button">User Page</button>
      </div>
    </nav>
  
    <div class="flight-results-container">
      <!-- Top Bar with selected flight details -->
      <div class="flight-header">
        <div class="flight-type">Single</div>
        <div class="flight-route">{{ departure }} → {{ arrival }}</div>
        <t-button class="change-button">Change</t-button>
        <div class="flight-date">{{ date }}</div>
      </div>
  
      <!-- Filters and Classes -->
      <div class="flight-filters">
        <t-space>
          <t-button>Direct</t-button>
          <t-button>Departure</t-button>
          <t-button>Landing</t-button>
          <t-button>More</t-button>
          <t-button>Price</t-button>
        </t-space>
      </div>
  
      <!-- Economy/Premium Eco/First Class Switcher -->
      <div class="class-switcher">
        <t-space>
          <t-button>Economy</t-button>
          <t-button>Premium Eco</t-button>
          <t-button>First / Business</t-button>
        </t-space>
      </div>
  
      <!-- Flight List -->
      <div class="flight-list">
        <t-list :split="true">
          <t-list-item v-for="(flight, index) in flightResults" :key="index">
            <div class="flight-item">
              <div class="flight-info">
                <p>{{ flight.time }}</p>
                <p>{{ flight.flightNumber }} | {{ flight.aircraft }}</p>
                <p>{{ flight.duration }}</p>
              </div>
              <div class="flight-detail">
                <p>{{ flight.priceEconomy }}</p>
                <p>{{ flight.pricePremium }}</p>
                <p>{{ flight.priceFirst }}</p>
              </div>
              <t-button>Flight Detail</t-button>
            </div>
          </t-list-item>
        </t-list>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        departure: this.$route.query.departure || 'Toronto (YYZ)',
        arrival: this.$route.query.arrival || 'Vancouver (YVR)',
        date: this.$route.query.date || '30 Sep 2024',
        flightResults: [
          { time: '07:00', flightNumber: 'NAN9527', aircraft: 'AirBus333(Wide)', duration: 'Direct | Total Time: 5h', priceEconomy: '$828', pricePremium: '$1100', priceFirst: '$2800' },
          { time: '07:00', flightNumber: 'NAN007', aircraft: 'AirBus333(Wide)', duration: 'Direct | Total Time: 5h 13min', priceEconomy: '$920', pricePremium: '$1100', priceFirst: '$2800' },
          { time: '07:35', flightNumber: 'NAN4713', aircraft: 'Boeing 773', duration: 'Direct | Total Time: 5h 09min', priceEconomy: '$815', pricePremium: '$1100', priceFirst: '$2800' },
          { time: '07:40', flightNumber: 'NAN061', aircraft: 'AirBus333(Wide)', duration: 'Direct | Total Time: 5h 10min', priceEconomy: '$854', pricePremium: '$1100', priceFirst: '$2800' },
          { time: '08:00', flightNumber: 'NAN9527', aircraft: 'AirBus333(Wide)', duration: 'Direct | Total Time: 4h 59min', priceEconomy: '$900', pricePremium: '$1100', priceFirst: '$2800' },
          { time: '08:25', flightNumber: 'NAN9527', aircraft: 'AirBus333(Wide)', duration: 'Direct | Total Time: 4h 53min', priceEconomy: '$950', pricePremium: '$1300', priceFirst: '$3000' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* General Styles */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  /* Topbar */
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e8f0f2; /* Light background */
    padding: 10px 40px;
    height: 60px; /* Set height */

  }
  
  .logoText {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.88vw;
    color: #283841;
  }

  .centered-menu {
    display: flex;
    justify-content: center;
    gap: 40px
  }

  .menu-item {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: grey;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .menu-item:hover {
    color: #3470c4;
  }

  .menu-item.active {
    color: #285a9c;
    font-weight: bold;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-name {
    font-size: 1rem;
    color: #283841;
    margin-right: 5px;
  }

  .userPage-button {
    padding: 8px 15px;
    font-size: 1rem;
    color: white;
    background-color: #3470c4;
    border: none;
    border-radius: 20px;
  }

  .userPage-button:hover {
    background-color: #285a9c;
  }

  /* Flight Results Container */
  .flight-results-container {
    padding: 20px;
  }
  
  .flight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  
  .flight-type {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .flight-route {
    font-size: 1.5rem;
  }
  
  .change-button {
    background-color: #3470c4;
    color: white;
  }
  
  .flight-date {
    font-size: 1rem;
  }
  
  .flight-filters, .class-switcher {
    margin: 20px 0;
  }
  
  /* Flight List */
  .flight-list {
    width: 100%;
  }
  
  .flight-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .flight-info {
    width: 60%;
  }
  
  .flight-detail {
    width: 30%;
    display: flex;
    justify-content: space-between;
  }
  </style>
  