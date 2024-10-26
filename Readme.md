# React + Nodejs Express Todos App (Dockerized)

## Contributors
- *Abdul Moiz:* Frontend, Backend, and MongoDB Connection + Docker File Creation  
- *Rayan:* Docker Application Containerization, Network Creation, Docker Container/Image Creation and Running  
- *Abdullah:* Testing Dockerfiles, Verifying Frontend-Backend Connections, and Documentation  


## Purpose
The React Todos App is a full-stack application that allows users to manage their tasks with a React frontend, a Node/Express backend, and a MongoDB database. The application is fully containerized using Docker, enabling easy deployment and scalability. This project demonstrates the power of Docker for simplifying the development and deployment process of multi-container applications.



## Requirements
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- MongoDB Docker Image (available on DockerHub)

## Setup

### Step 1: Clone the Repository

bash
git clone https://github.com/aJkal-abdulmoiz/react-todos-app.git
cd react-todos-app/todos-app


### Step 2: Clone the Repository

bash
git clone https://github.com/aJkal-abdulmoiz/react-todos-app.git
cd react-todos-app/todos-app


### Step 2: Create a Custom Network
- We’ll create a Docker network to enable communication between the containers.
bash
  docker network create mongo-network


### Step 3: Pull the MongoDB Image and Start the Container
bash
  docker pull mongo-express


- We’ll create a Docker volume to persist MongoDB data:(optional if we want data to persist Locally on that system)
bash
  docker volume create mongo-data

docker run -p 27017:27017 -d \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  --name mongodb \
  --net mongo-network \
  mongo


-This command will:
Start the MongoDB container on port 27017
Create the default admin user with admin:password credentials
Attach the container to the mongo-network




### Step 4: Build and Run the Backend Container
- Navigate to the backend/ directory:
bash
  cd backend


- Build the backend Docker image:
bash
  docker build -t todos-backend .


- Run the backend container:
bash
  docker run -d -p 5000:5000 \
  --name todos-backend-container \
  --net mongo-network \
  todos-backend



### Step 5: Build and Run the Frontend Container
- Navigate to the frontend/ directory:

bash
  cd ../frontend


- Build the frontend Docker image:
bash
  docker build -t todos-frontend .


- Run the frontend container:
bash
  docker run -d -p 3000:3000 \
  --name todos-frontend-container \
  --net mongo-network \
  todos-frontend


##Environment Variables
##The following environment variables are required:

###For Backend Container:
*MONGODB_URI:* Set to *mongodb://admin:password@mongodb:27017/your-database-name*
- Update the backend configuration to use this MONGODB_URI when connecting to MongoDB.




# Using Docker Compose ( Optional *Using docker-compose.yml file*)
We also did used a Docker Compose to manage the frontend, backend, and MongoDB services easily. Below is the docker-compose.yml file:

bash
version: '3'
services:
  frontend:
    build: ./todos-app/frontend
    ports:
      - "3000:3000"

  backend:
    build: ./todos-app/backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    volumes:
      - backend-data:/app/data  

  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db  

volumes:
  backend-data:
  mongo-data:



## To build and run all services:

bash
  docker-compose up -d



# Testing the Application

### Step 6: Verify Running Containers
 bash
  docker ps

- This will display all running containers, including todos-frontend-container, todos-backend-container, and mongodb.



### Step 7: Access the Application
- *Frontend*: Open your browser and visit http://localhost:3000
- *Backend*: Visit the backend API at http://localhost:5000
- *MongoDB*: Connect to the MongoDB instance via mongodb://admin:password@localhost:27017 using a MongoDB client.



### Step 8: Testing Backend-Frontend Communication
Create a new task on the frontend and ensure it is properly saved in the backend and reflected in MongoDB.


### Step 9: Stopping and Removing Containers
- Stopped all running containers:
bash
  docker stop todos-frontend-container todos-backend-container mongodb


### Step 10: Stopping and Removing Containers
- Removed the stopped containers:
bash
  docker rm todos-frontend-container todos-backend-container mongodb


# Cleaning Up Docker Resources
- ##Remove unused Docker images and volumes:
bash
  docker system prune -f
  docker volume prune -f
