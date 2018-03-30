const {ObjectModel} = require('objectmodel');
const errors = require('@feathersjs/errors');
const cfg = require('./hooks/cfg');

const { hooks } = require('@feathersjs/commons');

const taskModel = new ObjectModel({
  type: ['push', 'pull'],
  action: String,
  params: [Object],
  token: String
});

module.exports = {
  before: {
    all: [],
    create: [
      //Parse params and check if query is well formed
      (hook) => {
        try {
          if (hook.data.params)
            hook.data.params = JSON.parse(hook.data.params);
        } catch(e) {
          throw new errors.Unprocessable('"params" post argument must be a valid JSON');
        }
        taskModel(hook.data);
      },
      //Check if we have a config for the asked type/action
      (hook) => {
        if (!cfg[hook.data.type] || !cfg[hook.data.type][hook.data.action])
          throw new errors.NotImplemented('Type/action not implemented or not found');
      },
      //Validate params for this action if model provided
      (hook) => {
        if (cfg[hook.data.type][hook.data.action].dataValidation) {
          try {
            new (new ObjectModel(cfg[hook.data.type][hook.data.action].dataValidation))(hook.data.params);
          } catch (e) {
            throw new errors.BadRequest('Error occured while parsing params', {
              errors: e.toString()
            });
          }
        }
      },
      //Use native hook handler to exec before hooks loaded from cfg
      (hook) => {
        if (cfg[hook.data.type][hook.data.action].handler && cfg[hook.data.type][hook.data.action].handler.before) {
          return hooks.processHooks(cfg[hook.data.type][hook.data.action].handler.before, hook);
        }
        return;
      }
    ],
  },

  after: {
    all: [],
    create: [
      //Use native hook handler to exec after hooks loaded from cfg
      (hook) => {
        if (cfg[hook.data.type][hook.data.action].handler && cfg[hook.data.type][hook.data.action].handler.after) {
          return hooks.processHooks(cfg[hook.data.type][hook.data.action].handler.after, hook);
        }
        return;
      }
    ],
  },

  error: {
    all: [],
    create: [],
  }
};
