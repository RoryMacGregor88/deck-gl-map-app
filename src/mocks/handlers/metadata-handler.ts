import { rest } from 'msw';

import metadataArray from '~/mocks/fixtures/metadata';

const getMetadata = rest.get('*/metadata', (_, res, ctx) =>
  res(ctx.status(200), ctx.json(metadataArray))
);

export default getMetadata;
