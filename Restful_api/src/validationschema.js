
const { body } = require('express-validator');

const createValidationSchema = {
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'Name must be a string'
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty'
    }
  },
  course: {
    in: ['body'],
    isString: {
      errorMessage: 'Course must be a string'
    },
    notEmpty: {
      errorMessage: 'Course cannot be empty'
    }
  }
};

module.exports = {
  createValidationSchema
};
