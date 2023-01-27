type ReduceTypeWithoutAction<T> = [T, React.DispatchWithoutAction];
type ReduceType<T, U> = [T, React.Dispatch<U>];
export type { ReduceTypeWithoutAction, ReduceType };
