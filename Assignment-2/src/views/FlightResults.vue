<template>
    <!-- topbar -->
    <nav class="topbar">

      <!-- Logo -->
      <div class="logoText">Northwind Airlines</div>

      <!-- Centered Menu -->
      <div class="centered-menu">
        <a href="#" class="menu-item active">
          <img src="../icons/flight-blue.png" alt="Flights Icon" class="menu-icon" /> Flights
        </a>
        <a href="#" class="menu-item">
          <img src="../icons/passenger-dark.png" alt="Passenger Icon" class="menu-icon" /> Passenger
        </a>
        <a href="#" class="menu-item">
          <img src="../icons/Seats-dark.png" alt="Seats Icon" class="menu-icon" /> Seats
        </a>
        <a href="#" class="menu-item">
          <img src="../icons/payment-dark.png" alt="Payment Icon" class="menu-icon" /> Payment
        </a>
      </div>

      <!-- User Page Button -->
      <div class="user-section">
        <span class="user-name">LName FName</span>
        <button class="userPage-button">User Page</button>
      </div>
    </nav>
    
    <div class="flight-selection-bar">
      <!-- First Section: Single -->
      <div class="flight-type">Single</div>

      <!-- Second Section: Origin to destination with departure date -->
      <div class="flight-info">
        <div>{{ departure }} → {{ arrival }}</div>
        <div>{{ date }}</div>
      </div>

      <!-- Third Section: Change Button -->
      <div class="change-button">
        <div>Change</div>
      </div>

      <!-- Fourth Section: Dates and Prices -->
      <div class="date-price-section">
        <div v-for="(day, index) in nextDays" :key="index" class="date-price-item">
          <div>{{ day.date }}</div>
          <div>${{ day.price }}</div>
        </div>
      </div>

    </div>


    <div class="flight-filters-container">

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
  
      <!-- Class Section (use images as background) -->
      <div class="class-section">
        <div class="class-div economy">
          <span class="class-text">Economy</span>
        </div>
        <div class="class-div premium">
          <span class="class-text">Premium Eco</span>
        </div>
        <div class="class-div first">
          <span class="class-text">First / Business</span>
        </div>
      </div>
    </div>
      <!-- Flight List -->
      <div class="flight-list">
        <t-list :split="true">
          <t-list-item v-for="(flight, index) in flightResults" :key="index">
            <div class="flight-item">
              <div class="flight-information">
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
        ],
        nextDays: [
          { date: '9-29 Sun', price: 700 },
          { date: '9-30 Mon', price: 700 },
          { date: '10-1 Tue', price: 700 },
          { date: '10-2 Wed', price: 700 },
          { date: '10-3 Thu', price: 700 },
          { date: '10-4 Fri', price: 700 },
          { date: '10-5 Sat', price: 700 }
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
    display: flex;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.9rem;
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

  .menu-icon {
    width: 17px;
    height: 17px;
    margin-right: 8px;
  }

  .user-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-name {
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
    color: #283841;
    margin-right: 5px;
  }

  .userPage-button {
    padding: 8px 15px;
    font-size: 0.8rem;
    color: white;
    background-color: #3470c4;
    border: none;
    border-radius: 20px;
  }

  .userPage-button:hover {
    background-color: #285a9c;
  }

  .flight-selection-bar {
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to right, #468bc7, #2a5b94, #468bc7);
    align-items: center;
    padding: 10px 80px;
    height: 30px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); 
    margin-bottom: 15px;
}

  .flight-type {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    flex: 1;
    color: white;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 5px 5px;
    border-radius: 10px;
  }

  .flight-info {
    font-family: 'Poppins', sans-serif;
    color: rgba(255, 255, 255, 0.874);
    flex: 3;
    text-align: center;
    font-size: 1rem;
  }

  .flight-info div {
    font-size: 1rem;
  }

  .date-price-section {
    color: rgba(255, 255, 255, 0.874);
    display: flex;
    flex: 6;
    justify-content: space-around;
  }

  .date-price-item {
    text-align: center;
    font-size: 1rem;
    padding: 6px;
  }

  .change-button {
    font-family: 'Poppins', sans-serif;
    color: white;
    flex: 1;
    text-align: center;
    padding: 0 10px;
    margin-right: 35px; /* Increase space between change button and prices */
    font-size: 1rem;
  }

  .change-button div {
    border: 2px solid #a6bad5;
    color: white;
    padding: 5px 5px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
  }

  .change-button div:hover {
    background-color: rgba(255, 255, 255, 0.25); /* Lighter hover effect */
  }


  .flight-filters-container {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 10px 20px; 
    background-color: rgba(132, 132, 132, 0.3); 
    border-radius: 15px; 
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
    width: 90%;
    margin: 0 auto; 
  }


  /* Third bar*/
  .flight-filters {
    display: flex; 
    gap: 10px; 
  }

    /* flight filter button */
    .t-button {
    width: 160px;
    height: 30px;
    background-color: white;
    color: rgb(91, 91, 91);
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    width: 90px;
  }

  /* flight filter button: hover */
  .t-button:hover {
    background-color: #f5f5f5;
    border-color: #285a9c;
    color: #285a9c;
  }


  /* Class section buttons with background images */
  .class-section {
    display: flex;
    gap: 20px; /* Space between class items */
    align-items: center;
  }

  .class-div {
    width: 160px; /* Set width to control layout */
    height: 30px; /* Set height */
    display: flex;
    align-items: center;
    justify-content: flex-end; /* Text aligned to the right */
    padding-right: 10px; /* Padding for the text */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
    color: white;
    font-family: 'Poppins', sans-serif;
  }

  .economy {
    background-image: url('../icons/cabin-1.52ffc6e.png');
  }

  .premium {
    background-image: url('../icons/cabin-2.fbeb341.png');
  }

  .first {
    background-image: url('../icons/cabin-3.cbf205e.png');
  }

  .class-text {
    text-align: right;
    font-size: 0.9rem;
  }

  .flight-date {
    font-size: 1rem;
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
  