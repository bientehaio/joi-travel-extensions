module.exports = joi => ({
  base: joi.array(),
  name: 'array',
  language: {
    infantCheck: 'count of infants not equals to adults',
    infantNoAdult: 'some of adult passenger mentioned in infant passenger not found',
    infantNotAdult: 'some of passenger mentioned in infant is not adult',
    childCheck: 'at least one adult must be appeared with child passengers'
  },
  rules: [
    {
      name: 'infantCheck',
      validate (params, value, state, options) {
        const count = value.reduce(
          (group, item) => {
            group[item.type] += 1
            return group
          },
          { adult: 0, child: 0, infant: 0 }
        )
        if (count.adult < count.infant) {
          return this.createError(
            'array.infantCheck',
            { v: value },
            state,
            options
          )
        }

        const infants = value.filter(item => item.type === 'infant')
        for (const infant of infants) {
          const adult = value.find(
            item => item.number === infant.passenger_number
          )
          if (!adult) {
            return this.createError(
              'array.infantNoAdult',
              { v: value },
              state,
              options
            )
          }
          if (adult.type !== 'adult') {
            return this.createError(
              'array.infantNotAdult',
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
      name: 'childCheck',
      validate (params, value, state, options) {
        const count = value.reduce(
          (group, item) => {
            group[item.type] += 1
            return group
          },
          { adult: 0, child: 0, infant: 0 }
        )
        if (count.adult === 0 && count.child > 0) {
          return this.createError(
            'array.childCheck',
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
