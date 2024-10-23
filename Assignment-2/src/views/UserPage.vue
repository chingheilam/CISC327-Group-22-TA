<template>
  <div class="background">
    <div class="overlay"></div>
    <!-- Navigation Bar -->
    <nav class="topbar">
      <div class="logoText">Northwind Airline</div>

      <!-- Username and Home Page Button -->
      <div class="user-info">
        <span class="user-name">LName FName</span>
      </div>
      <button class="home-button" @click="goToHomePage">Home Page</button>
    </nav>

    <!-- Main Content Area -->
    <div class="content-container">
      <!-- Sidebar for Navigation -->
      <div class="sidebar">
        <router-link to="/userPage" class="sidebarops">
          <img
            src="../icons/passenger-blue.png"
            alt="PI"
            class="nav-icon"
          />Personal Information
        </router-link>
        <router-link to="/order-history" class="sidebarops">
          <img src="../icons/flight-blue.png" alt="OH" class="nav-icon" />Order
          History
        </router-link>
        <router-link to="/flight-rescheduleUpgrade" class="sidebarops">
          <img src="../icons/Reschedule.png" alt="FR" class="nav-icon" />Flight
          Reschedule
        </router-link>
        <router-link to="/flight-rescheduleUpgrade" class="sidebarops">
          <img src="../icons/Upgrade.png" alt="FU" class="nav-icon" />Flight
          Upgrade
        </router-link>
        <router-link to="/flights-cancellation" class="sidebarops">
          <img src="../icons/Cancel.png" alt="FC" class="nav-icon" />Flights
          Cancellation
        </router-link>
      </div>

      <!-- Personal Info Section -->
      <t-card class="form-section custom-card">
        <p class="title">Personal Information</p>
        <p class="subtext">You can change your details on this page</p>
        <t-form label-width="100px">
          <t-form-item label="First Name">
            <t-input v-model="firstName" placeholder="ex: Vincent"></t-input>
            <!-- Error Display -->
            <p v-if="errors.firstName" class="error-text">
              {{ errors.firstName }}
            </p>
          </t-form-item>

          <t-form-item label="Last Name">
            <t-input v-model="lastName" placeholder="ex: Doe"></t-input>
            <!-- Error Display -->
            <p v-if="errors.lastName" class="error-text">
              {{ errors.lastName }}
            </p>
          </t-form-item>

          <t-form-item label="Address">
            <t-input
              v-model="address"
              placeholder="Your specific address"
            ></t-input>
          </t-form-item>

          <t-form-item label="Province">
            <t-input v-model="province" placeholder="ex: ON"></t-input>
          </t-form-item>

          <t-form-item label="Postal Code">
            <t-input v-model="postalCode" placeholder="L9L L0L"></t-input>
            <!-- Error Display -->
            <p v-if="errors.postalCode" class="error-text">
              {{ errors.postalCode }}
            </p>
          </t-form-item>

          <t-form-item label="Date of Birth">
            <t-input v-model="dob" placeholder="yyyy-mm-dd"></t-input>
            <!-- Error Display -->
            <p v-if="errors.dob" class="error-text">{{ errors.dob }}</p>
          </t-form-item>

          <t-form-item label="Gender">
            <t-input v-model="gender" placeholder="Male/Female/Other"></t-input>
          </t-form-item>

          <t-form-item label="Email">
            <t-input v-model="email" placeholder="Change your email"></t-input>
            <!-- Error Display -->
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </t-form-item>

          <t-form-item label="Password">
            <t-input
              v-model="password"
              type="password"
              placeholder="Change your password"
            ></t-input>
          </t-form-item>

          <t-form-item>
            <t-button theme="primary" @click="saveChanges"
              >Save Changes</t-button
            >
          </t-form-item>
        </t-form>
      </t-card>

      <!-- Payment Method Section -->
      <div class="payment-section">
        <p class="title">Payment Method</p>

        <!-- Google Pay -->
        <div class="payment-option google-pay" @click="redirectToGooglePay">
          <div class="dropdown-title">
            Google Pay <span class="arrow">&#x25B6;</span>
          </div>
        </div>

        <!-- Credit Card Dropdown -->
        <div class="payment-option">
          <div class="dropdown-title" @click="toggleDropdown('creditCard')">
            Credit Card <span class="arrow">&#x25BC;</span>
          </div>

          <div v-if="isCreditCardDropdownVisible" class="dropdown-content">
            <p v-if="!creditCards.length">No credit cards added yet.</p>
            <div v-for="card in creditCards" :key="card.id" class="card-option">
              <label>
                <input type="radio" name="credit-card" />
                <img
                  :src="card.logo"
                  alt="Card Logo"
                  style="width: 30px; height: 20px; margin-left: 10px"
                />
                {{ card.cardholder }} - **** **** ****
                {{ card.cardNumber.slice(-4) }}
              </label>
            </div>
          </div>
        </div>

        <!-- Debit Card Dropdown -->
        <div class="payment-option">
          <div class="dropdown-title" @click="toggleDropdown('debitCard')">
            Debit Card <span class="arrow">&#x25BC;</span>
          </div>

          <div v-if="isDebitCardDropdownVisible" class="dropdown-content">
            <p v-if="!debitCards.length">No debit cards added yet.</p>
            <div v-for="card in debitCards" :key="card.id" class="card-option">
              <label>
                <input type="radio" name="debit-card" />
                <!-- Display the logo beside the cardholder's name and card number -->
                <img
                  :src="card.logo"
                  alt="Card Logo"
                  style="width: 30px; height: 20px; margin-left: 10px"
                />
                {{ card.cardholder }} - **** **** ****
                {{ card.cardNumber.slice(-4) }}
              </label>
            </div>
          </div>
        </div>

        <!-- Add New Method Button -->
        <button class="add-method-button" @click="showAddCardForm">
          <i class="plus-icon">+</i> Add New Method
        </button>

        <!-- Add New Card Form (Initially Hidden) -->
        <div v-if="isAddCardFormVisible" class="add-card-form">
          <h3>Add New Card</h3>
          <form @submit.prevent="saveCard">
            <div class="form-group">
              <label for="cardholder">Cardholder Name</label>
              <input
                type="text"
                id="cardholder"
                v-model="newCard.cardholder"
                placeholder="e.g. John Doe"
              />
              <!-- Error Display -->
              <p v-if="errors.cardholder" class="error-text">
                {{ errors.cardholder }}
              </p>
            </div>
            <div class="form-group">
              <label for="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                v-model="newCard.cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
              />
              <!-- Error Display -->
              <p v-if="errors.cardNumber" class="error-text">
                {{ errors.cardNumber }}
              </p>
            </div>
            <div class="form-group">
              <label for="expiry-date">Expiry Date</label>
              <input
                type="text"
                id="expiry-date"
                v-model="newCard.expiryDate"
                placeholder="MM/YY"
              />
              <!-- Error Display -->
              <p v-if="errors.expiryDate" class="error-text">
                {{ errors.expiryDate }}
              </p>
            </div>
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                v-model="newCard.cvv"
                placeholder="XXX"
              />
              <!-- Error Display -->
              <p v-if="errors.cvv" class="error-text">{{ errors.cvv }}</p>
            </div>

            <!-- Card Type Selection -->
            <div class="form-group">
              <label>Card Type</label>
              <div class="radio-container">
                <div class="radio-option">
                  <span>Credit</span>
                  <input type="radio" v-model="newCard.type" value="credit" />
                </div>
                <div class="radio-option">
                  <span>Debit</span>
                  <input type="radio" v-model="newCard.type" value="debit" />
                </div>
              </div>
            </div>

            <button type="submit" class="submit-button">Save Card</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreditCardDropdownVisible: false,
      isDebitCardDropdownVisible: false,
      isAddCardFormVisible: false,
      creditCards: [], // Array for credit cards
      debitCards: [], // Array for debit cards
      newCard: {
        cardholder: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        type: '', // Type of card: 'credit' or 'debit'
      },
      firstName: '',
      lastName: '',
      address: '',
      province: '',
      postalCode: '',
      dob: '',
      gender: '',
      email: '',
      password: '',
      errors: {}, // Object to store form validation errors

      // Store multiple user entries in an array (if needed)
      userDetailsArray: [], // Array to store multiple user info objects
    }
  },
  methods: {
    saveChanges() {
      this.errors = {} // Reset errors before validation

      // Validate first name and last name (no numbers)
      if (/\d/.test(this.firstName)) {
        this.errors.firstName = 'First name should not contain numbers'
      }
      if (/\d/.test(this.lastName)) {
        this.errors.lastName = 'Last name should not contain numbers'
      }

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(this.email)) {
        this.errors.email = 'Invalid email format'
      }

      // Postal code validation (you can adjust the pattern based on your needs)
      const postalCodePattern = /^[A-Za-z0-9]{3}\s?[A-Za-z0-9]{3}$/
      if (!postalCodePattern.test(this.postalCode)) {
        this.errors.postalCode = 'Invalid postal code format'
      }

      // Date of birth validation
      const dobPattern = /^\d{4}-\d{2}-\d{2}$/
      if (!dobPattern.test(this.dob)) {
        this.errors.dob = 'Invalid date format (yyyy-mm-dd)'
      }

      // If there are no errors, save the details
      if (Object.keys(this.errors).length === 0) {
        const userDetails = {
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          province: this.province,
          postalCode: this.postalCode,
          dob: this.dob,
          gender: this.gender,
          email: this.email,
          password: this.password,
        }

        this.userDetailsArray.push(userDetails)
        console.log('User Details Saved:', this.userDetailsArray)
      }
    },

    goToHomePage() {
      window.location.href = '/' // Redirect to home page URL
    },

    redirectToGooglePay() {
      // You can replace this URL with the actual Google Pay setup page or external link
      window.location.href = 'https://pay.google.com' // Redirects to Google Pay
    },
    // Helper method to determine the card brand and return the logo URL
    getCardLogo(cardNumber) {
      // Assuming you determine card type by prefix (e.g., first 4 digits)
      if (cardNumber.startsWith('5')) {
        return 'https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png' // URL of the Mastercard logo
      } else if (cardNumber.startsWith('4')) {
        return 'https://www.pngplay.com/wp-content/uploads/12/Visa-Card-Logo-Transparent-Free-PNG.png' // URL of the Visa logo
      }
      return 'https://cdn3.iconfinder.com/data/icons/toolbar-signs-5/512/credit_card_payment_visa_platinum-1024.png' // Default card logo if unknown
    },

    toggleDropdown(type) {
      if (type === 'creditCard') {
        this.isCreditCardDropdownVisible = !this.isCreditCardDropdownVisible
      } else if (type === 'debitCard') {
        this.isDebitCardDropdownVisible = !this.isDebitCardDropdownVisible
      }
    },
    showAddCardForm() {
      this.isAddCardFormVisible = true
    },

    saveCard() {
      this.errors = {} // Reset errors before validation

      // Validate cardholder name (no numbers)
      if (/\d/.test(this.newCard.cardholder)) {
        this.errors.cardholder = 'Cardholder name should not contain numbers'
      }

      // Validate card number (must be 16 digits)
      if (!/^\d{16}$/.test(this.newCard.cardNumber)) {
        this.errors.cardNumber = 'Card number must be 16 digits long'
      }

      // Validate expiry date (MM/YY)
      const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/
      if (!expiryPattern.test(this.newCard.expiryDate)) {
        this.errors.expiryDate = 'Invalid expiry date (MM/YY)'
      }

      // Validate CVV (3 digits)
      if (!/^\d{3}$/.test(this.newCard.cvv)) {
        this.errors.cvv = 'CVV must be 3 digits'
      }

      // If there are no errors, save the card
      if (Object.keys(this.errors).length === 0) {
        const logoUrl = this.getCardLogo(this.newCard.cardNumber)

        const cardData = {
          id: this.debitCards.length + 1,
          cardholder: this.newCard.cardholder,
          cardNumber: this.newCard.cardNumber,
          expiryDate: this.newCard.expiryDate,
          cvv: this.newCard.cvv,
          logo: logoUrl,
        }

        if (this.newCard.type === 'credit') {
          this.creditCards.push(cardData)
        } else if (this.newCard.type === 'debit') {
          this.debitCards.push(cardData)
        }

        // Reset form after saving
        this.newCard = {
          cardholder: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          type: '',
        }
        this.isAddCardFormVisible = false
      }
    },
  },
}
</script>

