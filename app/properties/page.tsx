import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import MyPropertiesListingClient from "./MyPropertiesListingClient";

const MyPropertiesListingPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized Access!"
        subtitle="Login to access this page"
      />
    );

  const properties = await getListings({
    userId: currentUser.id,
  });

  if (properties.length === 0)
    return (
      <EmptyState
        title="Look's like you didn't list a porperty on Airbnb!"
        subtitle="You can listing your porperty using the Airbnb My Home option to add a property"
      />
    );

  return (
    <MyPropertiesListingClient
      properties={properties}
      currentUser={currentUser}
    />
  );
};

export default MyPropertiesListingPage;
