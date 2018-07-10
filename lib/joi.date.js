const DateTime = require('luxon').DateTime

module.exports = joi => ({
  base: joi.string(),
  name: 'datetime',
  language: {
    onlyDate: 'needs to be a valid date',
    onlyTime: 'needs to be a valid time',
    timezone: 'needs to be a valid timezone',
    offset: 'needs to be a valid date offset'
  },
  pre: (value, state, options) => {
    return value.toString()
  },
  rules: [
    {
      name: 'onlyDate',
      validate (params, value, state, options) {
        const date = DateTime.fromString(value, 'yyyy-MM-dd')

        if (!date.isValid) {
          return this.createError(
            'datetime.onlyDate',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'onlyTime',
      validate (params, value, state, options) {
        const date = DateTime.fromString(value, 'hh:mm')

        if (!date.isValid) {
          return this.createError(
            'datetime.onlyTime',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'timezone',
      validate (params, value, state, options) {
        const timezone = /\w*\/\w*/g
        if (!timezone.test(value)) {
          return this.createError(
            'datetime.timezone',
            { v: value },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'offset',
      validate (params, value, state, options) {
        const offset = /[+-]\d{2}:\d{2}/g
        if (!offset.test(value)) {
          return this.createError(
            'datetime.offset',
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
