# Use official Python image
FROM python:3.8-slim

# Set working directory
WORKDIR /app

# Copy app code and install dependencies
COPY . /app
RUN pip install -r requirements.txt

# Expose port and run the app
EXPOSE 5000
CMD ["python", "app.py"]
