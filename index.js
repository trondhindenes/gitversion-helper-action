const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const semVer = core.getInput('SemVer');
    const ShortSha = core.getInput('ShortSha');
    const useTagIfExists = core.getBooleanInput('useTagIfExists');
    const githubRef = core.getInput('githubRef')

    tagValue = null;
    if (githubRef.startsWith("refs/tags")) {
        tagValue = githubRef.replace("refs/tags/", "")
      }

    calculatedSemVer = semVer;
    if (semVer.includes('-')) {
        calculatedSemVer = semVer.concat('.', ShortSha);
    }
    if (useTagIfExists === true && tagValue != null) {
        console.log(`Using semver from tag: ${tagValue}`);
        core.setOutput("semver", tagValue);
    }
    else {
        console.log(`Calculated version to be: ${calculatedSemVer}`);
        core.setOutput("semver", calculatedSemVer);
    }
    if (calculatedSemVer.includes("-")) {
        core.setOutput("isrelease", false);
    } else {
        core.setOutput("isrelease", true);
    }
} catch (error) {
    core.setFailed(error.message);
}