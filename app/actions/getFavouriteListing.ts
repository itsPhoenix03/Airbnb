import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteLisitngs() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favouriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavouriteListings = favouriteListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeFavouriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
