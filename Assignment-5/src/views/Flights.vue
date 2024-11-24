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
      <t-list :split="false">
        <t-list-item v-for="(flight, index) in flightResults" :key="index">
          <div class="flight-item">
            <div class="flight-information">
              <!-- Updated to format departure_time without seconds -->
              <p>{{ formatTime(flight.departure_time) }}</p>
              <p>{{ flight.flight_number }} | {{ flight.aircraft }}</p>
              <p>{{ flight.duration }}</p>
              <t-button>Flight Detail</t-button>
            </div>
            
            <div class="flight-detail">
              <p>${{ Math.floor(flight.price_economy) }}</p>
              <p>${{ Math.floor(flight.price_premium) }}</p>
              <p>${{ Math.floor(flight.price_first) }}</p>
            </div>
          
          </div>
        </t-list-item>
      </t-list>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  import dayjs from 'dayjs';

  export default {
    data() {
      return {
        departure: this.$route.query.departure || 'Toronto (YYZ)',
        arrival: this.$route.query.arrival || 'Vancouver (YVR)',
        date: this.$route.query.date || '2024-09-30',
        flightResults: [],
        nextDays: []
      };
    },
    methods: {
      async fetchFlights() {
        // Fetch flights for the user-selected departure date
        const query = `?departure=${encodeURIComponent(this.departure)}&arrival=${encodeURIComponent(this.arrival)}&date=${encodeURIComponent(this.date)}`;
        
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/flights/${query}`);
          console.log("Fetched flight data:", response.data);
          if (Array.isArray(response.data)) {
            this.flightResults = response.data; // Assign the flights array directly if data is an array
          } else if (response.data.flights) {
            this.flightResults = response.data.flights; // If data has flights inside, use that
          }
        } catch (error) {
          console.error("Error fetching flight data:", error);
        }

        // Fetch data for the next 6 days
        this.fetchNextDaysData();
      },

      async fetchNextDaysData() {
        const startDate = dayjs(this.date);
        let nextDaysData = [];

        for (let i = 0; i < 7; i++) {
          const currentDay = startDate.add(i, 'day');
          const formattedDate = currentDay.format('MM-DD ddd'); // Use 'MM-DD ddd' for UI display
          const queryDate = currentDay.format('YYYY-MM-DD'); // Use 'YYYY-MM-DD' for query
          const query = `?departure=${encodeURIComponent(this.departure)}&arrival=${encodeURIComponent(this.arrival)}&date=${encodeURIComponent(queryDate)}`;

          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/flights/${query}`);
            console.log(`Fetched flight data for ${queryDate}:`, response.data);

            let averagePrice = 'N/A';

            if (Array.isArray(response.data) && response.data.length > 0) {
              // Calculate the average economy price for the current day
              const total = response.data.reduce((sum, flight) => sum + parseFloat(flight.price_economy), 0);
              averagePrice = parseInt(total / response.data.length);

            }

            // Add the next day data to the nextDays array
            nextDaysData.push({
              date: formattedDate,
              price: averagePrice
            });

          } catch (error) {
            console.error(`Error fetching flight data for ${queryDate}:`, error);
            nextDaysData.push({
              date: formattedDate,
              price: 'N/A'
            });
          }
        }

        // Update the nextDays data in the component state after all the requests have completed
        this.nextDays = nextDaysData;
      },

      formatTime(time) {
        // Format time to remove seconds (HH:MM)
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
      }
    },
    mounted() {
      // Fetch flight data when the component is mounted
      this.fetchFlights();
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
    position: fixed;
    top:0 ;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e8f0f2; /* Light background */
    padding: 10px 10px;
    height: 60px; /* Set height */

  }
  
  .logoText {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.88vw;
    color: #283841;
    padding-left: 30px;
  }

  .centered-menu {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-grow: 2;
    margin-left: 20%;
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
    padding-right: 20px;
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
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to right, #468bc7, #2a5b94, #468bc7);
    align-items: center;
    padding: 15px 80px;
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
    margin-top: 10px;
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 10px 20px; 
    background-color: rgba(132, 132, 132, 0.3); 
    border-radius: 15px; 
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
    max-width: 1130px;
    margin: 0 auto; 
    z-index: 1;
    position: relative;
  }


  /* Third bar*/
  .flight-filters {
    display: flex; 
    gap: 10px; 
    z-index: 0;
    position: relative;
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
    z-index:0;
  }

  /* flight filter button: hover */
  .t-button:hover {
    background-color: #f5f5f5;
    border-color: darkgrey;
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
    max-width: 1200px; 
    margin: 0 auto; 
    margin-top: 5px ;
  }
  
  .flight-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 0px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    align-items: center; 
  }

  .flight-information {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .flight-information p {
    margin: 3px 0;
  }

  .flight-information p:first-child {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .flight-information p:nth-child(2) {
    font-size: 1rem;
    color: #666;
  }

  .flight-information p:nth-child(3) {
    font-size: 1rem;
    color: #666;
  }
  
  .flight-detail {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    color: #b11111;
  }

  .flight-detail p {
    font-weight: bold;
    color: #b11111;
    min-width: 100px; /* Set minimum width for price items to align columns */
    text-align: right;
    margin-right: 55px;
    margin-left: -20px;
  }

  .flight-detail-button {
    margin-right: 15px;
    background-color: transparent;
    color: #285a9c;
    border: 1px solid #285a9c;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .flight-detail-button:hover {
      background-color: #737373;
      color: white;
  }
  </style>
  