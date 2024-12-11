# Use Python image
FROM python:3.8-slim

# Set working directory
WORKDIR /app

# Copy files to the container
COPY . /app

# Install dependencies
RUN pip install flask kafka-python

# Expose Flask port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
