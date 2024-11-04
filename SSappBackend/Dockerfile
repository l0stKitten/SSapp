# Use the official Ubuntu image as a base
FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Install necessary packages
RUN apt-get update && \
    apt-get install -y curl \
                       git \
                       build-essential \
                       zlib1g-dev \
                       libbz2-dev \
                       liblzma-dev \
                       libncurses5-dev \
                       libncursesw5-dev \
                       wget \
                       python3 \
                       python3-venv \
                       python3-pip

# Create and activate a virtual environment
RUN python3 -m venv /env
ENV PATH="/env/bin:$PATH"

# Copy the application directories into the container
COPY BACKEND /app/BACKEND

# Ensure star.py is executable
RUN chmod +x /app/BACKEND/bilstm_api.py

# Install Python dependencies for your app
COPY BACKEND/requirements.txt /app/BACKEND/requirements.txt
WORKDIR /app/BACKEND
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Expose the application's port
EXPOSE 5000

# Command to run your application
ENTRYPOINT ["python3", "/app/BACKEND/bilstm_api.py"]