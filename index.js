const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const idList = [];
const teamMembers = [];

const appMenu = () => {
  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",
        },

        {
          type: "input",
          name: "internId",
          message: "What is your intern's ID?",
        },

        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
        },

        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );

        teamMembers.push(intern);
        idList.push(answers.internId);
        //console.log(intern);
        createTeam();
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
        },

        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's ID?",
        },

        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
        },

        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's github?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );

        teamMembers.push(engineer);
        idList.push(answers.engineerId);
        //console.log(engineer);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member do you want to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members.",
          ],
        },
      ])
      .then((userChoice) => {
        if (userChoice.memberChoice === "Engineer") {
          // Adding engi function here
          addEngineer();
        } else if (userChoice.memberChoice === "Intern") {
          //Adding intern function here
          addIntern();
        } else {
          //building team function

          buildTeam();
        }
      });
  }
  function createManager() {
    console.log("Please build your team!");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the name of the team manager?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }

            return "Please enter at least one character";
          },
        },

        {
          type: "input",
          name: "managerId",
          message: "What is the team manager's ID?",
        },

        {
          type: "input",
          name: "managerEmail",
          message: "What is the manager's email?",
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the team manager's office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        // console.log(manager);
        teamMembers.push(manager);
        idList.push(answers.managerId);

        createTeam();
      });
  }

  createManager();
};

appMenu();
