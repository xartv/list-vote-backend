import { PrismaService } from 'src/prisma.service';

export const recalculateRating = async (
  prisma: PrismaService,
  listItemId: string,
) => {
  const listItem = await prisma.listItem.findUnique({
    where: {
      id: listItemId,
    },
    include: {
      ratingMarks: true,
    },
  });

  const sum = listItem.ratingMarks.reduce(
    (acc, rating) => acc + rating.value,
    0,
  );
  const count = listItem.ratingMarks.length;
  const average = count === 0 ? 0 : sum / count;
  const roundedAverage = Math.round(average * 10) / 10;

  await prisma.listItem.update({
    where: { id: listItemId },
    data: { rating: roundedAverage },
  });
};
