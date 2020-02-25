const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const newState = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }
      return newState
    }
    case 'OK':
      {
        const newState = {
          good: state.good,
          ok: state.ok + 1,
          bad: state.bad
        }
        return newState
      }
    case 'BAD':
      {
        const newState = {
          good: state.good,
          ok: state.ok,
          bad: state.bad + 1
        }
        return newState
      }
    case 'ZERO': {
      const newState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return newState
    }
    default: return state
  }

}

export default counterReducer