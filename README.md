# <img src="https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg" width="40px"> FreshPotatoes.com

* **Our tech stack**: Node, JavaScript, Express, SQLite
* **Time allowed**: 3 hours
* **Rules**: Open book (use whatever docs you need!)

## Overview

You work for FreshPotatoes.com, a website that collects anonymous reviews about films.  Their online platform allows administrators to create, read, edit, and delete data relating to films, and allows users to view film data and create/edit their personal reviews.

FreshPotatoes.com needs your help. They want to allow external partners - like Netflix and HBOGo - to access their data.  The FreshPotatoes team has defined a RESTful API to be built.

Read through the instructions below, fork/clone the codebase, and submit a pull request when ready!

---

## Codebase

The FreshPotatoes API service is separate from their customer-facing web application.  You have been provided with starter code and tests built with Node, Express, Mocha, and SQLite, and the database schema has been created - read through the entity-relationship diagram for more context:

<p align="center">
  <img src="https://i.imgur.com/MuWQUfS.png">
</p>

All the files needed to start the server are in this repository. The data and database are already set up in a `database.db` file.

Once you’ve cloned, install the node modules: `$ npm install`

Then, run your application:  `$ npm start`

To run integration tests, run `$ npm test`

### Relevant Documentation

* [Node.js v6 docs](https://nodejs.org/dist/latest-v6.x/docs/api/)
* [ExpressJS API docs](http://expressjs.com/en/4x/api.html)
* [SQLite docs](https://www.sqlite.org/docs.html)
* [NPM sqlite package](https://www.npmjs.com/package/sqlite)
* [NPM sqlite package API reference](https://github.com/mapbox/node-sqlite3/wiki/API)

---


## Requirements

The tech team wants you to satisfy the two user stories below by building two API endpoints and will look to see the tests you’ve been provided with have passed.

To help satisfy these stories, set up your local database, query the database, setup the endpoints, and make the provided tests pass. Keep performance in mind - for the films table has 10,000 entries, and the reviews has 30,000 entries.

Make sure to return the proper [HTTP response code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) based on the result of the request. Each API endpoint should properly handle failure, and the server should handle missing routes.

*NOTE*: Do not modify the test suite provided.

---


#### User Story 1

*"As an external developer, I want to access data using the FreshPotatoes API so that I can display film reviews for films my users are interested in watching."*

To satisfy this story: build an API endpoint that retrieves reviews of a film. The endpoint should allow developers to:

* Sort ascending or descending
* Order by another field
* Paginate by offset
* Limit number of returned records

Read on to see the documentation about the API endpoints, parameters, and what the expected success responses should look like.  

###### List Reviews

Returns a matching film and a list of the latest reviews for that film

```

GET /films/:id/reviews

```

**Parameters**

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>sort</td>
    <td>string</td>
    <td>(optional)
The sort order of the "review" data.
Possible values: asc, desc
<strong>Default: ASC</strong></td>
  </tr>
  <tr>
    <td>orderBy</td>
    <td>string</td>
    <td>(optional)
The data field of the “review” data to sort by.
Possible values: date, rating
<strong>Default: id</strong></td>
  </tr>
  <tr>
    <td>limit</td>
    <td>integer</td>
    <td>(optional)
The desired number of review results returned.
 <strong>Default: 10</strong></td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional)
Specifies the first entry to be returned from the collection.
 <strong>Default: 0</strong></td>
  </tr>
</table>


**Successful Response**

```
{
  "reviews" : [
    {
      "id": 10,
      "rating": 3,
      “description”: “This movie was ok”
    },
    {
      "id": 120,
      "rating": 5,
      “description”: “This movie was great”
    },
    {
      "id": 124,
      "rating": 1,
      “description”: “The film was terrible”
    },
    {
      "id": 201,
      "rating": 4,
      “description”: “Movie was very good”
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


#### User Story 2

*"As an external developer, I want to access data using the FreshPotatoes API so that I can create film recommendations for my users based on their viewing history."*

To satisfy this story: build a recommendations API endpoint that retrieves film recommendations based on a given film id. The retrieved films should have been released within **15 years (± 15 years)** of the parent. The endpoint should allow developers to:

* Paginate by offset
* Limit number of returned records

Ordered by relevance, the recommended films returned should include films with the same:

1. genre
2. director
3. cast members

###### List Recommendations

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
      “id”: 109,
      “title”: “Reservoir Dogs”,
      “releaseDate”: “09-02-1992”,
      “genre”: “Action”,
      “directors”: [“Quentin Tarantino”],
      “starring”: [“Harvey Keitel”, “Tim Roth”, “Michael Madsen” ],
      “averageRating”: 4.2,
      “reviews”: 202
    },
    {
      “id”: 102,
      “title”: “Jackie Brown”,
      “releaseDate”: “09-15-1997”,
      “genre”: “Action”,
      “directors”: [“Quentin Tarantino”],
      “starring”: ["Pam Grier", "Samuel L. Jackson", "Robert Forster"],
      “averageRating”: 3.8,
      “reviews”: 404
    },
    {
      “Id”: 85,
      “title”: “True Romance”,
      “releaseDate”: “09-25-1993”,
      “genre”: “Action”,
      “directors”: [“Quentin Tarantino”],
      “starring”: ["Christian Slater", "Patricia Arquette", "Dennis Hopper"],
      “averageRating”: 4.0,
      “reviews”: 165098
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

Complete the requirements above to the best of your ability.  Upload a Git repository with frequent commits and descriptive commit messages.

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
    <td>Provided feature and unit tests</td>
    <td>50%</td>
  </tr>
  <tr>
    <td>Efficiency</td>
    <td>Computational effort required to run code</td>
    <td>Complexity, speed, # service calls </td>
    <td>Cyclomatic/ Halstead metrics; runtime</td>
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
