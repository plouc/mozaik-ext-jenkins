import convict from 'convict';

const config = convict({
    jenkins: {
        baseUrl: {
            doc:     'The jenkins API base url.',
            default: null,
            format:  String,
            env:     'JENKINS_API_BASE_URL'
        },
        basicAuthUser: {
            doc:     'The jenkins API basic http auth user.',
            default: null,
            format:  String,
            env:     'JENKINS_API_BASIC_AUTH_USER'
        },
        basicAuthPassword: {
            doc:     'The jenkins API basic http auth password.',
            default: null,
            format:  String,
            env:     'JENKINS_API_BASIC_AUTH_PASSWORD'
        },
        customCa: {
            doc:     '(Optional) CA file to use for tls authentication',
            default: '',
            format:  String,
            env:     'JENKINS_API_CUSTOM_CA'
        }
    }
});


export default config;
