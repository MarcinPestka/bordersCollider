import type { MetaFunction } from "@remix-run/node";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { removeFrom, selectCountryFrom, setFrom } from "~/stores/countriesSlice";

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
    <div>
      <div>
        <button
          aria-label="Set France"
          onClick={() => dispatch(setFrom('France'))}
        >
          Increment
        </button>
        <button
          aria-label="Remove"
          onClick={() => dispatch(removeFrom())}
        >
          Decrement
        </button>
        <br />
        <span>From: {countryFrom}</span>
      </div>
    </div>
  )
}

