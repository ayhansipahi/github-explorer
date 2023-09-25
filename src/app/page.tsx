import UserSearch from "@/components/UserSearch/UserSearch";
import React from "react";

export default function Home() {
  return (
    <main className="container w-100 md:w-1/2 min-h-full flex flex-col py-10 gap-10">
      <h1 className="text-6xl font-semibold text-center">
        User & Repo Explorer
      </h1>
      <p className="text-center">
        Search for users on Github and view their repositories.
      </p>
      <div className=" md:w-50">
          <UserSearch/>
      </div>
    </main>
  )
}
