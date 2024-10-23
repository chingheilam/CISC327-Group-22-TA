<template>
    <!-- topbar -->
    <nav class="topbar">
        <div class="logoText">Northwind Airlines</div>
        
        <!-- Centered Menu -->
        <div class="centered-menu">
            <a href="#" class="menu-item active">Home</a>
            <a href="#" class="menu-item">About</a>
            <a href="#" class="menu-item">Hotels & Villas</a>
            <a href="#" class="menu-item">Flights</a>
        </div>

        <button class="userPage-button">User Page</button>
    </nav>

    <div class="search-container">
        <h1>Book Flights With Us</h1>
        <div class="search-box">
            <t-form @submit="FlightSearch">
                <t-space>
                    <!-- First Column: From -->
                    <t-form-item label="From">
                        <t-dropdown :options="originOptions" trigger="click" @click="selectOrigin">
                            <t-button variant="text">
                                {{ departure || 'Input Origin' }}
                                <template #suffix><t-icon name="chevron-down" size="16" /></template>
                            </t-button>
                        </t-dropdown>
                    </t-form-item>

                    <!-- Second Column: To -->
                    <t-form-item label="To">
                        <t-dropdown :options="destinationOptions" trigger="click" @click="selectDestination">
                            <t-button variant="text">
                                {{ arrival || 'Input Destination' }}
                                <template #suffix><t-icon name="chevron-down" size="16" /></template>
                            </t-button>
                        </t-dropdown>
                    </t-form-item>

                    <!-- Divider in between Second Column and Third Column -->
                    <t-divider layout="vertical" />

                    <!-- Third Column: Departure Date -->
                    <t-form-item label="Departure Date">
                        <t-date-picker v-model="date" placeholder="Choose Dates" />
                    </t-form-item>

                    <!-- Fourth Column: Search Button -->
                    <div class="button-container" style="text-align: right;">
                        <t-button type="submit" theme="primary" class="search-button">Search</t-button>
                    </div>
                </t-space>
            </t-form>
        </div>

        <!-- Row of Action Buttons -->
        <div class="action-buttons">
            <div class="action-button-container">
                <t-button class="action-button">
                    <img src="../icons/Reschedule.png" alt="Reschedule Icon" class="action-icon" />
                    <span>Reschedule</span>
                </t-button>
                <t-divider layout="vertical" />

                <t-button class="action-button">
                    <img src="../icons/Upgrade.png" alt="Upgrade Icon" class="action-icon" />
                    <span>Upgrade Class</span>
                </t-button>
                <t-divider layout="vertical" />

                <t-button class="action-button">
                    <img src="../icons/Cancel.png" alt="Refund Icon" class="action-icon" />
                    <span>Refund Ticket</span>
                </t-button>
                <t-divider layout="vertical" />

                <t-button class="action-button">
                    <img src="../icons/Check-in.png" alt="Check-in Icon" class="action-icon" />
                    <span>Check-in</span>
                </t-button>
            </div>
        </div>
    </div>
</template>


<script>
import { MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            departure: '',
            arrival: '',
            date: '',
            originOptions: [
                { content: 'Toronto (YYZ)', value: 'YYZ' },
                { content: 'New York (JFK)', value: 'JFK' },
                { content: 'Los Angeles (LAX)', value: 'LAX' },
                { content: 'Chicago (ORD)', value: 'ORD' },
            ],
            destinationOptions: [
                { content: 'Vancouver (YVR)', value: 'YVR' },
                { content: 'London (LHR)', value: 'LHR' },
                { content: 'Paris (CDG)', value: 'CDG' },
                { content: 'Tokyo (HND)', value: 'HND' },
            ],
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        FlightSearch() {

            // Verify that the departure, arrival, and date values are being captured correctly
            console.log("Departure:", this.departure);
            console.log("Arrival:", this.arrival);
            console.log("Date:", this.date);

            if (!this.departure || !this.arrival || !this.date) {
            MessagePlugin.warning('Please fill in all fields before searching.');
            return;
            }
            
            // Navigate to the flight results page with the search criteria
            this.$router.push({
                name: 'FlightResults',
                query: {
                    departure: this.departure,
                    arrival: this.arrival,
                    date: this.date,
                },
            });
        },
        selectOrigin(data) {
            this.departure = data.content;
            MessagePlugin.success(`Selected Origin: ${data.content}`);
        },
        selectDestination(data) {
            this.arrival = data.content;
            MessagePlugin.success(`Selected Destination: ${data.content}`);
        },
    },
};
</script>

