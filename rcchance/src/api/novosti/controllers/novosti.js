'use strict';

/**
 * novosti controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::novosti.novosti', ({ strapi }) => ({
//     async findOne(ctx) {
//         const { id } = ctx.params;
//         const entity = await strapi.db.query('api::novosti.novosti').findOne({
//             where: { slug: id }
//         });
//         const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

//         return this.transformResponse(sanitizedEntity);
//     }
// }));

module.exports = createCoreController('api::novosti.novosti', ({ strapi }) =>  ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {}
      query.filters.slug = { '$eq': slug }
      const entity = await strapi.service('api::novosti.novosti').find(query);
      const { results } = await this.sanitizeOutput(entity, ctx);
  
      return this.transformResponse(results[0]);
    }
}));
