# -*- coding: utf-8 -*-
"""
Created on Mon May 28 11:09:55 2018

@author: Frank
"""

from pyspark.sql import SparkSession

from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.recommendation import ALS
from pyspark.sql import Row

from MovieLens import MovieLens

# import logging

# logging.basicConfig(level=logging.WARNING)
# logging.warning("This is a warning")
# logging.error("This is an error")
# import os
# os.environ['SPARK_HOME'] = r"C:\Users\coder_boy\Documents\apps\Spark"
# os.environ['PYSPARK_DRIVER_PYTHON'] = 'jupyter'
# os.environ['PYSPARK_DRIVER_PYTHON_OPTS'] = 'notebook'
# os.environ['PYSPARK_PYTHON'] = 'python'
# os.environ["JAVA_HOME"] = r"C:\Program Files\Java\jdk-17"
# os.environ["HADOOP_HOME"] = r"C:\hadoop"

if __name__ == "__main__":
    spark = SparkSession\
        .builder\
        .appName("ALSExample")\
        .getOrCreate()

    lines = spark.read.option("header", "true").csv("./ml-latest-small/ratings.csv").rdd

    ratingsRDD = lines.map(lambda p: Row(userId=int(p[0]), movieId=int(p[1]),
                                         rating=float(p[2]), timestamp=int(p[3])))
    
    ratings = spark.createDataFrame(ratingsRDD)
    
    (training, test) = ratings.randomSplit([0.8, 0.2])

    als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="movieId", ratingCol="rating",
              coldStartStrategy="drop")
    model = als.fit(training)

    predictions = model.transform(test)
    evaluator = RegressionEvaluator(metricName="rmse", labelCol="rating",
                                    predictionCol="prediction")
    rmse = evaluator.evaluate(predictions)
    print("Root-mean-square error = " + str(rmse))

    userRecs = model.recommendForAllUsers(10)
    
    user85Recs = userRecs.filter(userRecs['userId'] == 85).collect()
    
    spark.stop()

    ml = MovieLens()
    ml.loadMovieLensLatestSmall()
    #print("Root-mean-square error = " + str(rmse)) 
    for row in user85Recs:
        for rec in row.recommendations:
            print(ml.getMovieName(rec.movieId))

