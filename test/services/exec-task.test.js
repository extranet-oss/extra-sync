const assert = require('assert');
const app = require('../../src/app');

describe('\'exec-task\' service', () => {
  it('registered the service', () => {
    const service = app.service('exec-task');

    assert.ok(service, 'Registered the service');
  });
});
