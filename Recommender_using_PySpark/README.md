# Introduction

This repository contains the implementation of ROSMO, a Regularized One-Step Model-based algorithm for Offline-RL, introduced in our paper *"Efficient Offline Policy Optimization with a Learned Model"*. We provide the training codes for both Atari and BSuite experiments, and have made the reproduced results on `Atari MsPacman` publicly available at [W&B](https://wandb.ai).

---

## Usage

The execution of this program relies on the usage of Docker containers so a dockerfile is necessary. For large dataset, please go to https://grouplens.org/datasets/movielens/ to gain access to the dataset. Download it as a zip file and subsequently extract it on the same level as the 'ml-latest-small' folder.

1. **Create an image using the dockerfile located inside the repository.**
2. **Run the container using the image you have just created in Step 1.**
3. **Inside the Docker container terminal, type in 'cd /app'.**
4. **Finally type 'python SparkALS.py'/'python SparkALS-20m.py' depending on which python script the user wants to run.**

