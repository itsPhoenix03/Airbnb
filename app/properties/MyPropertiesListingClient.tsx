"use client";

import { SafeListing, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface MyPropertiesListingClientProps {
  properties: SafeListing[];
  currentUser?: SafeUser;
}

const MyPropertiesListingClient: React.FC<MyPropertiesListingClientProps> = ({
  properties,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Your Listing has been deleted!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title={`Your Own Properties, ${currentUser?.name}`}
        subtitle="Check out owned properties which are been listed on the Airbnb!"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property) => (
          <ListingCard
            data={property}
            key={property.id}
            actionId={property.id}
            actionLabel="Delete this listing"
            onAction={onCancel}
            disabled={property.id === deletingId}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyPropertiesListingClient;
