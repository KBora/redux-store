export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function};
  private state:{ [key: string]: any };

  constructor( reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
    // pass no actions into the reducer
    // reducer returns a 'default' / initial state

  }

  get value() {
    return this.state;
  }

  subscribe(fn) {
    // subscribers should be notified if state changes
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    // returns array without the newly added function
    // in order for unsubscribe to work
    return() => {
      this.subscribers = this.subscribers.filter( sub => sub !== fn)
    }
  }

  dispatch( action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach( fn => fn(this.value));
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



