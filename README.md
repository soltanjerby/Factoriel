# Factoriel

This app helps you calculate the factorial of a given number n. You can get the result by navigating to http://localhost:8080/fact?n=5 after cloning and serving the application.

## Prerequisites

Node
Azure account
Azure cli
AKS (Azure Kubernetes Service)

## Steps

1- Create a kubernetes cluster in Azure
2- Deploy our application
3- Installing Prometheus and Grafana
4- Enjoying the App!

## Create a kubernetes cluster in Azure

You can navigate to Kubernetes Service after logging into your Azure account.
Then create a new cluster and configure it.
Don't forget to enable the http_application_routing addon while configuring your cluster.
Connect to your newly created cluster through Azure CLI once it's deployed and ready to be used
If you forgot to enable the http_application_routing addon just run this command after connecting to your cluster:

```bash
az aks enable-addons --resource-group skander_group --name factoriel --addons http_application_routing
```

## Deploy our application

Before applying the files in the k8s directory of this repo, you should display your cluster host using this command

```bash
az aks show --resource-group skander_group --name factoriel --query addonProfiles.httpApplicationRouting.config.HTTPApplicationRoutingZoneName -o table
```

Then copy and paste it in the ingress.yaml file to replace <Cluster_Host>
Now apply all the files by using these commands

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

Navigate to your <Cluster_Host> and enjoy your deployed app.

## Installing Prometheus and Grafana

To monitor our application and cluster, we need to use Prometheus and Grafana.
To install it, run these commands

```bash
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace --set prometheusOperator.admissionWebhooks.enabled=false --set prometheusOperator.admissionWebhooks.patch.enabled=false --set prometheusOperator.tlsProxy.enabled=false

helm install grafana grafana/grafana \
--namespace monitoring \
--set persistence.storageClassName="default" \
--set persistence.enabled=true \
--values ./grafana/datasources.yaml \
--set service.type=LoadBalancer
```

You can now display your exposed ip through which you can access you grafana dashboard by using this command

```bash
kubectl get svc --namespace monitoring -w grafana
```

Your username should be admin and you can get your password by using this command

```bash
kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

## Enjoying the App!

That's it! Your app is now deployed and can be monitored with grafana dashboard.
