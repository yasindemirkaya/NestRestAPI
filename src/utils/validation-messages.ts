export const validationMessages = {
  // FIRST NAME
  first_name: {
    string: 'First name must be a string.',
    regex: 'First name cannot contain numbers or special characters.',
    empty: 'First Name cannot be empty.',
  },

  // LAST NAME
  last_name: {
    string: 'Last name must be a string.',
    regex: 'Last name cannot contain numbers or special characters.',
    empty: 'Last Name cannot be empty.',
  },

  // EMAIL
  email: {
    invalid: 'Invalid email format.',
    empty: 'Email cannot be empty.',
  },

  // MOBILE
  mobile: {
    length: 'Mobile number must be exactly 10 digits long.',
    empty: 'Mobile number cannot be empty.',
  },

  // PASSWORD
  password: {
    string: 'Password must be a string.',
    regex:
      'Password must contain at least one uppercase letter and one special character.',
    empty: 'Password cannot be empty.',
  },
};
