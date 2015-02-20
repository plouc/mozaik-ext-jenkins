var convict = require('convict');

var config = convict({
    jenkins: {
        baseUrl: {
            doc:     'The jenkins API base url.',
            default: null,
            format:  String,
            env:    'JENKINS_API_BASE_URL'
        },
        basicAuthUser: {
            doc:     'The jenkins API basic http auth user.',
            default: null,
            format:  String,
            env:    'JENKINS_API_BASIC_AUTH_USER'
        },
        basicAuthPassword: {
            doc:     'The jenkins API basic http auth password.',
            default: null,
            format:  String,
            env:    'JENKINS_API_BASIC_AUTH_PASSWORD'
        }
    }
});

module.exports = config;