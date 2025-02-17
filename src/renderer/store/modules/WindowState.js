const state = {
  windowSize: [0, 0],
  windowPosition: [0, 0],
  isFullScreen: false,
  isFocused: true,
  isMaximized: false,
};

const getters = {
  winWidth: state => state.windowSize[0],
  winHeight: state => state.windowSize[1],
  winSize: state => state.windowSize,
  winPosX: state => state.windowPosition[0],
  winPosY: state => state.windowPosition[1],
  winPos: state => state.windowPosition,
  isFullScreen: state => state.isFullScreen,
  isFocused: state => state.isFocused,
  isMaximized: state => state.isMaximized,
};

const mutations = {
  windowSize(state, payload) {
    state.windowSize = payload;
  },
  windowPosition(state, payload) {
    state.windowPosition = payload;
  },
  isFullScreen(state, payload) {
    state.isFullScreen = payload;
  },
  isFocused(state, payload) {
    state.isFocused = payload;
  },
  isMaximized(state, payload) {
    state.isMaximized = payload;
  },
};

const actions = {
  mainWindowSizeSet(context, payload) {
    context.commit('windowSize', payload);
  },
  rendererWindowSizeSet(context, payload) {
    this.$electron.ipcRenderer.send('windowSizeChange', payload);
    return new Promise((resolve, reject) => {
      this.$electron.ipcRenderer.once('windowSizeChange-asyncReply', (actualSize) => {
        if (actualSize === 'payload') {
          context.commit('windowSize', actualSize);
          resolve(actualSize);
        } else {
          console.error('Error: window size set failed.');
          reject(actualSize);
        }
      });
    });
  },
  mainWindowPosition(context, payload) {
    context.commit('windowPosition', payload);
  },
  rendererWindowPositionSet(context, payload) {
    this.$electron.ipcRenderer.send('windowPositionChange', payload);
    return new Promise((resolve, reject) => {
      this.$electron.ipcRenderer.once('windowPositionChange-asyncReply', (actualPos) => {
        if (actualPos === 'payload') {
          context.commit('windowPosition', actualPos);
          resolve(actualPos);
        } else {
          console.error('Error: window position set failed.');
          reject(actualPos);
        }
      });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
