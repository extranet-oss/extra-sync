
module.exports = {
  pull: {
    profile: {
      url: '/user/{user}/print',
      handler: require('./pull/profile'),
      useProvidedToken: true,
      dataValidation: {
        user: String
      }
    }
  },
  push: {
    profile: {
      url: '/user/{user}/edit/save',
      handler: require('./push/profile'),
      useProvidedToken: true
    }
  }
};
