import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title="Unauthorized Access!"
        subtitle="Login for accessing this page"
      />
    );

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Currently you don't have any reservations"
        subtitle="Currently no reservations have been made for your property!"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
