module.exports = {
  apps: [
    {
      name: "ranel-preview",
      cwd: "/home/user/webapp",
      script: "npx",
      args: "wrangler pages dev dist --ip 0.0.0.0 --port 3000",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: { NODE_ENV: "development" },
    },
  ],
};
