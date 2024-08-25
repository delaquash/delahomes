/**
 * The `ProtectedRoute` function checks if the user is authenticated and renders the children if
 * authenticated, otherwise redirects to the homepage.
 * @param {ProtectedProps}  - The code snippet you provided is a React component called
 * `ProtectedRoute` that acts as a protected route in a web application. It takes a `children` prop,
 * which represents the content that should be rendered if the user is authenticated.
 * @returns The `ProtectedRoute` component is returning the `children` if the user is authenticated,
 * otherwise it is redirecting to the "/" route using the `redirect` function from the
 * "next/navigation" module.
 */
import { redirect } from "next/navigation";
import React from "react";
import userAuth from "./userAuth";


interface ProtectedProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({children}: ProtectedProps) {
    const isAuthenticated = userAuth();

    return isAuthenticated ? children : redirect("/");
}