module.exports = {
  version: "8.0.0",
  title: "theprototype.app",
  description: "Collaborative 3D prototyping in your browser. Official Svelte / Three.js editor with optional AI.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    const installed = info.exists("app/node_modules/.package-lock.json")
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{ default: true, icon: "fa-solid fa-plug", text: "Installing", href: "install.js" }]
    } else if (running.update) {
      return [{ default: true, icon: "fa-solid fa-rotate", text: "Updating", href: "update.js" }]
    } else if (running.reset) {
      return [{ default: true, icon: "fa-solid fa-broom", text: "Resetting", href: "reset.js" }]
    } else if (installed) {
      if (running.start) {
        const local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-cube",
            text: "Open Editor",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal", text: "Terminal", href: "start.js"
          }]
        }
        return [{ default: true, icon: "fa-solid fa-terminal", text: "Starting", href: "start.js" }]
      }
      return [{
        default: true, icon: "fa-solid fa-power-off", text: "Start", href: "start.js"
      }, {
        icon: "fa-solid fa-rotate", text: "Update", href: "update.js"
      }, {
        icon: "fa-solid fa-plug", text: "Reinstall", href: "install.js"
      }, {
        icon: "fa-solid fa-broom", text: "Reset", href: "reset.js",
        confirm: "Remove the upstream app and dependencies? Export scenes first."
      }, {
        icon: "fa-solid fa-book", text: "README", href: "README.md?raw=true"
      }]
    }
    return [{
      default: true, icon: "fa-solid fa-plug", text: "Install", href: "install.js"
    }, {
      icon: "fa-solid fa-book", text: "README", href: "README.md?raw=true"
    }]
  }
}
