# <img src="https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg" width="40px"> FreshPotatoes.com

* **Our tech stack**: Node, JavaScript, Express, SQLite, Sequelize
* **Time allowed**: 3 hours
* **Rules**: Open book (use whatever docs you need!)

## Overview

You work for FreshPotatoes.com, a Wiki for information related to films and artists.  

The website team needs your help. They want to allow external partners - like Netflix and HBOGo - to access their data.  The FreshPotatoes team has defined a RESTful API endpoint they want you to build.

Fork this repo, read through the instructions, and get to work! Submit a pull request when ready.

---

## The FreshPotatoes Tech

#### Codebase

The FreshPotatoes API service will be separate from their customer-facing web application.  In this repo, you'll find the code that will power their API: starter code and tests built with Node, Express, Mocha, SQLite, and Sequelize.

Once you’ve cloned your fork, install the node modules: `$ npm install`

Then, run your application:  `$ npm start`

To run integration tests, run: `$ npm test`

*NOTE*: Do not modify the existing tests provided.

#### Database


The database schema is also provided. To interact with the database console: `$ sqlite3 db/database.db`.

*NOTE*: Do not write to the database.

Read through the entity-relationship diagram for more context:

<p align="center">
  <img src="https://i.imgur.com/eAuzbPZ.png">
</p>

#### 3rd Party API

The FreshPotatoes database has been developed using keys from a third-party service called ReviewMonkey, a place where fans can write reviews about their favorite movies.  As part of this project, FreshPotatoes wants you to use data from ReviewMonkey's review table.  This table, pictured below, can be accessed via ReviewMonkey's API.

<p align="center">
  <img src="https://i.imgur.com/jIBH0jh.png">
</p>

#### Relevant Documentation

* [Node.js v6 docs](https://nodejs.org/dist/latest-v6.x/docs/api/)
* [ExpressJS API docs](http://expressjs.com/en/4x/api.html)
* [SQLite docs](https://www.sqlite.org/docs.html)
* [NPM sqlite package](https://www.npmjs.com/package/sqlite)
* [NPM sqlite package API reference](https://github.com/mapbox/node-sqlite3/wiki/API)
* [Sequelize docs](http://docs.sequelizejs.com/en/v3/)
* [ReviewMonkey API](#)

You may use either the base `sqlite` package or the `Sequelize` ORM for your solution.

---


## Requirements

Satisfy the user story below and make the provided tests pass.

To the best of your abilities, adhere to the [styleguide](styleguide.md) provided.  

Be mindful that the FreshPotatoes tech team is looking for production-level code. As you implement your solution, think about maintainability, extensibility, security, and performance.

---

#### User Story

*"As a third-party developer who doesn't work for FreshPotatoes, I want to use the FreshPotatoes API to get a list of recommended films related to one film."*

To satisfy this story: build a recommendations API endpoint that retrieves top-rated film recommendations. Top-rated films are defined as films with an average review rating **greater than 4.0** and have a **minimum of 10 reviews**. The films retrieved should have been released within **15 years (± 15 years)** of the parent film.

The recommended films returned should:

* Include films with the same genre or director
* Be ordered by matching genres, then directors, then cast members

The endpoint should allow developers to:

* Paginate by offset
* Limit the number of returned records

Finally, the endpoint should handle for:

* Client/server failure
* Missing routes

##### List Recommendations

Returns a list of top-rated films released within **15 years (± 15 years)** related to the matched film.

```

GET /films/:film_id/recommendations

```

**Parameters**

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>limit</td>
    <td>integer</td>
    <td>(optional)
The desired number of results returned.
 <strong>Default: 10</strong></td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional)
Specifies the first entry to be returned from the collection.
 <strong>Default: 1</strong></td>
  </tr>
</table>


**Successful Response**

```
{
  "recommendations" : [
    {
      "id": 109,
      "title": "Reservoir Dogs",
      "releaseDate": "09-02-1992",
      "genre": "Action",
      "directors": ["Quentin Tarantino"],
      "starring": ["Harvey Keitel", "Tim Roth", "Michael Madsen" ],
      "averageRating": 4.2,
      "reviews": 202
    },
    {
      "id": 102,
      "title": "Jackie Brown",
      "releaseDate": "09-15-1997",
      "genre": "Action",
      "directors": ["Quentin Tarantino"],
      "starring": ["Pam Grier", "Samuel L. Jackson", "Robert Forster"],
      "averageRating": 4.1,
      "reviews": 404
    },
    {
      "Id": 85,
      "title": "True Romance",
      "releaseDate": "09-25-1993",
      "genre": "Action",
      "directors": ["Quentin Tarantino"],
      "starring": ["Christian Slater", "Patricia Arquette", "Dennis Hopper"],
      "averageRating": 4.0,
      "reviews": 165098
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0
  }
}

```

**Failure Response**

```
{
  "message" : "Return an explicit error here"
}
```

---


## Deliverables

Submit a pull request with frequent commits and descriptive commit messages.

---


## Evaluation

Your code will be evaluated based on the following criteria:

<table>
  <tr>
    <td><strong>Criteria</strong></td>
    <td><strong>Description</strong></td>
    <td><strong>Measured by</strong></td>
    <td><strong>How?</strong></td>
    <td><strong>Weight</strong></td>
  </tr>
  <tr>
    <td>Functionality</td>
    <td>Whether output appears and behaves as specified</td>
    <td>Performance against provided tests </td>
    <td>Code is run against test suite</td>
    <td>50%</td>
  </tr>
  <tr>
    <td>Efficiency</td>
    <td>Computational effort required to run code</td>
    <td>Complexity, speed, # service calls </td>
    <td>Cyclomatic/Halstead metrics; runtime</td>
    <td>25%</td>
  </tr>
  <tr>
    <td>Style</td>
    <td>Whether code adheres to styleguide and is easily maintained</td>
    <td>Consistency, readability, maintainability</td>
    <td>Linting violations, readability metrics, dependencies</td>
    <td>25%</td>
  </tr>
</table>

---

## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
