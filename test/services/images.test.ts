import assert from 'assert';
import app from '../../src/app';

describe('\'images\' service', () => {
  it('registered the service', () => {
    const service = app.service('images');

    assert.ok(service, 'Registered the service');
  });
});
