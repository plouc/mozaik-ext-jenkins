const JENKINS_BUILD_STATUS_BUILDING = 'BUILDING';
const JENKINS_BUILD_STATUS_UNKNOWN  = 'UNKNOWN';

/**
 * Returns a build status from given build info.
 *
 * @param {object} build - the Jenkins build object
 * @returns {string}
 */
export const getBuildStatus = (build) => {
    if (build.result) {
        return build.result;
    }

    return build.building ? JENKINS_BUILD_STATUS_BUILDING : JENKINS_BUILD_STATUS_UNKNOWN;
};
