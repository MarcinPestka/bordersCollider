import type { MetaFunction } from "@remix-run/node";
import { useDispatch, useSelector } from "react-redux";
import { remove, set } from "~/stores/generalSlice";

export const meta: MetaFunction = () => {
  return [
    { title: "Borders Collider" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Counter() {
  const count = useSelector(state => state.countryFrom.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <p>test</p>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(set('elo'))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(remove())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

