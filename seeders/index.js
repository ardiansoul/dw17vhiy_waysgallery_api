const SeedUser = require("./20201213040730-demo-user");

module.exports = function () {
  return Promise.all([
    // Returning and thus passing a Promise here
    // Independent seeds first
    SeedUser(),
  ])
    .then(() => {
      // More seeds that require IDs from the seeds above
    })
    .then(() => {
      console.log("********** Successfully seeded db **********");
    });
};
