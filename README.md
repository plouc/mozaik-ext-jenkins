# Mozaïk jenkins widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-jenkins.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-jenkins)

## Jenkins Client Configuration

In order to use the Mozaïk jenkins widgets, you must configure its **client**.

### parameters

key                 | env key                         | required | description
--------------------|---------------------------------|----------|-----------------------------------
`baseUrl`           | JENKINS_API_BASE_URL            | yes      | *jenkins base url*
`basicAuthUser`     | JENKINS_API_BASIC_AUTH_USER     | yes      | *jenkins auth user*
`basicAuthPassword` | JENKINS_API_BASIC_AUTH_PASSWORD | yes      | *jenkins auth password*

### usage

```javascript
{
  //…
  api: {
    jenkins: {
      baseUrl: 'https://my-jenkins.ci',
        basicAuthUser:     'user',
        basicAuthPassword: 'password'
    }
  }
}
```



## Jenkins Job Builds

![jenkins job builds](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_builds.png)

> Show jenkins job builds.

### parameters

key   | required | description
------|----------|---------------
`job` | yes      | *jenkins job identifier*

### usage

```javascript
{
  type: 'jenkins.job_builds', job: 'my-job',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Jenkins Job Builds Histogram

![jenkins job builds histogram](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_builds_histogram.png)

> Show jenkins job builds histogram.

### parameters

key   | required | description
------|----------|---------------
`job` | yes      | *jenkins job identifier*

### usage

```javascript
{
  type: 'jenkins.job_builds_histogram', job: 'my-job',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Jenkins Job Status

![jenkins job status](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_status.png)

![jenkins job status bold](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.job_status_bold.png)

> Display job current build status.

### parameters

key      | required |description
---------|----------|---------------
`job`    | yes      | *jenkins job identifier*
`layout` | no       | *widget layout* (none for default or 'bold')

### usage

```javascript
{
  type: 'jenkins.job_status', job: 'my-job',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Jenkins View

![jenkins view](https://raw.githubusercontent.com/plouc/mozaik-ext-jenkins/master/preview/jenkins.view.png)

> List view jobs

### parameters

key     | required | description
--------|----------|---------------
`view`  | yes      | *jenkins view identifier*
`title` | no       | *widget title (view name used if none provided)*

### usage

```javascript
{
    type: 'jenkins.view', view: 'dev-env',
    columns: 2, rows: 1, x: 0, y: 0
}
```