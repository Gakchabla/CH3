import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ verifyCondition, children }) {
  if (!verifyCondition) {
    return <Navigate to="/" replace />;
  }
  return children;
}
