"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingImage from "@/app/components/listings/ListingImage";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find(
      (item) => item.label.toLowerCase() === listing?.category.toLowerCase()
    );
  }, [listing?.category]);

  return (
    <Container>
      <div className="mx-w-screen-lg mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <ListingImage
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            id={listing?.id}
            currentUser={currentUser}
          />

          <section>
            <ListingHead
              title={listing?.title}
              locationValue={listing?.loactionValue}
            />

            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <ListingInfo
                user={listing.user}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.loactionValue}
                description={listing.description}
                title={listing.title}
                category={category}
              />
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
