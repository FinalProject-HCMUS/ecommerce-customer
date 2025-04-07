import versions from '../constants/versions';

const useFlagFeature = (flagKey: string): boolean => {
  const { VERSIONS, CURRENT_VERSION } = versions;

  // Find the current version object
  const currentVersion = VERSIONS.find((version) => version.name === CURRENT_VERSION);

  // Check if the flagKey exists in the current version's keys
  return currentVersion?.keys.includes(flagKey) || false;
};

export default useFlagFeature;
