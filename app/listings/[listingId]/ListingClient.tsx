"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingImage from "@/app/components/listings/ListingImage";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservations, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const intialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: SafeReservations[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(intialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success(
          `Your Booking for this listing has been confirmed! Enjoy...`
        );
        setDateRange(intialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Oops! Something went wrong...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, currentUser, loginModal, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dateCount && listing.price) setTotalPrice(dateCount * listing.price);
      else setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find(
      (item) => item.label.toLowerCase() === listing?.category.toLowerCase()
    );
  }, [listing?.category]);

  return (
    <Container>
      <div className="mx-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ListingImage
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            id={listing?.id}
            currentUser={currentUser}
          />

          <section className="overflow-y-scroll">
            <ListingHead
              title={listing?.title}
              locationValue={listing?.locationValue}
            />

            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <ListingInfo
                user={listing.user}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                description={listing.description}
                title={listing.title}
                category={category}
              />

              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
