# ![](https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg) FreshPotatoes.com 

* Tech stack: Node, JavaScript, Express, SQLite

* Time allowed: 3 hours

* Rules: open book, closed human

**Overview**

You work for FreshPotatoes.com, a website that collects anonymous reviews about films.  Their online platform allows administrators to create, read, edit, and delete data relating to films, and allows users to view film data and create/edit their personal reviews. 

FreshPotatoes.com needs your help. They want to allow external partners - like Netflix and HBOGo - to access their data.  The FreshPotatoes team has defined a RESTful API to be built.

* * *


**Codebase **

The FreshPotatoes API service is separate from their customer-facing web application.  You have been provided with starter code and tests built with Node, Express, Mocha, and SQLite, and the database schema has been created - read through the entity-relationship diagram for more context: 

![image alt text](image_0.png)

Below is a preview of the application dependencies laid out in a package.json file:

<table>
  <tr>
    <td>{
  "name": "Fresh Potatoes",
  "version": "2.0.1",
  "description": "Your freshest place for film-related data",
  "keywords": [],
  "author": "Mr. Potato Head",
  "main": "index",
  "scripts": {
    "test": "mocha spec test",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "3.4.x",
    "handlebars": "1.0.x",
    "sqlite3”: “3.1.x” 
  },
  "devDependencies": {
    "mocha": "1.10.x",
  },
  "engines": {
    "node": ">= 6.8.1"
  }
}
</td>
  </tr>
</table>


The codebase can be cloned from github.com/example-path, and the data and database are already set up in a .database.db file.

Once you’ve cloned, install the node modules: $ npm install

Then, run your application:  $ npm start

* * *


**Requirements**

The tech team wants you to satisfy the two user stories below by building two API endpoints and will look to see the tests you’ve been provided with have passed. 

The endpoints should adhere to the [JSend API](https://labs.omniti.com/labs/jsend) format by responding with the following types:

* Success - a valid request was made, a valid response was delivered (outlined below)

* Fail - invalid data or call conditions from the client

* Errors - a server error

To help satisfy these stories, set up your local database, query the database, setup the endpoints, and make the provided tests pass. Keep performance in mind - for the films table has 10,000 entries, and the reviews has 30,000 entries.

*NOTE*: Do not modify the test suite provided. 

* * *


**User Story 1**

*"As an external developer, I want to access data using the FreshPotatoes API so that I can display film reviews for films my users are interested in watching."*

To satisfy this story: build an API endpoint that retrieves reviews of a film. The endpoint should allow developers to:

* Sort

* Order

* Paginate

* Set a maximum number of returned records

Read on to see the documentation about the API endpoints, parameters, and what the expected success responses should look like.  

<table>
  <tr>
    <td>GET /films/:id/reviews

> Returns a matching film and a list of the latest reviews for that film</td>
  </tr>
</table>


Parameters - Reviews Endpoint

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
The sort order of the "recommendations" data. 
Possible values: asc, desc
Default: desc</td>
  </tr>
  <tr>
    <td>order_by</td>
    <td>string</td>
    <td>(optional) 
The data field of the “recommendations” data to sort by. 
Possible values: date, rating
Default: date</td>
  </tr>
  <tr>
    <td>entries</td>
    <td>integer</td>
    <td>(optional) 
The desired number of review results returned.
 Default: 10</td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional) 
Specifies the first entry to be returned from the collection.
 Default: 1</td>
  </tr>
</table>


Responses - Reviews Endpoint  application/json

<table>
  <tr>
    <td>{
    status : "success",
    parent: "www.freshpotatoes.com/films/100",
    data : {
        "reviews" : [
            { "id" : 10, "rating" : 3, “description”: “This movie was ok”},
            { "id" : 120, "rating" : 5, “description”: “This movie was great”},
            { "id" : 124, "rating" : 1, “description”: “The film was terrible”},
            { "id" : 201, "rating" : 4, “description”: “Movie was very good”},
        ]
     }
}
</td>
  </tr>
</table>


* * *


**User Story 2**

*"As an external developer, I want to access data using the FreshPotatoes API so that I can create film recommendations for my users based on their viewing history."*

To satisfy this story: build a recommendations API endpoint that retrieves film recommendations based on a parent film’s id. The retrieved filmes should have been released within 15 years (± 15) of the parent. The endpoint should allow developers to:

* Sort

* Order

* Paginate

* Set a maximum number of returned records

In order of relevance, the recommended films returned should include films with the same:

1. genre, director, and cast members

2. genre and director

3. director 

4. genre and release year

5. genre  

<table>
  <tr>
    <td>GET /recommendations/:film_id

> Returns a matching film and a list of top-rated films released within 15 years (± 15 years) related to the matched film</td>
  </tr>
</table>


Parameters - Recommendations Endpoint

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
The sort order of the "recommendations" data. 
Possible values: asc, desc
Default: desc</td>
  </tr>
  <tr>
    <td>order_by</td>
    <td>string</td>
    <td>(optional) 
The data field of the “recommendations” data to sort by. 
Possible values: release date, film rating, title
Default: release date</td>
  </tr>
  <tr>
    <td>entries</td>
    <td>integer</td>
    <td>(optional) 
The desired number of results returned.
 Default: 10</td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional) 
Specifies the first entry to be returned from the collection.
 Default: 1</td>
  </tr>
</table>


Responses - Recommendations Endpoint application/json

<table>
  <tr>
    <td>{
    status : "success",
    parent: "www.freshpotatoes.com/films/100",
    data : {
        "recommendations" : [
            {
              “id”: 109, 
              “title”: “Reservoir Dogs”, 
              “releaseDate”: “09-02-1992”,
              “genre”: “Action”, 
              “director”: “Quentin Tarantino”,
              “starring”: [“Harvey Keitel”, “Tim Roth”, “Michael Madsen” ], 
              “averageRating”: 4.2,
              “reviews”: 202
         },
            { 
              “id”: 102, 
              “title”: “Jackie Brown”, 
              “releaseDate”: “09-15-1997”,
              “genre”: “Action”, 
              “director”: “Quentin Tarantino”,
              “starring”: ["Pam Grier", "Samuel L. Jackson", "Robert Forster"], 
              “averageRating”: 3.8,
              “reviews”: 404
         },
            {
              “Id”: 85, 
              “title”: “True Romance”, 
              “releaseDate”: “09-25-1993”,
              “genre”: “Action”, 
              “director”: “Quentin Tarantino”,
              “starring”: ["Christian Slater", "Patricia Arquette", "Dennis Hopper"], 
              “averageRating”: 4.0,
              “reviews”: 165,098
         },
        ]
     }
}</td>
  </tr>
</table>


* * *


**Deliverables**

Complete the requirements above to the best of your ability.  Upload a Git repository with frequent commits and descriptive commit messages.

* * *


**Evaluation**

Your code will be evaluated on the following criteria: 

<table>
  <tr>
    <td>Criteria</td>
    <td>Description</td>
    <td>Measured by</td>
    <td>How?</td>
    <td>Weight</td>
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



