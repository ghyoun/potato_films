# <img src="https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg" width="40px"> FreshPotatoes.com

* **Our tech stack**: Node, JavaScript, Express, SQLite
* **Time allowed**: 3 hours
* **Rules**: Open book (use whatever docs you need!)

## Overview

You work for FreshPotatoes.com, a website where users write reviews for actors and movies.  

The website team needs your help. They want to allow external partners - like Netflix and HBOGo - to access their data.  The FreshPotatoes team has defined a RESTful API they want you to build.

Fork this repo, read through the instructions, and get to work! Submit a pull request when ready.

---

## Codebase

The FreshPotatoes API service is separate from their customer-facing web application.  In this repo, you'll find the code that powers their API: starter code and tests built with Node, Express, Mocha, and SQLite.  The database schema is also provided - read through the entity-relationship diagram for more context:

<p align="center">
  <img src="https://i.imgur.com/MuWQUfS.png">
</p>

Once you’ve cloned your fork, install the node modules: `$ npm install`

Then, run your application:  `$ npm start`

To run integration tests, run: `$ npm test`

*NOTE*: Do not modify the test suite provided.

#### Relevant Documentation

* [Node.js v6 docs](https://nodejs.org/dist/latest-v6.x/docs/api/)
* [ExpressJS API docs](http://expressjs.com/en/4x/api.html)
* [SQLite docs](https://www.sqlite.org/docs.html)
* [NPM sqlite package](https://www.npmjs.com/package/sqlite)
* [NPM sqlite package API reference](https://github.com/mapbox/node-sqlite3/wiki/API)

---


## Requirements

Satisfy the two user stories below and make the provided tests pass.

Keep performance in mind - the films table has 10,000 entries, and the reviews has 30,000 entries.

Make sure to return the proper [HTTP response code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) code based on the result of the request. Each API endpoint should also handle failure, and the server should handle missing routes.

---


#### User Story 1

*"As an external developer, I want to use the FreshPotatoes API to access and display film reviews for users browsing films on my site."*

To satisfy this story: build an API endpoint that retrieves reviews of a film. The endpoint should allow developers to:

* Sort ascending or descending
* Order by another field
* Paginate by offset
* Limit number of returned records

API documentation is below - it includes information about the endpoints, parameters, and response formats.

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

*"As an external developer, I want to use the FreshPotatoes API to access and display recommended films based on a user's viewing history."*

To satisfy this story: build a recommendations API endpoint that retrieves film recommendations based on a given film id. The retrieved films should have been released within **15 years (± 15 years)** of the parent film. The endpoint should allow developers to:

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

Complete the requirements above to the best of your ability.  Submit a pull request with frequent commits and descriptive commit messages.

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
