<template>
  <div class="background">
    <!-- Navigation Bar -->
    <div
    :style="{ padding: '24px', background: 'var(--bg-color-page)', borderRadius: '3px' }"
  >
    <t-head-menu style="marginBottom: 20px">
      <template #logo>
        <h2> 
          Northwind Airlines
        </h2>
      </template>

       <!-- Menu Items (Home, About, Hotels & Villas, Flights) -->
       <t-menu-item value="home">
        <span>Home</span>
      </t-menu-item>
      <t-menu-item value="about">
        <span>About</span>
      </t-menu-item>
      <t-menu-item value="hotels">
        <span>Hotels & Villas</span>
      </t-menu-item>
      <t-menu-item value="flights">
        <span>Flights</span>
      </t-menu-item>
      <!-- Right Side User Info and Button -->
      <template #operations>
        <div class="navbar-right">
          <span class="user-name">LName FName</span>
          <t-button theme="primary" shape="round">Home Page</t-button>
        </div>
      </template>
    </t-head-menu>
  </div>

    <!-- Main Content Area -->
    <div class="content-container">
      <!-- Sidebar for Navigation -->
      <t-card class="sidebar">
        <t-menu :value="selectedMenu">
          <t-menu-item name="1">Personal Information</t-menu-item>
          <t-menu-item name="2">Order History</t-menu-item>
          <t-menu-item name="3">Flight Reschedule</t-menu-item>
          <t-menu-item name="4">Flight Upgrade</t-menu-item>
          <t-menu-item name="5">Flights Cancellation</t-menu-item>
        </t-menu>
      </t-card>

      <!-- Personal Info Section -->
      <t-card class="form-section" title="Personal Info">
        <p>You can change your details on this page</p>
        <t-form label-width="100px">
          <t-form-item label="First Name">
            <t-input v-model="firstName" placeholder="ex: Vincent"></t-input>
          </t-form-item>

          <t-form-item label="Last Name">
            <t-input v-model="lastName" placeholder="ex: Doe"></t-input>
          </t-form-item>

          <t-form-item label="Address">
            <t-input v-model="address" placeholder="Your specific address"></t-input>
          </t-form-item>

          <t-form-item label="Province">
            <t-input v-model="province" placeholder="ex: ON"></t-input>
          </t-form-item>

          <t-form-item label="Postal Code">
            <t-input v-model="postalCode" placeholder="L9L L0L"></t-input>
          </t-form-item>

          <t-form-item label="Date of Birth">
            <t-input v-model="dob" placeholder="yyyy-mm-dd"></t-input>
          </t-form-item>

          <t-form-item label="Gender">
            <t-input v-model="gender" placeholder="Male/Female/Other"></t-input>
          </t-form-item>

          <t-form-item label="Email">
            <t-input v-model="email" placeholder="Change your email"></t-input>
          </t-form-item>

          <t-form-item label="Password">
            <t-input v-model="password" type="password" placeholder="Change your password"></t-input>
          </t-form-item>

          <t-form-item>
            <t-button theme="primary" @click="saveChanges">Save Changes</t-button>
          </t-form-item>
        </t-form>
      </t-card>

      <!-- Payment Method Section -->
      <t-card class="payment-section" title="Payment Method">
        <t-menu value="payment" default-expand-all>
          <t-menu-item name="google-pay">Google Pay</t-menu-item>
          <t-menu-item name="credit-card">Credit Card</t-menu-item>
        </t-menu>

        <t-divider></t-divider>

        <t-menu value="debit-cards" default-expand-all>
          <t-menu-item name="debit-card-1">Axim Bank **** 4578</t-menu-item>
          <t-menu-item name="debit-card-2">HDFC Bank **** 4521</t-menu-item>
          <t-menu-item name="new-card">New Card</t-menu-item>
        </t-menu>

        <t-button theme="default" block>Add New Method</t-button>
      </t-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: 'https://via.placeholder.com/50x50',
      selectedMenu: '1',
      firstName: '',
      lastName: '',
      address: '',
      province: '',
      postalCode: '',
      dob: '',
      gender: '',
      email: '',
      password: '',
    };
  },
  methods: {
    goHome() {
      console.log('Navigating to Home Page');
    },
    saveChanges() {
      console.log('Changes saved:', this.firstName, this.lastName, this.address);
    },
  },
};
</script>

<style>
.background {
  background-image: url('/images/background.jpg'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 20px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 1200px;
}

.sidebar {
  width: 20%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.form-section, .payment-section {
  width: 35%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-family: Poppins;
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  letter-spacing: 0.06em;
  text-align: center;

}

.t-button {
  margin-top: 10px;
}
</style>
