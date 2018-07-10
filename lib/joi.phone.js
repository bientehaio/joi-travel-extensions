const cellphonePattern = /^(\+98|0)9[0-9]{9}$/
const phonePattern = /^(\+98|0)[0-9]{3}[0-9]{4,8}$/

module.exports = joi => ({
  base: joi.string(),
  name: 'phone',
  language: {
    cellphone: 'needs to be a valid cellphone number',
    phoneNumber: 'needs to be a valid phone number'
  },
  pre: (value, state, options) => {
    return value.toString()
  },
  rules: [
    {
      name: 'cellphone',
      validate (params, value, state, options) {
        if (value) {
          if (!cellphonePattern.test(value)) {
            return this.createError(
              'phone.cellphone',
              { v: value },
              state,
              options
            )
          }
        }

        return value
      }
    },
    {
      name: 'phoneNumber',
      validate (params, value, state, options) {
        if (value) {
          if (!phonePattern.test(value)) {
            return this.createError(
              'phone.phoneNumber',
              { v: value },
              state,
              options
            )
          }
        }

        return value
      }
    }
  ]
})