<style>
.form-group {
  display: flex;
  flex-direction: column;
}

.radio-option {
  display: flex;
  align-items: center; /* Ensures the text is aligned with the radio button */
  justify-content: flex-start; /* Aligns the radio button and text to the left */
  margin-bottom: 10px; /* Adds spacing between the radio options */
}

.radio-option input[type='radio'] {
  margin-right: 19px; /* Space between the radio button and the label */
}

.radio-container {
  display: flex;
  flex-direction: row;
}
.title {
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
  font-family: Inter;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: left;
}

.subtext {
  display: flex;
  justify-content: flex-start;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #475467;
}

/* 导航栏 Navbar */
.topbar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 4.63%;
  width: 87%;
  height: 7.59%;
  display: flex;
  align-items: center;
  background: rgba(234, 240, 240, 0.4);
  backdrop-filter: blur(5.5px);
  border-radius: 1.5rem;
}

.logoText {
  position: absolute;
  width: 22.06%;
  height: 65.85%;
  left: 2.847%;

  top: 50%;
  transform: translateY(-50%);

  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 1.88vw;

  display: flex;
  text-align: center;
  align-items: center; /* 垂直居中 */

  letter-spacing: 0.06em;
  color: #283841;
  white-space: nowrap; /* 防止文本换行 */
}

