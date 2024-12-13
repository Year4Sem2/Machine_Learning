from flask import Flask, jsonify
from flask_cors import CORS
import random
from kafka import KafkaProducer
import json
import os
import time

app = Flask(__name__)
CORS(app)

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

# Voting data
votes = {"PAP": 0, "WP": 0, "SDP": 0}
total_votes_cast = 0
max_voters = 500

@app.route("/data", methods=["GET"])
def get_votes():
    """Return current voting data."""
    global votes, total_votes_cast

    # Increment votes only if total_votes_cast < max_voters
    if total_votes_cast < max_voters:
        party = random.choice(list(votes.keys()))
        votes[party] += 1
        total_votes_cast += 1
        producer.send(KAFKA_TOPIC, votes)

    return jsonify({"data": votes, "message": f"Total votes cast: {total_votes_cast}"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
