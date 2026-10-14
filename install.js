module.exports = {
  run: [{
    when: "{{!exists('app')}}",
    method: "shell.run",
    params: {
      message: "git clone https://github.com/theprototype-app/core.git app"
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      env: { npm_config_engine_strict: "true" },
      message: ["node --version", "npm install"]
    }
  }]
}
