# Key-Value Store Backend on Kubernetes

This project demonstrates how to deploy a simple **Key-Value store** backend using **Express.js** and **MongoDB**, containerized and orchestrated via **Kubernetes** (Minikube). It uses dynamic volume provisioning and secure access via secrets and config maps.

<img width="2719" height="1763" alt="k8s" src="https://github.com/user-attachments/assets/d1d2a756-66eb-455a-807e-e19b42c60e89" />

## Architecture Overview

- **MongoDB StatefulSet** with a **headless service** for stable network identity.
- **PersistentVolumeClaim (PVC)** for data persistence using Minikube's dynamic provisioning.
- **Secrets & ConfigMap** to manage database credentials and initialization script.
- **Express.js backend** application that connects to MongoDB using environment variables.
- **NodePort service** to expose the backend app outside the cluster.

## API Endpoints

| Method | Endpoint        | Description                  |
|--------|------------------|------------------------------|
| POST   | `/store`         | Create a key-value pair      |
| GET    | `/store/:key`    | Retrieve value by key        |
| PUT    | `/store/:key`    | Update existing value        |
| DELETE | `/store/:key`    | Delete a key-value pair      |

### Example Request Bodies

- **POST /store**
```json
{ "key": "foo", "value": "bar" }
```

- **PUT /store/foo**
```json
{ "value": "new-bar" }
```

##  Kubernetes Components

- `mongodb-statefulset`: MongoDB StatefulSet
- `mongodb-root-creds`: Root credentials (Secret)
- `mongodb-keyvaluedb-creds`: App DB user credentials (Secret)
- `mongodb-keyvaluedb-init`: Initialization script (ConfigMap)
- `mongodb-service`: Headless service for MongoDB
- `key-value-service`: NodePort service for Express backend
- `key-value-deployment`: Express.js backend deployment

---

> The backend image can be found on Docker Hub: `docker pull akjyy/key-value-app:1.0.0`\
> Make sure Minikube is running and Docker images are pushed to its environment. Then apply all manifests using `kubectl apply -f <manifest>.yaml`
