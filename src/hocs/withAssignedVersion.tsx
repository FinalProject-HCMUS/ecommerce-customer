import React from 'react';
import versions from '../constants/versions'; // Import versions
import Page404 from '../page/error/Page404';

export const withAssignedVersions = <P extends object>(Component: React.FC<P>, KeyFlag: string): React.FC<P> => {
  return (props: P) => {
    const { VERSIONS, CURRENT_VERSION } = versions;

    // Find the current version object
    const currentVersion = VERSIONS.find((version) => version.name === CURRENT_VERSION);

    // Check if the KeyFlag exists in the current version's keys
    const isKeyFlagAllowed = currentVersion?.keys.includes(KeyFlag);

    if (!isKeyFlagAllowed) {
      // Render a 404-like page if the KeyFlag is not allowed
      return <Page404 />;
    }
    // Render the wrapped component if the KeyFlag is allowed
    return <Component {...props} />;
  };
};