<style scoped>
/* Apply grey color and underline to Input Origin and Input Destination */
.t-button {
    color: grey !important;
    text-decoration: underline !important;
    text-underline-offset: 6px;
    font-weight: bold !important;
}

.t-button:hover {
    color: darkgrey !important;
    text-decoration: underline !important;
    text-underline-offset: 6px;
    font-weight: bold !important;
}

.t-divider {
    background-color: grey !important; /* Set the divider color to blue */
    width: 2px !important; /* Make the divider thicker */
    height: 30px; /* Increase the height of the vertical divider */
    align-self: center; /* Center the divider vertically */
}

/* Styling for the Search Button */
.search-button {
    padding: 20px 30px;
    font-size: 1.2rem;
    font-weight: bold !important;
    border-radius: 20px;
    background-color: #3470c4;
    color: white !important;
    text-decoration: none !important;
    transition: background-color 0.3s ease;
}

.search-button:hover {
    background-color: #285a9c;
    text-decoration: none !important;
}

/* Styling for the Action Buttons Section */
.action-buttons {
    margin-top: 0px;
    width: 60%;
}

.action-button-container {
    display: flex;
    justify-content: space-between; /* Distribute buttons evenly across the row */
    align-items: center;
    width: 90%;
    border: 0px solid #3470c4;
    border-radius: 0 0 10px 10px; /* Only curve the bottom left and right corners */
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    padding: 15px 0; /* Add some padding to the container */
}

.action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    font-size: 1rem;
    background-color: transparent !important; /* Force background to be transparent */
    color: #3470c4 !important; /* Ensure text color is applied */
    border: none;
    width: 100%;
    transition: background-color 0.3s, color 0.3s;
    text-align: center;
    text-decoration: none !important;
}


.action-button span {
    margin-top: 5px; /* Adds space between the icon and the text */
}


/* Make the dividers between action buttons more prominent */
.action-button-container .t-divider {
    background-color: #3470c4 !important; /* Blue color for divider */
    width: 5px !important; /* Increase thickness of the divider */
    height: 60px; /* Make the divider longer */
    margin: 0 10px; /* Add spacing around the divider */

}

.action-button:hover {
    background-color: transparent; /* Keep the background transparent on hover */
    color: #285a9c; /* Change text color on hover */
    text-decoration: none !important;

}

.action-icon {
    width: 30px; /* Adjust icon size */
    height: 30px;
    display: block; /* Ensure the icon is treated as a block element */
}




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

.search-container {
    text-align: center;
    background-image: url('../img/bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.search-box {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    width: 70%;
}

h1 {
    font-size: 4rem;
    font-weight: 850;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 30px;
    color: white;
}

/* topbar */
.topbar {
    position: absolute;
    top: 2%;
    left: 5%;
    width: 90%;
    height: 7.59%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(234, 240, 240, 0.4);
    backdrop-filter: blur(5.5px);
    border-radius: 0.5rem;
    padding: 0 20px;
}

.logoText {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 1.88vw;
    color: #283841;
}


/* Centered menu styling */
.centered-menu {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 30px; /* Ensures equal spacing between the menu items */
}

.menu-item {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: darkgrey;
    text-decoration: none;
    transition: color 0.3s ease;
}

.menu-item:hover {
    color: #3470c4;
}

.menu-item.active {
    font-weight: bold;
    color: #283841; /* Make the active menu item bold and a different color */
}

.userPage-button {
    padding: 10px 20px;
    background: #3470c4;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.userPage-button:hover {
    background-color: #285a9c;
}
</style>

