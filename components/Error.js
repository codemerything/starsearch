import React from "react";

export default function Error({ cname, message }) {
  return <div className={cname}>{message}</div>;
}