.home-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: calc(82px * 0.146) calc(1686px * 0.019);
  gap: calc(1686px * 0.006);

  position: absolute;
  width: calc(1686px * 0.0985);
  height: 62.2%;

  right: 2.847%;
  top: 50%;
  transform: translateY(-50%);

  background: #3470c4;
  border-radius: calc(24 / 51 * 59px);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: calc(1686px * 0.011);
}

.home-button:hover {
  background-color: #285a9c;
}

.user-info {
  position: absolute;
  right: 13%;
  display: flex;
  align-items: center;
}

.user-name {
  margin-right: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1vw;
  color: #242222;
}

.background {
  background-image: url('../img/bg.png');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.28);
}

.content-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 8vw;
  max-width: 94%;
}

.sidebar {
  width: 15%; /* Adjust width as per your design */

  background: rgba(0, 0, 0, 0.3); /* Slightly dark transparent background */
  border-radius: 15px; /* Rounded corners */
  border: 1px solid #ffffff;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  backdrop-filter: blur(35px);
}

/* Maintain the box and remove underline for router-link elements */
.sidebarops {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 18px;
  border: 1px solid #ffffff; /* Keep the white border around the box */
  border-radius: 10px;
  margin-bottom: 10px;
  color: white;
  background-color: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none; /* Remove underline */
}

