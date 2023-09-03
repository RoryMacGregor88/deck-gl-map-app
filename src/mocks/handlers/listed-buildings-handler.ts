import { rest } from 'msw';

import listedBuildings from '~/mocks/fixtures/data/listed_buildings';

const getListedBuildings = rest.get(
  '*/data/listed_buildings_edinburgh',
  (_, res, ctx) => res(ctx.status(200), ctx.json(listedBuildings))
);

export default getListedBuildings;
