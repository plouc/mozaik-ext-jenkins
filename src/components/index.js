var components = {
    Jobs:               require('./Jobs.jsx'),
    JobStatus:          require('./JobStatus.jsx'),
    JobBuilds:          require('./JobBuilds.jsx'),
    JobBuildsHistogram: require('./JobBuildsHistogram.jsx'),
    View:               require('./View.jsx')
};

require('mozaik/browser')
    .add('jenkins.jobs',                 components.Jobs)
    .add('jenkins.job_status',           components.JobStatus)
    .add('jenkins.job_builds',           components.JobBuilds)
    .add('jenkins.job_builds_histogram', components.JobBuildsHistogram)
    .add('jenkins.view',                 components.View)
;

module.exports = components;