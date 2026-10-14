module.exports = {
  run: [{
    method: "shell.run",
    params: { message: "git pull --ff-only" }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      env: { npm_config_engine_strict: "true" },
      message: ["git pull --ff-only", "npm install"]
    }
  }]
}
