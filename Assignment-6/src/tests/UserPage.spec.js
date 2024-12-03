import { mount } from '@vue/test-utils'
import UserPage from '../views/UserPage.vue' // Adjust the path as necessary
import { describe, it, expect, beforeEach, vi } from 'vitest'
import flushPromises from 'flush-promises'
import axios from 'axios'

vi.mock('axios') // Mock axios

describe('UserPage.vue', () => {
  let wrapper

  beforeEach(() => {
    window.alert = vi.fn()
    wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': { template: '<div><slot /></div>' },
          't-input': {
            props: ['modelValue'],
            template:
              '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': {
            template: '<button @click="$emit(\'click\')"><slot /></button>',
          },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        },
      },
    })
  })
  
  it('renders the navigation bar correctly', () => {
    expect(wrapper.find('.topbar').exists()).toBe(true)
    expect(wrapper.find('.logoText').text()).toBe('Northwind Airline')
    expect(wrapper.find('.user-name').text()).toBe('UserName')
    expect(wrapper.find('.home-button').exists()).toBe(true)
  })

  it('redirects to home page when Home Page button is clicked', async () => {
    delete window.location
    window.location = { href: '' }
  
    const homeButton = wrapper.find('.home-button')
    await homeButton.trigger('click')
  
    expect(window.location.href).toBe('/')
  })

  it('renders the sidebar with navigation links', () => {
    const sidebarLinks = wrapper.findAll('.sidebar .sidebarops')
    expect(sidebarLinks.length).toBe(5)
  
    expect(sidebarLinks.at(0).text()).toContain('Personal Information')
    expect(sidebarLinks.at(1).text()).toContain('Order History')
    expect(sidebarLinks.at(2).text()).toContain('Flight Reschedule')
    expect(sidebarLinks.at(3).text()).toContain('Flight Upgrade')
    expect(sidebarLinks.at(4).text()).toContain('Flights Cancellation')
  })
  it('renders the personal information form inputs', () => {
    expect(wrapper.find('input[placeholder="ex: Vincent"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="ex: Doe"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Your specific address"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="ex: ON"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="L9L L0L"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="yyyy-mm-dd"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Male/Female/Other"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Change your email"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Change your password"]').exists()).toBe(true)
  })
  it('updates data properties when inputs change', async () => {
    const firstNameInput = wrapper.find('input[placeholder="ex: Vincent"]')
    await firstNameInput.setValue('Vincent')
    expect(wrapper.vm.firstName).toBe('Vincent')
  
    const lastNameInput = wrapper.find('input[placeholder="ex: Doe"]')
    await lastNameInput.setValue('Doe')
    expect(wrapper.vm.lastName).toBe('Doe')
  
    // Repeat for other inputs as needed
  })
  
  it('toggles credit card dropdown when clicked', async () => {
    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(false)
  
    const creditCardDropdown = wrapper
      .findAll('.dropdown-title')
      .filter((w) => w.text().includes('Credit Card'))
      .at(0)
  
    await creditCardDropdown.trigger('click')
  
    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(true)
  })

  it('displays message when no credit cards are added', async () => {
    // Ensure creditCards is empty
    await wrapper.setData({
      creditCards: [],
    })
  
    // Expand the credit card dropdown
    const creditCardDropdownTitle = wrapper
      .findAll('.dropdown-title')
      .filter((w) => w.text().includes('Credit Card'))
      .at(0)
  
    await creditCardDropdownTitle.trigger('click')
  
    // Wait for DOM updates
    await wrapper.vm.$nextTick()
  
    // Check that the message is displayed
    const message = wrapper.find('.dropdown-content p')
    expect(message.exists()).toBe(true)
    expect(message.text()).toBe('No credit cards added yet.')
  })
  
  it('shows the add card form when "Add New Method" button is clicked', async () => {
    expect(wrapper.vm.isAddCardFormVisible).toBe(false)
  
    const button = wrapper.find('.add-method-button')
    await button.trigger('click')
  
    expect(wrapper.vm.isAddCardFormVisible).toBe(true)
    expect(wrapper.find('.add-card-form').exists()).toBe(true)
  })
  
  it('renders "Add New Method" button and triggers showAddCardForm when clicked', async () => {
    const showAddCardFormSpy = vi.spyOn(wrapper.vm, 'showAddCardForm')
  
    const button = wrapper.find('.add-method-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Add New Method')
  
    await button.trigger('click')
    expect(showAddCardFormSpy).toHaveBeenCalled()
  
    // Ensure the form is now visible
    expect(wrapper.vm.isAddCardFormVisible).toBe(true)
  
    // Clean up the spy
    showAddCardFormSpy.mockRestore()
  })
  
  it('updates newCard data when add card form inputs change', async () => {
    await wrapper.setData({ isAddCardFormVisible: true })
  
    const cardholderInput = wrapper.find('input#cardholder')
    await cardholderInput.setValue('John Doe')
    expect(wrapper.vm.newCard.cardholder).toBe('John Doe')
  
    const cardNumberInput = wrapper.find('input#card-number')
    await cardNumberInput.setValue('4111111111111111')
    expect(wrapper.vm.newCard.cardNumber).toBe('4111111111111111')
  })
  
  it('saves a new card successfully', async () => {
    axios.post.mockResolvedValue({ data: {} })

    await wrapper.setData({ isAddCardFormVisible: true })

    await wrapper.setData({
      newCard: {
        cardholder: 'Jane Smith',
        cardNumber: '5111111111111111',
        expiryDate: '11/26',
        cvv: '456',
        type: 'debit',
      },
    })

    await wrapper.vm.saveCard()

    await flushPromises()

    expect(wrapper.vm.debitCards).toHaveLength(1)
    expect(wrapper.vm.debitCards[0].cardholder).toBe('Jane Smith')
    expect(wrapper.vm.errors).toEqual({})
  })
  
  it('renders the form properly', () => {
    expect(wrapper.find('.title').text()).toBe('Personal Information')
  })

  it('displays an error when the first name contains numbers', async () => {
    const firstNameInput = wrapper.find('input')
    await firstNameInput.setValue('Vincent123')

    wrapper.vm.saveChanges()

    await wrapper.vm.$nextTick()

    const errorText = wrapper.find('.error-text')
    expect(errorText.exists()).toBe(true)
    expect(errorText.text()).toBe('First name should not contain numbers')
  })

  it('displays credit card options', async () => {
    await wrapper.setData({
      creditCards: [
        {
          id: 1,
          cardholder: 'John Doe',
          cardNumber: '4111111111111111',
          logo: 'visa-logo.png',
        },
      ],
      isCreditCardDropdownVisible: true,
    })

    expect(wrapper.findAll('.card-option').length).toBe(1)
    expect(wrapper.find('.card-option img').attributes('src')).toBe(
      'visa-logo.png',
    )
    expect(wrapper.find('.card-option').text()).toContain(
      'John Doe - **** **** **** 1111',
    )
  })

  it('submits form without errors when first name is valid', async () => {
    axios.post.mockResolvedValue({ data: {} })

    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
    })

    wrapper.vm.saveChanges()

    await flushPromises()

    expect(wrapper.vm.userDetailsArray).toContainEqual(
      expect.objectContaining({
        firstName: 'Vincent',
        lastName: 'Doe',
        email: 'vincent.doe@example.com',
        postalCode: 'L9L L0L',
        dob: '1990-01-01',
        gender: '',
        password: '',
      }),
    )
  })

  
  it('displays an error when the email format is invalid', async () => {
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      email: 'invalid-email',
    })

    wrapper.vm.saveChanges()

    await wrapper.vm.$nextTick()

    const errorText = wrapper.find('.error-text')
    expect(errorText.exists()).toBe(true)
    expect(errorText.text()).toBe('Invalid email format')
  })

  

  it('displays an error when saving card with invalid card number', async () => {
    await wrapper.setData({ isAddCardFormVisible: true })

    await wrapper.setData({
      newCard: {
        cardholder: 'John Doe',
        cardNumber: '123',
        expiryDate: '12/25',
        cvv: '123',
        type: 'credit',
      },
    })

    await wrapper.vm.saveCard()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.cardNumber).toBe(
      'Card number must be 16 digits long',
    )
    expect(wrapper.find('.error-text').text()).toBe(
      'Card number must be 16 digits long',
    )
  })

  it('toggles the credit card dropdown', async () => {
    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(false)

    const creditCardDropdownTitle = wrapper
      .findAll('.dropdown-title')
      .filter((w) => w.text().includes('Credit Card'))
      .at(0)

    await creditCardDropdownTitle.trigger('click')

    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(true)
  })

  it('redirects to Google Pay when clicked', async () => {
    delete window.location
    window.location = { href: '' }

    const googlePayOption = wrapper.find('.google-pay')
    await googlePayOption.trigger('click')

    expect(window.location.href).toBe('https://pay.google.com')
  })

  it('redirects to home page when Home Page button is clicked', async () => {
    delete window.location
    window.location = { href: '' }

    const homeButton = wrapper.find('.home-button')
    await homeButton.trigger('click')

    expect(window.location.href).toBe('/')
  })

  it('returns the correct card logo based on card number', () => {
    const visaLogo = wrapper.vm.getCardLogo('4111111111111111')
    expect(visaLogo).toContain('Visa')

    // Mastercard number starts with '5'
    const mastercardLogo = wrapper.vm.getCardLogo('5111111111111111')
    expect(mastercardLogo).toContain('mastercard')

    // Default case
    const defaultLogo = wrapper.vm.getCardLogo('6111111111111111')
    expect(defaultLogo).toContain('credit_card_payment_visa_platinum')
  })

  it('displays an error when the last name contains numbers', async () => {
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe123',
    })

    wrapper.vm.saveChanges()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.lastName).toBe(
      'Last name should not contain numbers',
    )
    expect(wrapper.find('.error-text').text()).toBe(
      'Last name should not contain numbers',
    )
  })

  it('displays an error when the postal code format is invalid', async () => {
    await wrapper.setData({
      postalCode: 'InvalidPostalCode',
    })

    wrapper.vm.saveChanges()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.postalCode).toBe('Invalid postal code format')
    expect(wrapper.find('.error-text').text()).toBe(
      'Invalid postal code format',
    )
  })

  it('displays an error when the date of birth format is invalid', async () => {
  await wrapper.setData({
    firstName: 'Vincent',
    lastName: 'Doe',
    email: 'vincent.doe@example.com',
    postalCode: 'L9L L0L', // Provide a valid postal code
    dob: '01-01-1990', // Invalid DOB format
  })

  wrapper.vm.saveChanges()

  await wrapper.vm.$nextTick()

  expect(wrapper.vm.errors.dob).toBe('Invalid date format (yyyy-mm-dd)')
  expect(wrapper.find('.error-text').text()).toBe(
    'Invalid date format (yyyy-mm-dd)',
  )
})

  it('displays an error when the cardholder name contains numbers', async () => {
    await wrapper.setData({
      isAddCardFormVisible: true,
      newCard: {
        cardholder: 'John123',
        cardNumber: '4111111111111111',
        expiryDate: '12/25',
        cvv: '123',
        type: 'credit',
      },
    })

    await wrapper.vm.saveCard()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.cardholder).toBe(
      'Cardholder name should not contain numbers',
    )
    expect(wrapper.find('.error-text').text()).toBe(
      'Cardholder name should not contain numbers',
    )
  })

  it('displays an error when the expiry date is invalid', async () => {
    await wrapper.setData({
      isAddCardFormVisible: true,
      newCard: {
        cardholder: 'John Doe',
        cardNumber: '4111111111111111',
        expiryDate: '13/25', // Invalid month
        cvv: '123',
        type: 'credit',
      },
    })

    await wrapper.vm.saveCard()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.expiryDate).toBe('Invalid expiry date (MM/YY)')
    expect(wrapper.find('.error-text').text()).toBe(
      'Invalid expiry date (MM/YY)',
    )
  })

  it('displays an error when the CVV is invalid', async () => {
    await wrapper.setData({
      isAddCardFormVisible: true,
      newCard: {
        cardholder: 'John Doe',
        cardNumber: '4111111111111111',
        expiryDate: '12/25',
        cvv: '12', // Invalid CVV
        type: 'credit',
      },
    })

    await wrapper.vm.saveCard()

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.cvv).toBe('CVV must be 3 digits')
    expect(wrapper.find('.error-text').text()).toBe('CVV must be 3 digits')
  })

  it('adds card to correct list based on card type', async () => {
    axios.post.mockResolvedValue({ data: {} })

    await wrapper.setData({ isAddCardFormVisible: true })

    // Add a credit card
    await wrapper.setData({
      newCard: {
        cardholder: 'Credit User',
        cardNumber: '4111111111111111',
        expiryDate: '12/25',
        cvv: '123',
        type: 'credit',
      },
    })

    await wrapper.vm.saveCard()
    await flushPromises()

    expect(wrapper.vm.creditCards).toHaveLength(1)
    expect(wrapper.vm.creditCards[0].cardholder).toBe('Credit User')

    // Add a debit card
    await wrapper.setData({
      newCard: {
        cardholder: 'Debit User',
        cardNumber: '5111111111111111',
        expiryDate: '11/26',
        cvv: '456',
        type: 'debit',
      },
    })

    await wrapper.vm.saveCard()
    await flushPromises()

    expect(wrapper.vm.debitCards).toHaveLength(1)
    expect(wrapper.vm.debitCards[0].cardholder).toBe('Debit User')
  })

  
  

  it('displays message when no debit cards are added', async () => {
    // Ensure debitCards is empty
    await wrapper.setData({
      debitCards: [],
    })
  
    // Expand the debit card dropdown
    const debitCardDropdownTitle = wrapper
      .findAll('.dropdown-title')
      .filter((w) => w.text().includes('Debit Card'))
      .at(0)
  
    await debitCardDropdownTitle.trigger('click')
  
    // Wait for DOM updates
    await wrapper.vm.$nextTick()
  
    // Check that the message is displayed
    const message = wrapper.find('.dropdown-content p')
    expect(message.exists()).toBe(true)
    expect(message.text()).toBe('No debit cards added yet.')
  })
  
  it('getCardLogo returns default logo for invalid card number', () => {
    const defaultLogo = wrapper.vm.getCardLogo('9999999999999999')
    expect(defaultLogo).toContain('credit_card_payment_visa_platinum')
  })
  
  it('displays debit cards when they are added', async () => {
    // Add a debit card to debitCards
    await wrapper.setData({
      debitCards: [
        {
          id: 1,
          cardholder: 'Jane Doe',
          cardNumber: '5111111111111111',
          logo: 'mastercard-logo.png',
        },
      ],
      isDebitCardDropdownVisible: true, // Expand the debit card dropdown
    });
  
    await wrapper.vm.$nextTick(); // Wait for DOM updates
  
    // Check that the card is displayed
    const cardOptions = wrapper.findAll('.card-option');
    expect(cardOptions.length).toBe(1);
  
    const cardText = cardOptions.at(0).text();
    expect(cardText).toContain('Jane Doe - **** **** **** 1111');
  
    // Check that the correct logo is displayed
    const cardImage = cardOptions.at(0).find('img');
    expect(cardImage.attributes('src')).toBe('mastercard-logo.png');
  });
  

  it('does not add card when card type is invalid', async () => {
    await wrapper.setData({
      isAddCardFormVisible: true,
      newCard: {
        cardholder: 'John Doe',
        cardNumber: '4111111111111111',
        expiryDate: '12/25',
        cvv: '123',
        type: 'invalidType', // Invalid type
      },
    })
  
    await wrapper.vm.saveCard()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.creditCards).toHaveLength(0)
    expect(wrapper.vm.debitCards).toHaveLength(0)
  })
  
  it('toggleDropdown does nothing when invalid type is passed', async () => {
    await wrapper.vm.toggleDropdown('invalidType')
  
    // Verify that visibility states remain unchanged
    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(false)
    expect(wrapper.vm.isDebitCardDropdownVisible).toBe(false)
  })
  
  it('saves user details when there are no errors', async () => {
    const pushSpy = vi.spyOn(wrapper.vm.userDetailsArray, 'push')
  
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      address: '123 Main St',
      province: 'ON',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      gender: 'Male',
      email: 'vincent.doe@example.com',
      password: 'password123',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.errors).toEqual({})
  
    expect(pushSpy).toHaveBeenCalledWith({
      firstName: 'Vincent',
      lastName: 'Doe',
      address: '123 Main St',
      province: 'ON',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      gender: 'Male',
      email: 'vincent.doe@example.com',
      password: 'password123',
    })
  
    // Clean up the spy
    pushSpy.mockRestore()
  })
  
  
  it('does not save user details when there are validation errors', async () => {
    await wrapper.setData({
      firstName: 'Vincent1', // Invalid first name
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.errors.firstName).toBe('First name should not contain numbers')
    expect(wrapper.vm.userDetailsArray).toHaveLength(0)
  })

  it('toggles the debit card dropdown', async () => {
    expect(wrapper.vm.isDebitCardDropdownVisible).toBe(false)
  
    const debitCardDropdownTitle = wrapper
      .findAll('.dropdown-title')
      .filter((w) => w.text().includes('Debit Card'))
      .at(0)
  
    await debitCardDropdownTitle.trigger('click')
  
    expect(wrapper.vm.isDebitCardDropdownVisible).toBe(true)
  })

  it('resets newCard fields after saving a card', async () => {
    axios.post.mockResolvedValue({ data: {} })
  
    await wrapper.setData({ isAddCardFormVisible: true })
  
    await wrapper.setData({
      newCard: {
        cardholder: 'Jane Smith',
        cardNumber: '5111111111111111',
        expiryDate: '11/26',
        cvv: '456',
        type: 'debit',
      },
    })
  
    await wrapper.vm.saveCard()
    await flushPromises()
  
    expect(wrapper.vm.newCard).toEqual({
      cardholder: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      type: '',
    })
    expect(wrapper.vm.isAddCardFormVisible).toBe(false)
  })

  it('saves multiple user details', async () => {
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    await wrapper.setData({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      postalCode: 'A1A 1A1',
      dob: '1992-02-02',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.userDetailsArray).toHaveLength(2)
  })

  it('resets errors before validation', async () => {
    // Set invalid data
    await wrapper.setData({
      firstName: 'Vincent1', // Invalid
      lastName: 'Doe',
      email: 'invalid-email', // Invalid
      postalCode: 'InvalidPostalCode', // Invalid
      dob: '01-01-1990', // Invalid
    });
  
    wrapper.vm.saveChanges();
    await flushPromises();
  
    expect(wrapper.vm.errors.firstName).toBe('First name should not contain numbers');
  
    // Now provide valid data for all fields
    await wrapper.setData({
      firstName: 'Vincent',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
    });
  
    wrapper.vm.saveChanges();
    await flushPromises();
  
    expect(wrapper.vm.errors).toEqual({});
  });
  
  it('allows saving when optional fields are empty', async () => {
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      address: '',
      province: '',
      gender: '',
      password: '',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.errors).toEqual({})
  
    expect(wrapper.vm.userDetailsArray).toContainEqual({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      address: '',
      province: '',
      gender: '',
      password: '',
    })
  })
  
  it('renders sidebar navigation links', () => {
    const links = wrapper.findAll('.sidebarops')
    expect(links.length).toBeGreaterThan(0)
    expect(links.at(0).text()).toContain('Personal Information')
    expect(links.at(1).text()).toContain('Order History')
  })
  
  it('emits click event when navigation link is clicked', async () => {
    const links = wrapper.findAll('.sidebarops')
    await links.at(0).trigger('click')
    // Verify that clicking doesn't cause errors
    expect(wrapper.emitted()).toBeDefined()
  })
  
  it('resets errors before validation', async () => {
    await wrapper.setData({
      firstName: 'Vincent1', // Invalid first name
      lastName: 'Doe',
      email: 'invalid-email', // Invalid email
      postalCode: 'InvalidPostalCode', // Invalid postal code
      dob: '01-01-1990', // Invalid DOB format
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.errors.firstName).toBe('First name should not contain numbers')
  
    // Now provide valid data for all fields
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.errors).toEqual({})
  })
  
  
  
  
  
  
  
  it('saves password when provided', async () => {
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      password: 'securepassword',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(wrapper.vm.userDetailsArray[0].password).toBe('securepassword')
  })

  it('does not save when required fields are missing', async () => {
    await wrapper.setData({
      firstName: '',
      lastName: '',
      email: '',
      postalCode: '',
      dob: '',
    })
  
    wrapper.vm.saveChanges()
    await flushPromises()
  
    expect(Object.keys(wrapper.vm.errors).length).toBeGreaterThan(0)
    expect(wrapper.vm.userDetailsArray).toHaveLength(0)
  })
  
  it('redirects to Google Pay when clicked', async () => {
    delete window.location
    window.location = { href: '' }
  
    const googlePayOption = wrapper.find('.google-pay')
    await googlePayOption.trigger('click')
  
    expect(window.location.href).toBe('https://pay.google.com')
  })

  it('redirects to home page when Home Page button is clicked', async () => {
    delete window.location
    window.location = { href: '' }
  
    const homeButton = wrapper.find('.home-button')
    await homeButton.trigger('click')
  
    expect(window.location.href).toBe('/')
  })
  
  it('has correct initial data properties', () => {
    expect(wrapper.vm.isCreditCardDropdownVisible).toBe(false)
    expect(wrapper.vm.isDebitCardDropdownVisible).toBe(false)
    expect(wrapper.vm.isAddCardFormVisible).toBe(false)
    expect(wrapper.vm.creditCards).toEqual([])
    expect(wrapper.vm.debitCards).toEqual([])
    expect(wrapper.vm.newCard).toEqual({
      cardholder: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      type: '',
    })
    expect(wrapper.vm.errors).toEqual({})
  })

  it('updates postalCode when input changes', async () => {
    const postalCodeInput = wrapper.find('input[placeholder="L9L L0L"]')
    await postalCodeInput.setValue('L9L L0L')
    expect(wrapper.vm.postalCode).toBe('L9L L0L')
  })
  
  it('displays an error when the postal code format is invalid', async () => {
    const postalCodeInput = wrapper.find('input[placeholder="L9L L0L"]')
    await postalCodeInput.setValue('InvalidPostalCode')
  
    wrapper.vm.saveChanges()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.errors.postalCode).toBe('Invalid postal code format')
  
    const errorText = wrapper.find('[data-testid="postal-code-error"]')
    expect(errorText.exists()).toBe(true)
    expect(errorText.text()).toBe('Invalid postal code format')
  })
  
  it('updates dob when input changes', async () => {
    const dobInput = wrapper.find('input[placeholder="yyyy-mm-dd"]')
    await dobInput.setValue('1990-01-01')
    expect(wrapper.vm.dob).toBe('1990-01-01')
  })

  it('displays an error when the date of birth format is invalid', async () => {
    const dobInput = wrapper.find('input[placeholder="yyyy-mm-dd"]')
    await dobInput.setValue('01-01-1990') // Invalid format
  
    wrapper.vm.saveChanges()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.errors.dob).toBe('Invalid date format (yyyy-mm-dd)')
  
    const errorText = wrapper.find('[data-testid="dob-error"]')
    expect(errorText.exists()).toBe(true)
    expect(errorText.text()).toBe('Invalid date format (yyyy-mm-dd)')
  })
  
  it('updates gender when input changes', async () => {
    const genderInput = wrapper.find('input[placeholder="Male/Female/Other"]')
    await genderInput.setValue('Male')
    expect(wrapper.vm.gender).toBe('Male')
  })
  
  it('updates email when input changes', async () => {
    const emailInput = wrapper.find('input[placeholder="Change your email"]')
    await emailInput.setValue('user@example.com')
    expect(wrapper.vm.email).toBe('user@example.com')
  })
  
  it('displays an error when the email format is invalid', async () => {
    const emailInput = wrapper.find('input[placeholder="Change your email"]')
    await emailInput.setValue('invalid-email')
  
    wrapper.vm.saveChanges()
    await wrapper.vm.$nextTick()
  
    expect(wrapper.vm.errors.email).toBe('Invalid email format')
  
    const errorText = wrapper.find('[data-testid="email-error"]')
    expect(errorText.exists()).toBe(true)
    expect(errorText.text()).toBe('Invalid email format')
  })
  
  it('submits the add card form when user fills out the form and submits', async () => {
    // Ensure the add card form is visible
    await wrapper.setData({ isAddCardFormVisible: true });
    await wrapper.vm.$nextTick(); // Wait for DOM update
  
    // Verify the form is present
    const form = wrapper.find('[data-testid="add-card-form"]');
    expect(form.exists()).toBe(true);
  
    // Find the form inputs
    const cardholderInput = wrapper.find('input#cardholder');
    const cardNumberInput = wrapper.find('input#card-number');
    const expiryDateInput = wrapper.find('input#expiry-date');
    const cvvInput = wrapper.find('input#cvv');
    const creditRadio = wrapper.find('input[type="radio"][value="credit"]');
  
    // Ensure the inputs exist
    expect(cardholderInput.exists()).toBe(true);
    expect(cardNumberInput.exists()).toBe(true);
    expect(expiryDateInput.exists()).toBe(true);
    expect(cvvInput.exists()).toBe(true);
    expect(creditRadio.exists()).toBe(true);
  
    // Simulate user input
    await cardholderInput.setValue('John Doe');
    await cardNumberInput.setValue('4111111111111111');
    await expiryDateInput.setValue('12/25');
    await cvvInput.setValue('123');
    await creditRadio.setChecked();
    await creditRadio.trigger('change');
  
    // Verify that newCard is updated correctly
    expect(wrapper.vm.newCard).toEqual({
      cardholder: 'John Doe',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
      type: 'credit',
    });
  
    // Trigger the form submission
    await form.trigger('submit.prevent');
    await flushPromises();
  
    // Check for validation errors
    expect(wrapper.vm.errors).toEqual({});
  
    // Assert that the card was saved
    expect(wrapper.vm.creditCards).toHaveLength(1);
    expect(wrapper.vm.creditCards[0]).toMatchObject({
      cardholder: 'John Doe',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123',
      logo: expect.any(String),
    });
  });
  
  it('returns the Visa logo for card numbers starting with 4', () => {
    const logoUrl = wrapper.vm.getCardLogo('4111111111111111');
    expect(logoUrl).toContain('Visa');
  });

  it('returns the Mastercard logo for card numbers starting with 5', () => {
    const logoUrl = wrapper.vm.getCardLogo('5111111111111111');
    expect(logoUrl).toContain('mastercard');
  });

  it('returns the default logo for card numbers with unknown prefixes', () => {
    const logoUrl = wrapper.vm.getCardLogo('6111111111111111');
    expect(logoUrl).toBe(
      'https://cdn3.iconfinder.com/data/icons/toolbar-signs-5/512/credit_card_payment_visa_platinum-1024.png'
    );
  });

  it('returns the default logo when card number is invalid', () => {
    const logoUrl = wrapper.vm.getCardLogo('ABC123');
    expect(logoUrl).toBe(
      'https://cdn3.iconfinder.com/data/icons/toolbar-signs-5/512/credit_card_payment_visa_platinum-1024.png'
    );
  });

  it('returns the default logo when card number is null or undefined', () => {
    let logoUrl = wrapper.vm.getCardLogo(null);
    expect(logoUrl).toBe(
      'https://cdn3.iconfinder.com/data/icons/toolbar-signs-5/512/credit_card_payment_visa_platinum-1024.png'
    );

    logoUrl = wrapper.vm.getCardLogo(undefined);
    expect(logoUrl).toBe(
      'https://cdn3.iconfinder.com/data/icons/toolbar-signs-5/512/credit_card_payment_visa_platinum-1024.png'
    );
  });
  
})
