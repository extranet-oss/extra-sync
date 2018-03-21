const assert = require('assert');
const app = require('../../src/app');

describe('\'check-autologin\' service', () => {
  it('registered the service', () => {
    const service = app.service('check-autologin');

    assert.ok(service, 'Registered the service');
  });
});
