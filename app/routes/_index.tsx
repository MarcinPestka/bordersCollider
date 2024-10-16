import type { MetaFunction } from "@remix-run/node";
import Header from "../components/header";
import Map from "../components/map";

export const meta: MetaFunction = () => {
  return [
    { title: "Borders Collider" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Counter() {
  return (
    <>
      <Header />
      <Map />
    </>
  );
}
