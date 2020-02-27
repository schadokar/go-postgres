# Go-Postgres

This project is simple CRUD application built in golang and using PostgreSQL as DB.
This project is explained in this [tutorial].

## Pre-requisite
1. Install golang v1.11 or above.
2. Basic understanding of the golang syntax.
3. Basic understanding of SQL query.
4. Code Editor (I recommend to use VS Code with Go extension by Microsoft installed)
5. Postman for calling APIs
  
## PostgreSQL Table

```sql
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  name TEXT,
  age INT,
  location TEXT
);
```

## Author

I am Shubham Chadokar. I am Software Engineer and work mostly on backend development.
I love write the articles and tutorials on Golang, Nodejs, Blockhain.
You can read all my articles and tutorials [here](https://schadokar.dev).  
