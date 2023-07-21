import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { identityCardValidationSchema } from 'validationSchema/identity-cards';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.identity_card
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getIdentityCardById();
    case 'PUT':
      return updateIdentityCardById();
    case 'DELETE':
      return deleteIdentityCardById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getIdentityCardById() {
    const data = await prisma.identity_card.findFirst(convertQueryToPrismaUtil(req.query, 'identity_card'));
    return res.status(200).json(data);
  }

  async function updateIdentityCardById() {
    await identityCardValidationSchema.validate(req.body);
    const data = await prisma.identity_card.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteIdentityCardById() {
    const data = await prisma.identity_card.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
