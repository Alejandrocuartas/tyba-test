const getEnvironmentVariable = (name: string) => {
    const env = process.env[name];
    if (!env) {
        console.error(`Missing environment variable: ${name}`);
        throw new Error(`Missing environment variable: ${name}`);
    }
    return env;
};

export default getEnvironmentVariable;
