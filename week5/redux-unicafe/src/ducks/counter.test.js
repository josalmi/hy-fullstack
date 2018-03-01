import deepFreeze from "deep-freeze";
import counterReducer, {
  goodCounter,
  okCounter,
  badCounter,
  zeroCounter
} from "./counter";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };
  deepFreeze(initialState);

  it("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING"
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  it("good is incremented", () => {
    const newState = counterReducer(initialState, goodCounter());
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  it("ok is incremented", () => {
    const newState = counterReducer(initialState, okCounter());
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  it("bad is incremented", () => {
    const newState = counterReducer(initialState, badCounter());
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });

  it("zero resets state", () => {
    const newState = counterReducer({ bad: 1, good: 1, ok: 1 }, zeroCounter());
    expect(newState).toEqual(initialState);
  });
});
