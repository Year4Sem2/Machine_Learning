# Introduction

This repository contains the implementation of a recommendation system using the Alternating Least Squares (ALS) algorithm with PySpark (a framework for big data processing). The ALS algorithm is a collaborative filtering technique commonly used in recommendation systems. It predicts user preferences for items (like movies, products, or music) by analyzing patterns in past user-item interactions (e.g., ratings, clicks, or purchases).

The recommendation system was tested on two different sizes of the MovieLens dataset: a smaller dataset with approximately 100,000 entries and a larger dataset with 32,000,000 entries. The results show that ALS algorithm perform better under a much larger size of dataset.

---

## Usage

The execution of this program relies on the usage of Docker containers so a dockerfile is necessary. For large dataset, please go to https://grouplens.org/datasets/movielens/ to gain access to the dataset. Download it as a zip file and subsequently extract it on the same level as the 'ml-latest-small' folder.

1. **Create an image using the dockerfile located inside the repository.**
2. **Run the container using the image you have just created in Step 1.**
3. **Inside the Docker container terminal, type in 'cd /app'.**
4. **Finally type 'python SparkALS.py'/'python SparkALS-32m.py' depending on which python script the user wants to run.**

