"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();

  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import("../Map")), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const upadatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate)
      upadatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) upadatedQuery.endDate = formatISO(dateRange.endDate);

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: upadatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    dateRange,
    params,
    router,
    searchModal,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Find Stays";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go this trip?"
        subtitle="Find a perfect location for your this trip!"
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When are you planning to go?"
          subtitle="Make sure everyone is free!"
        />

        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How many people are there?"
          subtitle="How much amenities you require?"
        />

        <Counter
          title="Guest"
          subtitle="How many guests you coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />

        <Counter
          title="Rooms Needed"
          subtitle="How many rooms you want to have in your stay?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />

        <Counter
          title="Bathrooms Needed"
          subtitle="How many bathrooms you want to have?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Find a stay compatible with your requirment's"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
