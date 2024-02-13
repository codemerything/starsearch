import React from "react";

export default function Error({ cname, message }) {
  return <div className="bg-red-500">{message}</div>;
}
