module.exports = {
  apps: [
    {
      name: "mejoresfinanzas",
      script: "serve",
      args: "dist -s -l 3000",
      cwd: "/var/www/html/mejoresfinanzas",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
