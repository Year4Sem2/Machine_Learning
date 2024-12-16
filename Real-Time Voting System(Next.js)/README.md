# Introduction

This repository contains the implementation of a real-time voting system using Python, Apache Kafka and Next.js. It is an upgrade to the previous real-time voting system which only comprises of the Flask application script and the templates folder consisting of the html files.

The project focuses on ingesting streaming data, processing it in real-time, and visualizing the results through an interactive pie chart. While Flask is great for small-scale projects or prototypes, but transitioning to Next.js offers:

- **Scalability**: Next.js provides better support for large-scale applications, with its hybrid static and server rendering.

- **Modern Development Practices**: It integrates seamlessly with React, which is widely adopted for building dynamic user interfaces.

- **Industry Relevance**: Next.js is a popular choice for frontend and full-stack applications in modern web development, making project more relatable to current industry standards.

- **Ease of Maintenance**: With its modular structure, it's easier to maintain and extend compared to a Flask application with a single script.

- **Better Developer Tools**: The Next.js ecosystem includes tools for testing, debugging, and deploying, which are industry-standard.

The end result is that users would be able to access a local web server and observe the changes in the votes for the respective parties live on stream. They can also observe the dynamic pie chart showing the change in votes over time among the 3 parties. The figure below shows an instance of the dynamic pie chart!

![Flowchart](Voting_System(Next.js).jpg)
---

## Usage

Make sure that your path is currently at the same level as 'app.py' file and 'docker-compose.yml' file. Make sure that your Docker engine is running and execute the following bash command.

```bash
docker-compose up --build
```
Afterwards, you can access the application in your browser at `http://localhost:3000`. 