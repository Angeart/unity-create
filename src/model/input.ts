import * as core from '@actions/core';

const Input = {
  get customImage() {
    return core.getInput('customImage') || '';
  },
  get unityVersion() {
    return core.getInput('unityVersion') || '2019.2.11f1';
  },
  get containerVersion() {
    return core.getInput('containerVersion') || '1';
  },
  get projectPath() {
    return core.getInput('projectPath') || '';
  },
};

export default Input;
