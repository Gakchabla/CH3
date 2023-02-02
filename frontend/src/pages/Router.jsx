import React from "react";
import { Route, Routes } from "react-router-dom";
import { useCurrentUserContext } from "../contexts/userContext";
import Home from "./Home";
import Login from "./Login";
import Match from "./Match";
import MyMatches from "./MyMatches";
import MyProfile from "./MyProfile";
import Protected from "./Protected";
import Register from "./Register";

export default function Router() {
  const { user } = useCurrentUserContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/match"
        element={
          <Protected verifyCondition={user.id}>
            <Match />
          </Protected>
        }
      />
      <Route
        path="/mymatches"
        element={
          <Protected verifyCondition={user.id}>
            <MyMatches />
          </Protected>
        }
      />
      <Route
        path="/myprofile"
        element={
          <Protected verifyCondition={user.id}>
            <MyProfile />
          </Protected>
        }
      />
    </Routes>
  );
}
