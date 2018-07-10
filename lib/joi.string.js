const ObjectId = require('mongodb').ObjectId

const pnrPattern = /^[A-Z]{6}$/
const passportNumberPattern = /^([A-PR-WY]){1}([1-9]){1}([0-9]){5,6}([1-9]){1}$/
const objectIdRegex = new RegExp('^[0-9a-fA-F]{24}$')

const isValidNationalCode = nationalCode => {
  if (nationalCode.length !== 10) {
    return false
  }

  const notValidNationalCodes = [
    '0000000000',
    '1111111111',
    '2222222222',
    '3333333333',
    '4444444444',
    '5555555555',
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999'
  ]
  if (notValidNationalCodes.includes(nationalCode)) {
    return false
  }

  const numbers = nationalCode.split('').reverse()
  let sum = 0
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(numbers[i], 10) * (i + 1)
  }
  const remained = sum % 11
  if (remained < 2) {
    if (parseInt(numbers[0], 10) === remained === false) {
      return false
    }
  } else {
    if (11 - remained === parseInt(numbers[0], 10) === false) {
      return false
    }
  }

  return true
}

module.exports = joi => ({
  base: joi.string(),
  name: 'string',
  language: {
    pnr: 'needs to be a valid PNR code',
    nationalCode: 'needs to be a valid national code',
    passportNumber: 'needs to be a valid passport number',
    objectId: 'needs to be a valid id'
  },
  rules: [
    {
      name: 'pnr',
      validate (params, value, state, options) {
        if (value && !pnrPattern.test(value)) {
          return this.createError('string.pnr', { v: value }, state, options)
        }

        return value
      }
    },
    {
      name: 'nationalCode',
      validate (params, value, state, options) {
        if (value && !isValidNationalCode(value)) {
          return this.createError(
            'string.nationalCode',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'passportNumber',
      validate (params, value, state, options) {
        if (value && !passportNumberPattern.test(value)) {
          return this.createError(
            'string.passportNumber',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'objectId',
      validate (params, value, state, options) {
        if (value) {
          if (!objectIdRegex.test(value)) {
            return this.createError(
              'string.objectId',
              { v: value },
              state,
              options
            )
          }

          return ObjectId(value)
        }

        return value
      }
    }
  ]
})
