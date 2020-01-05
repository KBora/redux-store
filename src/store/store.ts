export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function};
  private state:{ [key: string]: any };

  constructor( reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
    // pass no actions into the reducer
    // /educer returns a 'default' / initial state

  }

  get value() {
    return this.state;
  }

  dispatch( action) {
    this.state = this.reduce(this.state, action);
  }

  private reduce(state, action) {
    const newState = {};

    for( const prop in this.reducers) { // prop is the key in the reducers
      // the [prop] code is a dynamic way of doing this:
      // newState.todos = this.reducers.todos(state.todos, action)
      newState[prop] = this.reducers[prop](state[prop], action);

    }

    return newState;
  }

}



