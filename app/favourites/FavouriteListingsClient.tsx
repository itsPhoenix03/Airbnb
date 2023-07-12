"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavouriteListingsClientProps {
  favouriteListings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavouriteListingsClient: React.FC<FavouriteListingsClientProps> = ({
  favouriteListings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title={`Your Favourite Stays, ${currentUser?.name}`}
        subtitle="Check out your favourite stays are free for your next trip!"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favouriteListings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouriteListingsClient;
