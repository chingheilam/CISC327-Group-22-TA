import { mount } from '@vue/test-utils';
import UserPage from '../../../views/UserPage.vue'; // Adjust the path as necessary
import { describe, it, expect } from 'vitest';
import flushPromises from 'flush-promises';  // Make sure to import flush-promises
describe('UserPage.vue', () => {
  it('renders the form properly', () => {
    const wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': {
            template: '<div><slot /></div>',  // Mock implementation of router-link
          },
          't-input': {
            props: ['modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />', // Mock t-input to handle v-model
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': { template: '<button><slot /></button>' },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        }
      }
    });

    // Assert the form's title
    expect(wrapper.find('.title').text()).toBe('Personal Information');
  });

  it('displays an error when the first name contains numbers', async () => {
    const wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': { template: '<div><slot /></div>' },
          't-input': {
            props: ['modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': { template: '<button><slot /></button>' },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        }
      }
    });
  
    // Set firstName with numbers
    const firstNameInput = wrapper.find('input');
    await firstNameInput.setValue('Vincent123');
  
    // Instead of triggering the button click, directly call the saveChanges method
    wrapper.vm.saveChanges(); // Manually invoke saveChanges to trigger validation
  
    // Wait for any DOM updates after validation
    await wrapper.vm.$nextTick();
  
    // Check if the error message is rendered
    const errorText = wrapper.find('.error-text');
    expect(errorText.exists()).toBe(true);
    expect(errorText.text()).toBe('First name should not contain numbers');
  });
  
  it('displays credit card options', async () => {
    const wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': { template: '<div><slot /></div>' },
          't-input': {
            props: ['modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': { template: '<button><slot /></button>' },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        }
      }
    });

    // Set the data for credit cards and make the dropdown visible
    await wrapper.setData({
      creditCards: [
        { id: 1, cardholder: 'John Doe', cardNumber: '4111111111111111', logo: 'visa-logo.png' }
      ],
      isCreditCardDropdownVisible: true
    });

    // Check if the card is rendered properly
    expect(wrapper.findAll('.card-option').length).toBe(1);
    expect(wrapper.find('.card-option img').attributes('src')).toBe('visa-logo.png');
    expect(wrapper.find('.card-option').text()).toContain('John Doe - **** **** **** 1111');
  });

  // Additional Success Case
  it('submits form without errors when first name is valid', async () => {
    const wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': { template: '<div><slot /></div>' },
          't-input': {
            props: ['modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': { template: '<button><slot /></button>' },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        }
      }
    });
  
    // Populate form fields
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01'
    });
  
    // Manually trigger form submission
    wrapper.vm.saveChanges();
  
    // Wait for all promises to resolve
    await flushPromises();
  
    // Check that userDetailsArray contains the expected data
    expect(wrapper.vm.userDetailsArray).toContainEqual(expect.objectContaining({
      firstName: 'Vincent',
      lastName: 'Doe',
      email: 'vincent.doe@example.com',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      gender: '',
      password: ''
    }));
  });
  
  
  
  // Additional Failure Case (Invalid Email)
  it('displays an error when the email format is invalid', async () => {
    const wrapper = mount(UserPage, {
      global: {
        components: {
          'router-link': { template: '<div><slot /></div>' },
          't-input': {
            props: ['modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          't-form-item': { template: '<div><slot /></div>' },
          't-button': { template: '<button><slot /></button>' },
          't-form': { template: '<form><slot /></form>' },
          't-card': { template: '<div><slot /></div>' },
        }
      }
    });
  
    // Set an invalid email
    await wrapper.setData({
      firstName: 'Vincent',
      lastName: 'Doe',
      postalCode: 'L9L L0L',
      dob: '1990-01-01',
      email: 'invalid-email'
    });
  
    // Manually trigger validation by calling saveChanges
    wrapper.vm.saveChanges(); // Call the saveChanges method directly
  
    // Wait for DOM updates
    await wrapper.vm.$nextTick();
  
    // Check if the error message is rendered
    const errorText = wrapper.find('.error-text');
    expect(errorText.exists()).toBe(true);
    expect(errorText.text()).toBe('Invalid email format');
  });
});
