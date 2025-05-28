import { Dispatch, SetStateAction, useMemo, useReducer } from 'react';

export function useMultiState<T extends Record<string, any>>(
  initialState: T
): T & {
  [K in keyof T & string as `set${Capitalize<K>}`]: Dispatch<
    SetStateAction<T[K]>
  >;
} {
  type State = T;
  type Key = keyof State & string;
  type Action = { key: Key; value: State[Key] };

  function reducer(state: State, action: Action): State {
    return { ...state, [action.key]: action.value };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return useMemo(() => {
    const result: any = {};
    (Object.keys(state) as Key[]).forEach((key) => {
      result[key] = state[key];
      result[`set${capitalize(key)}`] = (value: State[Key]) =>
        dispatch({ key, value });
    });
    return result;
  }, [state]);
}
