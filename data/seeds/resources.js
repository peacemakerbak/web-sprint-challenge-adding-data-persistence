exports.seed = async function (knex) {
    await knex("resources").insert([
      {
        resource_name: "Wood",
        resource_description: "Pine wood for construction",
      },
      {
        resource_name: "Nails",
        resource_description: "Steel nails for joining wood",
      },
    ]);
  };