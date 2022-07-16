/* eslint-disable compat/compat */

const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { EOL } = require('os');
const path = require('path');

function resolvePath(pathToResolve) {
  return path.join(__dirname, `../${pathToResolve}`);
}

const getDirectories = (source) => {
  return readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map(({ name }) => name);
};

function getPackageJsonPath(packageDirectory) {
  return resolvePath(`packages/${packageDirectory}/package.json`);
}

function updatePeerDependencies() {
  const packageJsonMap = {};
  const packageDirectories = getDirectories(resolvePath('packages'));

  packageDirectories.forEach((packageDirectory) => {
    const packageJson = JSON.parse(readFileSync(getPackageJsonPath(packageDirectory), 'utf8'));
    packageJsonMap[packageDirectory] = { packageJson, modified: false };
  });

  Object.entries(packageJsonMap).forEach(([packageDirectory, { packageJson }]) => {
    Object.values(packageJsonMap).forEach(({ packageJson: { name, version } }) => {
      const majorVersion = `^${version.split('.')[0]}`;

      if (
        !packageJson.peerDependencies?.[name] ||
        packageJson.peerDependencies[name] === majorVersion
      ) {
        return;
      }

      // eslint-disable-next-line no-console
      console.log(
        `🔨 Updating peer dependency ${name} from "${packageJson.peerDependencies[name]}" to "${majorVersion}" for ${packageJson.name}`,
      );

      packageJsonMap[packageDirectory].packageJson.peerDependencies[name] = majorVersion;
      packageJsonMap[packageDirectory].modified = true;
    });

    if (!packageJsonMap[packageDirectory].modified) {
      return;
    }

    writeFileSync(
      getPackageJsonPath(packageDirectory),
      JSON.stringify(packageJsonMap[packageDirectory].packageJson, null, 2) + EOL,
    );
  });
}

updatePeerDependencies();
