module.exports = joi => ({
  name: 'any',
  base: joi.any(),
  language: {
    objectId: 'needs to be a valid id'
  },
  pre: (value, state, options) => {
    return typeof value === 'string' ? value : value.toString()
  },
  rules: [
    {
      name: 'objectId',
      validate (params, value, state, options) {
        if (value) {
          if (!objectIdRegex.test(value)) {
            return this.createError(
              'any.objectId',
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
