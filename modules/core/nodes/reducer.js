export const initialState = {
  active: 'remote',
  network: 'main',
  remote: {
    client: 'infura',
    blockNumber: 100,
    timestamp: 0
  },
  local: {
    client: 'geth',
    syncMode: 'fast',
    currentBlock: 0,
    highestBlock: 0,
    knownStates: 0,
    pulledStates: 0,
    startingBlock: 0
  }
};

const nodes = (state = initialState, action) => {
  switch (action.type) {
    case '[MAIN]:LOCAL_NODE:SYNC_UPDATE':
      return Object.assign({}, state, {
        local: Object.assign({}, state.local, {
          currentBlock: action.payload.currentBlock,
          highestBlock: action.payload.highestBlock,
          knownStates: action.payload.knownStates,
          pulledStates: action.payload.pulledStates,
          startingBlock: action.payload.startingBlock
        })
      });
    case '[MAIN]:LOCAL_NODE:UPDATE_BLOCK_NUMBER':
      return Object.assign({}, state, {
        local: Object.assign({}, state.local, {
          currentBlock: action.payload.blockNumber,
          highestBlock: action.payload.blockNumber
        })
      });
    case '[MAIN]:LOCAL_NODE:RESET':
      return Object.assign({}, state, {
        local: Object.assign({}, state.local, {
          currentBlock: 0,
          highestBlock: 0,
          knownStates: 0,
          pulledStates: 0,
          startingBlock: 0
        })
      });
    case '[MAIN]:REMOTE_NODE:RESET':
      return Object.assign({}, state, {
        remote: Object.assign({}, state.remote, {
          blockNumber: 100,
          timestamp: 0
        })
      });
    case '[MAIN]:REMOTE_NODE:BLOCK_HEADER_RECEIVED':
      return Object.assign({}, state, {
        remote: Object.assign({}, state.remote, {
          blockNumber: action.payload.blockNumber,
          timestamp: action.payload.timestamp
        })
      });
    case '[MAIN]:NODES:CHANGE_ACTIVE':
      return Object.assign({}, state, {
        active: action.payload.active
      });
    case '[MAIN]:NODES:CHANGE_NETWORK':
      return Object.assign({}, state, {
        network: action.payload.network,
        remote: Object.assign({}, state.remote, {
          blockNumber: 100,
          timestamp: 0
        }),
        local: Object.assign({}, state.local, {
          currentBlock: 0,
          highestBlock: 0,
          knownStates: 0,
          pulledStates: 0,
          startingBlock: 0
        })
      });
    case '[MAIN]:NODES:CHANGE_SYNC_MODE':
      return Object.assign({}, state, {
        local: Object.assign({}, state.local, {
          syncMode: action.payload.syncMode
        })
      });
    default:
      return state;
  }
};

export default nodes;