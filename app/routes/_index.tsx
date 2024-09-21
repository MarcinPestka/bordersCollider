import type { MetaFunction } from "@remix-run/node";
import { useDispatch, useSelector } from "react-redux";
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
  const userName = useAppSelector(selectCountryFrom)

  return (
    <div>
      <div>
        <p>test</p>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(setFrom('elo'))}
        >
          Increment
        </button>
        <span>{userName.value}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(removeFrom())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

