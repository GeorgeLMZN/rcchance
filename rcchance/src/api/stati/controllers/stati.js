'use strict';

/**
 * stati controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stati.stati', ({ strapi }) =>  ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {}
      query.filters.slug = { '$eq': slug }
      const entity = await strapi.service('api::stati.stati').find(query);
      const { results } = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(results[0]);
    }
}));
