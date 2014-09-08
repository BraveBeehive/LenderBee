POSTGRES INSTALLATION

1) terminal -> brew install postgresql pay attention to the caveats section of the install

2) Once installation is complete, create a database: initdb /usr/local/var/postgres -E utf8

3) To startup the postgres server, open a new tab in terminal and: command -> postgres -D /usr/local/var/postgres

4) You should see something like this: LOG: database system is ready to accept connections LOG: autovacuum launcher started

5) Now that the server is up, open up a new tab and create a new database: terminal -> creatdb databaseNameGoesHere;

6) To access the database: terminal -> psql databaseNameGoesHere;

7) To have your server communicate with your postgres server, edit the database.js in the var knex = require to match the user, password, and database name that you specified.

8) If you do not have a user and password, you can create one in the same tab that you are logged into the database (not the server tab) terminal -> CREATE ROLE usernameGoesHere with login password 'passwordGoesHere';//(need quotes for password)