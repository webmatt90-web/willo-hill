"use client";

import { TextField, YesNoField } from "@/components/forms/fields";
import type { StepProps } from "@/components/forms/visit/types";

export default function StepFinish({ data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold uppercase text-primary">
        Finishing Touches
      </h2>
      <YesNoField
        label="Would you like a host team member to meet you at the door?"
        name="wants-host"
        value={data.wantsHost}
        onChange={(wantsHost) => update({ wantsHost })}
      />
      <YesNoField
        label="Do you need a ride to church?"
        name="needs-ride"
        value={data.needsRide}
        onChange={(needsRide) => update({ needsRide })}
      />
      {data.needsRide && (
        <TextField
          id="pickup-address"
          label="Pickup address"
          value={data.pickupAddress}
          onChange={(pickupAddress) => update({ pickupAddress })}
          required
          autoComplete="street-address"
        />
      )}
      <TextField
        id="coffee-order"
        label="Favorite coffee shop drink? (optional — we may surprise you)"
        value={data.coffeeOrder}
        onChange={(coffeeOrder) => update({ coffeeOrder })}
        placeholder="e.g. medium caramel latte"
      />
    </div>
  );
}
