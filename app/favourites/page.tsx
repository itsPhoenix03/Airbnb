import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteLisitngs from "../actions/getFavouriteListing";
import EmptyState from "../components/EmptyState";
import FavouriteListingsClient from "./FavouriteListingsClient";

const FavouritesListingPage = async () => {
  const currentUser = await getCurrentUser();
  const favouriteListings = await getFavouriteLisitngs();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized Access!"
        subtitle="Login to access this page"
      />
    );

  if (favouriteListings.length === 0) {
    return (
      <EmptyState
        title="You don't have any Favourite Listing!"
        subtitle="Go and find one now for your next trip"
      />
    );
  }

  return (
    <FavouriteListingsClient
      favouriteListings={favouriteListings}
      currentUser={currentUser}
    />
  );
};

export default FavouritesListingPage;
