'use strict';

/**
 * kategorii-statej controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::kategorii-statej.kategorii-statej', ({ strapi }) =>  ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {}
      query.filters.slug = { '$eq': slug }
      const entity = await strapi.service('api::kategorii-statej.kategorii-statej').find(query);
      const { results } = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(results[0]);
    }
}));
