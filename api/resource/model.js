// build your `Resource` model here
const db = require("../../data/dbConfig");

function add(resource) {
  return db("resources")
    .insert(resource)
    .then((ids) => {
      const [id] = ids;
    
      return findById(id);
    })
    .catch((error) => {
      console.error("Error inserting resource:", error); 
     
    });
}


function findById(id) {
  return db("resources").where({ resource_id: id }).first();
}
function getAll() {
  return db("resources");
}

module.exports = {
  add,
  findById,
  getAll
};