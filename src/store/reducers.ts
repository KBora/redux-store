export const initialState = {
  loaded: false,
  loading: false,
  data:  [{label: 'Eat pizza', complete: false }]
};

export function reducerTodos(
  state = initialState,
  action: { type: string, payload: any }
) {

  switch(action.type) {
    case 'ADD_TODO': {
      const todo = action.payload;
      const data = [...state.data, todo];
      return {
        ...state,
        data
      }
    }
    case'LOADING': {
      return {
        ...state,
        loading: true
      }
    }
  }
  return state;
}

export function reducerLoading(
  state = initialState,
  action: { type: string, payload: any }
) {

  switch(action.type) {
    case 'LOADING': {
      return {
        ...state,
        loading: true
      }
    }

  }
  return state;
}
