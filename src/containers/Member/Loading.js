import React from 'react';
import Spinner from 'react-spinkit';
export default function Loading({ isLoading, pastDelay, error }) {

  if (isLoading && pastDelay) {
    return <div><Spinner name="double-bounce" /></div>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
}