/* Hover Effect */
.sidebarops:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Keep hover effect */
  cursor: pointer;
  text-decoration: none; /* Ensure underline is removed on hover as well */
}

/* Specific styling for router-link */
.sidebarops.router-link-active {
  background-color: rgba(255, 255, 255, 0.4); /* Active item background */
  color: white;
  text-decoration: none; /* Keep underline removed for active state */
}
/* Active Menu Item Styling */
.sidebarops.is-active {
  background-color: rgba(255, 255, 255, 0.4); /* Active item background */
  color: white;
}

/* Align icons and text inside the menu item */
.sidebarops i {
  margin-right: 12px; /* Space between icon and text */
  font-size: 20px;
  color: #007bff; /* Adjust color as per design */
}

.form-section,
.payment-section {
  width: 30%;
  border: 1px solid #ffffff;
  background: #ffffff70;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
}

h2 {
  font-family: Poppins;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  letter-spacing: 0.06em;
  color: #252121;
  margin-right: 6em;
}

.payment-option {
  margin-bottom: 20px;
  cursor: pointer; /* Makes it clickable */
}

.dropdown-title {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(52, 112, 196, 0.1);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: Inter;
  font-size: 16px;
  text-align: left;
  color: #344054;
}

.arrow {
  font-size: 15px;
}

.dropdown-content {
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
}

.card-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-option img {
  width: 30px;
  height: 20px;
  margin-right: 10px;
}

.add-method-button {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
}

.add-method-button:hover {
  background-color: rgba(52, 112, 196, 0.2);
}

.plus-icon {
  font-size: 18px;
  margin-right: 5px;
}

/* Add New Card Form */
.add-card-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
}

.add-card-form h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 10px;
  background-color: #3470c4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.submit-button:hover {
  background-color: #285a9c;
}

.nav-icon {
  width: 20px;
  height: 20px;
  object-fit: contain; /* Maintain the aspect ratio of the image */
  margin-right: 10px;
  vertical-align: middle;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
