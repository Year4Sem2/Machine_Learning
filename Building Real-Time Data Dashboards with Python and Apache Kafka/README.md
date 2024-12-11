# Introduction

This repository contains the implementation of a real-time voting system using Python and Apache Kafka. The context is assuming there are 3 parties: PAP, WP and SDP. The total number of voters is 1000. These 1000 voters are randomly voting for the respective parties.

The end result is that users would be able to access a local web server and observe the changes in the votes for the respective parties live on stream. They can also observe the dynamic pie chart showing the change in votes over time among the 3 parties. The figure below shows an instance of the dynamic pie chart!

![Flowchart](Voting_System.jpg)
---

## Usage

Make sure that your path is currently at the same level as 'app.py' file and 'docker-compose.yml' file. Make sure that your Docker engine is running and execute the following bash command.

```bash
docker-compose up --build
```
Afterwards, you can access the application in your browser at `http://localhost:5000`. Go to `http://localhost:5000/data-page` to view the dynamic pie chart!
