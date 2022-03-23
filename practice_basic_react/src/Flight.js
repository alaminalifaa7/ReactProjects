import React, { useState } from "react";

export default function Flight({
  AirlineLogoAddress,
  AirlineName,
  InboundFlightsDuration,
  OutboundFlightsDuration,
  Stops,
  TotalAmount,
}) {
  return (
    <article className="flight">
      <header>
        <img src={AirlineLogoAddress} />
        <h4>{AirlineName}</h4>
      </header>
      <p>Outbound Duration: {OutboundFlightsDuration} hr</p>
      <p>Inbound Duration: {InboundFlightsDuration} hr</p>
      <p>Stops: {Stops}</p>
      <p>Total Cost: {TotalAmount}</p>
    </article>
  );
}
