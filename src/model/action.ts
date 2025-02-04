import path from 'path';

const Action = {
  get supportedPlatforms() {
    return ['linux'];
  },

  get isRunningLocally() {
    return process.env.RUNNER_WORKSPACE === undefined;
  },

  get isRunningFromSource() {
    return path.basename(__dirname) === 'model';
  },

  get canonicalName() {
    return 'unity-create';
  },

  get rootFolder() {
    if (Action.isRunningFromSource) {
      return path.dirname(path.dirname(path.dirname(__filename)));
    }

    return path.dirname(path.dirname(__filename));
  },

  get actionFolder() {
    return `${Action.rootFolder}/dist`;
  },

  get dockerfile() {
    return `${Action.actionFolder}/Dockerfile`;
  },

  get workspace() {
    return process.env.GITHUB_WORKSPACE;
  },

  checkCompatibility() {
    const currentPlatform = process.platform;
    if (!Action.supportedPlatforms.includes(currentPlatform)) {
      throw new Error(`Currently ${currentPlatform}-platform is not supported`);
    }
  },
};

export default Action;
