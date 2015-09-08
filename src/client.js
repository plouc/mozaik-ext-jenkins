import request from 'superagent';
import config  from './config';
import Promise from 'bluebird';
import chalk   from 'chalk';
require('superagent-bluebird-promise');


/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    mozaik.loadApiConfig(config);

    function buildRequest(path) {
        let url = config.get('jenkins.baseUrl') + path;

        mozaik.logger.info(chalk.yellow(`[jenkins] fetching from ${ url }`));

        return request.get(url)
            .auth(
                config.get('jenkins.basicAuthUser'),
                config.get('jenkins.basicAuthPassword')
            )
            .promise()
        ;
    }

    return {
        jobs() {
            return buildRequest('/api/json?tree=jobs[name,lastBuild[number,building,timestamp,result]]&pretty=true')
                .then(res => res.body.jobs)
            ;
        },

        job(params) {
            return buildRequest(`/job/${ params.job }/api/json?pretty=true&depth=10&tree=builds[number,duration,result,builtOn,timestamp,id,building]`)
                .then(res => res.body.builds)
            ;
        },

        jobBuild(params) {
            return buildRequest(`/job/${ params.job }/${ params.buildNumber }/api/json?pretty=true`)
                .then(res => res.body)
            ;
        },

        view(params) {
            return buildRequest(`/view/${ params.view }/api/json?pretty=true&depth=1`)
                .then(res => {
                    let view = res.body;
                    let jobs = view.jobs;

                    let builds = [];

                    // Fetch builds details
                    jobs.forEach(function (job) {
                        [
                            'lastBuild',
                            'lastFailedBuild',
                            'lastSuccessfulBuild'
                        ].forEach(function (buildType) {
                            if (job[buildType]) {
                                builds.push(
                                    module.exports.jobBuild({
                                        job:         job.name,
                                        buildNumber: job[buildType].number
                                    })
                                    .then(function (build) {
                                        job[buildType] = build;
                                    })
                                );
                            }
                        });
                    });

                    return Promise.all(builds)
                        .then(() => view)
                    ;
                })
            ;
        }
    };
};


export { client as default };
