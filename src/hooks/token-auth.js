/**
 * title: Token auth hook
 * contributors: freeboi
 * desc:
 *    Hook check if token passed as query parameter exist in the config
 * v0.1
 * todo:
**/

const { NotAuthenticated } = require('@feathersjs/errors');
const syncConfig = require('../../config/sync-config.json');

module.exports = () => {
  return async (hook) => {
    if (!hook.params.query.auth)
      throw new NotAuthenticated('Missing auth param');
    if (!syncConfig.validTokens.includes(hook.params.query.auth))
      throw new NotAuthenticated('Wrong token');
  };
};