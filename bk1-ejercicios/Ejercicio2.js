let packageJson = {};

for (let command of commands) {
  command = command.trim();

  if (command === "npm init -y") {
    if (!packageJson.name) {
      packageJson.name = "project";
      packageJson.version = "1.0.0";
    }
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
  }

  if (command === "npm install --save express") {
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
    }
    packageJson.dependencies.express = "^4.17.1";
  }

  if (command.startsWith("add script")) {
    const parts = command.split(" ");
    const scriptName = parts[2];
    const scriptCommand = parts.slice(3).join(" ");

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    packageJson.scripts[scriptName] = scriptCommand;
  }
}

// asegurar estructura final
if (!packageJson.name) {
  packageJson.name = "project";
  packageJson.version = "1.0.0";
}
if (!packageJson.dependencies) {
  packageJson.dependencies = {};
}
if (!packageJson.scripts) {
  packageJson.scripts = {};
}


const result = {
  name: packageJson.name,
  version: packageJson.version,
  dependencies: packageJson.dependencies,
  scripts: packageJson.scripts
};

console.log(JSON.stringify(result, null, 2));