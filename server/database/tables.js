// Import the repository modules responsible for handling data operations on the tables
const ItemRepository = require("./models/ItemRepository");
const ProjectRepository = require("./models/ProjectRepository");
const HomePageRepository = require("./models/HomeRepository");
const QuoteRepository = require("./models/QuoteRepository");
const MessagesRepository = require("./models/MessagesRepository");
const UserRepository = require("./models/UserRepository");
const CategoryRepository = require("./models/CategoryRepository");
const PictureRepository = require("./models/PictureRepository");
const ProjectSkillRepository = require("./models/ProjectSkillRepository");
const SkillRepository = require("./models/SkillRepository");
const StatusRepository = require("./models/StatusRepository");
const SkillCategoryRepository = require("./models/SkillCategoryRepository");

// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.item = new ItemRepository();
tables.project = new ProjectRepository();
tables.homePage = new HomePageRepository();
tables.quote = new QuoteRepository();
tables.message = new MessagesRepository();
tables.user = new UserRepository();
tables.category = new CategoryRepository();
tables.picture = new PictureRepository();
tables.project_skill = new ProjectSkillRepository();
tables.skill = new SkillRepository();
tables.status = new StatusRepository();
tables.skill_category = new SkillCategoryRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
