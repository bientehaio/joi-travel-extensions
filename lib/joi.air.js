const airportPattern = new RegExp('^[A-Z]{3}$')
const airfarePattern = /^[A-Z]{1}$/
const airlinePattern = new RegExp('^[0-9A-Z]{2}$')
const airplanePattern = /^[0-9A-Z]{3}$/
const flightNumberPattern = /^[0-9]{1,4}$/

module.exports = joi => ({
  base: joi.string(),
  name: 'air',
  language: {
    airport: 'needs to be a valid airport iata code',
    airfare: 'needs to be a valid airfare iata code',
    airline: 'needs to be a valid airline iata code',
    airplane: 'needs to be a valid airplane iata code',
    flightNumber: 'needs to be a valid flight number'
  },
  pre: (value, state, options) => {
    return value.toString().toUpperCase()
  },
  rules: [
    {
      name: 'airport',
      validate (params, value, state, options) {
        if (value && !airportPattern.test(value)) {
          return this.createError('air.airport', { v: value }, state, options)
        }

        return value
      }
    },
    {
      name: 'airfare',
      validate (params, value, state, options) {
        if (value && !airfarePattern.test(value)) {
          return this.createError('air.airfare', { v: value }, state, options)
        }

        return value
      }
    },
    {
      name: 'airline',
      validate (params, value, state, options) {
        if (value && !airlinePattern.test(value)) {
          return this.createError('air.airline', { v: value }, state, options)
        }

        return value
      }
    },
    {
      name: 'airplane',
      validate (params, value, state, options) {
        if (value && !airplanePattern.test(value)) {
          return this.createError('air.airplane', { v: value }, state, options)
        }

        return value
      }
    },
    {
      name: 'flightNumber',
      validate (params, value, state, options) {
        if (value && !flightNumberPattern.test(value)) {
          return this.createError(
            'air.flightNumber',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    }
  ]
})
