const fs = require('fs');
const path = require('path');

function parseEnvFile() {
    const envPath = path.resolve(__dirname, '.env');

    if (!fs.existsSync(envPath)) {
        return {};
    }

    return fs
        .readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .reduce((env, line) => {
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith('#')) {
                return env;
            }

            const separatorIndex = trimmed.indexOf('=');

            if (separatorIndex === -1) {
                return env;
            }

            const key = trimmed.slice(0, separatorIndex).trim();
            let value = trimmed.slice(separatorIndex + 1).trim();

            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }

            env[key] = value;
            return env;
        }, {});
}

function pickFirst(env, keys) {
    const key = keys.find((candidate) => env[candidate]);
    return key ? env[key] : '';
}

function getAuthEnvDefinitions() {
    const env = {
        ...parseEnvFile(),
        ...process.env,
    };

    return {
        authUsername: JSON.stringify(
            pickFirst(env, [
                'AUTH_USERNAME',
                'AUTH_USER',
                'APP_AUTH_USERNAME',
                'APP_AUTH_USER',
                'VUE_APP_AUTH_USERNAME',
                'VUE_APP_AUTH_USER',
                'VUE_APP_USERNAME',
                'VUE_APP_USER',
                'VITE_AUTH_USERNAME',
                'VITE_AUTH_USER',
                'SILAM_USER',
            ])
        ),
        authPassword: JSON.stringify(
            pickFirst(env, [
                'AUTH_PASSWORD',
                'AUTH_PASS',
                'APP_AUTH_PASSWORD',
                'APP_AUTH_PASS',
                'VUE_APP_AUTH_PASSWORD',
                'VUE_APP_AUTH_PASS',
                'VUE_APP_PASSWORD',
                'VUE_APP_PASS',
                'VITE_AUTH_PASSWORD',
                'VITE_AUTH_PASS',
                'SILAM_PASS',
            ])
        ),
    };
}

module.exports = {
    getAuthEnvDefinitions,
};
