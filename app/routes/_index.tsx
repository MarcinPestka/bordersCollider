import type { MetaFunction } from "@remix-run/node";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { removeFrom, selectCountryFrom, setFrom } from "../stores/countriesSlice";
import { TextField } from '@mui/material';
import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "Borders Collider" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Counter() {
  const dispatch = useAppDispatch()
  const countryFrom = useAppSelector(selectCountryFrom).value

  return (
    <Header />
  )
}

