// Actions
const GOOD = "my-app/counter/GOOD";
const OK = "my-app/counter/OK";
const BAD = "my-app/counter/BAD";
const ZERO = "my-app/counter/ZERO";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GOOD:
      return {
        ...state,
        good: state.good + 1
      };
    case OK:
      return {
        ...state,
        ok: state.ok + 1
      };
    case BAD:
      return {
        ...state,
        bad: state.bad + 1
      };
    case ZERO:
      return initialState;
  }
  return state;
}

// Action Creators
export function goodCounter() {
  return { type: GOOD };
}

export function okCounter() {
  return { type: OK };
}

export function badCounter() {
  return { type: BAD };
}

export function zeroCounter() {
  return { type: ZERO };
}
