import os
import json
import time
import random
from flask import Flask, jsonify, render_template
from kafka import KafkaProducer, KafkaConsumer

# Flask app setup
app = Flask(__name__)

# Kafka configuration
# KAFKA_TOPIC = "truck-data"
KAFKA_TOPIC = "votes"
KAFKA_BOOTSTRAP_SERVERS = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")

# Retry until Kafka is available
while True:
    try:
        # Kafka Producer
        producer = KafkaProducer(
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode("utf-8"),
        )
        break
    except Exception as e:
        print(f"Waiting for Kafka... {e}")
        time.sleep(5)

# @app.route("/data", methods=["GET"])
# def produce_data():
#     """Generate dynamic truck data and send to Kafka"""
#     truck_data = {
#         "truck_id": random.randint(1, 100),  # Random truck ID
#         "location": {
#             "lat": round(random.uniform(-90, 90), 6),  # Random latitude
#             "lon": round(random.uniform(-180, 180), 6),  # Random longitude
#         },
#     }
#     producer.send(KAFKA_TOPIC, truck_data)  # Send to Kafka topic
#     return jsonify({"message": "Data sent to Kafka", "data": truck_data})
votes = {"PAP": 0, "WP": 0, "SDP": 0}
total_voters = 1000
total_votes_cast = 0
@app.route("/data", methods=["GET"])
def produce_data():
    """Generate dynamic truck data and send to Kafka"""
    global total_votes_cast
    # votes = {"PAP": 0, "WP": 0, "SDP": 0}
    # total_voters = 500
    # total_votes_cast = 0
    # for _ in range(total_voters):
    #     # Randomly select a party to vote for
    #     party = random.choice(list(votes.keys()))
    #     votes[party] += 1
    #     producer.send(KAFKA_TOPIC, votes)  # Send to Kafka topic
    #     # Add a small delay to simulate real-time voting
    #     # time.sleep(8)
    # return jsonify({"message": "Data sent to Kafka", "data": votes})
    if total_votes_cast < total_voters:
        # Randomly select a party to vote for
        party = random.choice(list(votes.keys()))
        votes[party] += 1
        total_votes_cast += 1
        producer.send(KAFKA_TOPIC, votes)

    return jsonify({
        "data": votes,
        "message": f"Total votes cast: {total_votes_cast}"
    })

@app.route("/data-page", methods=["GET"])
def data_page():
    """Serve dynamic data page"""
    return render_template("data.html")

@app.route("/")
def dashboard():
    """Render dashboard"""
    return render_template("dashboard.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

