export const validationMessages = {
  // FIRST NAME
  first_name: {
    string: 'First name must be a string.',
    regex: 'First name cannot contain numbers or special characters.',
  },

  // LAST NAME
  last_name: {
    string: 'Last name must be a string.',
    regex: 'Last name cannot contain numbers or special characters.',
  },

  // EMAIL
  email: {
    invalid: 'Invalid email format.',
  },

  // MOBILE
  mobile: {
    length: 'Mobile number must be exactly 10 digits long.',
  },

  // PASSWORD
  password: {
    string: 'Password must be a string.',
    regex:
      'Password must contain at least one uppercase letter and one special character.',
  },
};
