module.exports = joi => ({
  base: joi.string(),
  name: 'file',
  language: {
    maxSize: 'max allowed file size is {{max}}',
    type: 'allowed file types are {{types}}'
  },
  rules: [
    {
      name: 'maxSize',
      params: {
        max: joi.number()
      },
      validate (params, value, state, options) {
        const cleanBase64Value = value
          .replace(/data:\w*\/\w*;base64,/g, '')
          .replace('/=/g', '')
        if (cleanBase64Value.length * 0.75 > params.max) {
          return this.createError(
            'file.maxSize',
            { v: value, max: params.max },
            state,
            options
          )
        }

        return value
      }
    },
    {
      name: 'type',
      params: {
        types: joi
          .array()
          .items(joi.string().tags(['image/jpeg', 'image/png']))
      },
      validate (params, value, state, options) {
        const regex = /(data:(\w*\/\w*);base64,)/g
        const typeCheck = regex.exec(value)
        if (typeCheck) {
          const type = typeCheck[2]
          if (!params.types.includes(type)) {
            return this.createError(
              'file.type',
              { v: value, types: params.types },
              state,
              options
            )
          }
        } else {
          return this.createError(
            'file.type',
            { v: value, types: params.types },
            state,
            options
          )
        }

        return value
      }
    }
  ]
})
