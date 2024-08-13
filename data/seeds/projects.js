exports.seed = async function (knex) {
    await knex("projects").insert([
      {
        project_name: "Build a garden shed",
        project_description: "Construct a small garden shed.",
        project_completed: false,
      },
      {
        project_name: "Develop a web application",
        project_description: "Create a full-stack web application.",
        project_completed: false,
      },
    ]);
  };