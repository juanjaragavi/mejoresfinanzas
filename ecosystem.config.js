module.exports = {
  apps: [
    {
      name: "financial-blog-template",
      script: "serve",
      args: "dist -s -l 3000",
      cwd: "/var/www/html/financial-blog-template",
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
