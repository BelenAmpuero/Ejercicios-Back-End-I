for (let i = 0; i < updates.length; i++) {
  const update = updates[i];

  const name = update.name;
  const current = update.currentVersion;
  const proposed = update.proposedVersion;

  const flag = securityFlags[i];
  const seguridad = flag === "true" ? "Sí" : "No";

  console.log(`Dependencia: ${name}, Actual: ${current}, Propuesta: ${proposed}, Seguridad: ${seguridad}`);
}