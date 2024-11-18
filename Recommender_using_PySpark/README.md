# Introduction

This repository contains the implementation of ROSMO, a Regularized One-Step Model-based algorithm for Offline-RL, introduced in our paper *"Efficient Offline Policy Optimization with a Learned Model"*. We provide the training codes for both Atari and BSuite experiments, and have made the reproduced results on `Atari MsPacman` publicly available at [W&B](https://wandb.ai).

---

## Usage

The execution of this program relies on the usage of Docker containers so a dockerfile is necessary.

1. **Create an image using the dockerfile located inside the repository.**
2. **Run the container using the image you have just created in Step 1.**

---

## Usage

### BSuite

To run the BSuite experiments, please ensure you have downloaded the [datasets](link-to-datasets) and placed them at the directory defined by `CONFIG.data_dir` in `experiment/bsuite/config.py`.

1. **Debug run.**
    ```bash
    python experiment/bsuite/main.py -exp_id test -env cartpole
    ```

2. **Enable W&B logger and start training.**
    ```bash
    python experiment/bsuite/main.py -exp_id test -env cartpole -nodebug -use_wb -user ${WB_USER}
    ```