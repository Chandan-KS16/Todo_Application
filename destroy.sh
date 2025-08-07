#!/bin/bash

REGION="ap-south-1"
CLUSTER_NAME="todo-cluster"

echo "Checking if cluster '$CLUSTER_NAME' exists in region '$REGION'..."

CLUSTER_EXISTS=$(aws eks describe-cluster --name "$CLUSTER_NAME" --region "$REGION" 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "No cluster found with name '$CLUSTER_NAME'. Nothing to destroy."
    exit 0
fi

echo "Cluster exists. Proceeding with cleanup..."
aws eks update-kubeconfig --region "$REGION" --name "$CLUSTER_NAME"

# Add cleanup commands here, e.g., deleting namespace
kubectl delete namespace todo-namespace || echo "Namespace not found or already deleted."

echo "Cleanup complete."
