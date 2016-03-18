import request from 'superagent';
import config  from './config';
import Promise from 'bluebird';
import chalk   from 'chalk';
import fs      from 'fs';
require('superagent-bluebird-promise');


const viewBuildTypes = [
    'lastBuild',
    'lastFailedBuild',
    'lastSuccessfulBuild'
];


/**
 * Configures and returns jenkins client.
 *
 * @param {Mozaik} mozaik
 * @returns {Object}
 */
const client = mozaik => {

    mozaik.loadApiConfig(config);
    const caFilePath = config.get('jenkins.customCa');
    let certificate;

    if (caFilePath.length > 0) {
        try {
            certificate = fs.readFileSync(caFilePath);
        } catch(error) {
            mozaik.logger.error(chalk.red(`[jenkins] an error occurred while trying to read custom certificate (${ error })`));
            throw error;
        }
    }

    function buildRequest(path) {
        const url = config.get('jenkins.baseUrl') + path;
        let req = request.get(url);

        if (certificate) {
            req = req.ca(certificate);
        }

        mozaik.logger.info(chalk.yellow(`[jenkins] fetching from ${ url }`));

        return req
            .auth(
                config.get('jenkins.basicAuthUser'),
                config.get('jenkins.basicAuthPassword')
            )
            .promise()
            .catch(error => {
                mozaik.logger.error(chalk.red(`[jenkins] ${ error.error }`));
                throw error;
            })
        ;
    }

    const apiMethods = {
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
                    const view   = res.body;
                    const builds = [];

                    // Fetch builds details
                    view.jobs.forEach(job => {
                        viewBuildTypes.forEach(buildType => {
                            if (job[buildType]) {
                                builds.push(
                                    apiMethods.jobBuild({
                                        job:         job.name,
                                        buildNumber: job[buildType].number
                                    })
                                    .then(build => {
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

    return apiMethods;
};


export default client;
