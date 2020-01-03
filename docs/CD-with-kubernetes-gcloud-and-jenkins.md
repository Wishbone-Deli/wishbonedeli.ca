

1. Create a Kubernetes Cluster
```sh
gcloud container clusters create jenkins-cd \
--num-nodes 3 \
--machine-type f1-micro \
--scopes "https://www.googleapis.com/auth/source.read_write,cloud-platform" \
--cluster-version 1.12
```
Note that machine type `f1-micro` and zone `us-east1` fall under 'GCP Free Tier'.
Create production namespace
`kubectl create ns production`

2. Download the GCloud credentials for the cluster
```sh
gcloud container clusters get-credentials jenkins-cd
Fetching cluster endpoint and auth data.
kubeconfig entry generated for jenkins-cd.
```

3. Download and install the helm binary
```sh
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.14.1-linux-amd64.tar.gz
tar zxfv helm-v2.14.1-linux-amd64.tar.gz
cp linux-amd64/helm .
```

4. Add yourself as a cluster administrator in the cluster's RBAC so that you can give Jenkins permissions in the cluster. Grant Tiller, the server side of Helm, the cluster-admin role in your cluster
```sh
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)
kubectl create serviceaccount tiller --namespace kube-system
kubectl create clusterrolebinding tiller-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```

5. Initialize Helm
```sh
./helm init --service-account=tiller
./helm repo update
```

6. Use the Helm CLI to deploy the chart with
```sh
./helm install -n cd stable/jenkins -f https://raw.githubusercontent.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes/master/jenkins/values.yaml --version 1.2.2 --wait
```

7. Configure the Jenkins service account to be able to deploy to the cluster.
```sh
kubectl create clusterrolebinding jenkins-deploy --clusterrole=cluster-admin --serviceaccount=default:cd-jenkins
```

8. Setup port forwarding to the Jenkins UI from the Cloud Shell
```sh
export POD_NAME=$(kubectl get pods -l "app.kubernetes.io/component=jenkins-master" -o jsonpath="{.items[0].metadata.name}")
kubectl port-forward $POD_NAME 8080:8080 >> /dev/null &
```
```sh
$ kubectl get svc
NAME               CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
cd-jenkins         10.35.249.67   <none>        8080/TCP    3h
cd-jenkins-agent   10.35.248.1    <none>        50000/TCP   3h
kubernetes         10.35.240.1    <none>        443/TCP     9h
```
Note that `cd-jenkins` and `cd-jenkins-agent` are used as slave nodes to generate the builds

9. Retrieve the admin password
```sh
printf $(kubectl get secret cd-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
```

10. Deploy the app
```sh
kubectl create ns production
kubectl --namespace=production apply -f k8s
```

11. Connect the repository the GCloud project (if needed)

12. Double check to see that kubernetes secrets have been configured (secrets are copied over from the `default` namespace)
```sh
kubectl create secret generic wd-secret --namespace=default \
  --from-literal=RECAPTCHA_API_KEY=${RECAPTCHA_API_KEY} \
  --from-literal=GOOGLE_MAPS_JAVASCRIPT_API_KEY=${GOOGLE_MAPS_JAVASCRIPT_API_KEY} \
  --from-literal=GOOGLE_USER_EMAIL=${GOOGLE_USER_EMAIL} \
  --from-literal=GOOGLE_OAUTH2_CLIENT_ID=${GOOGLE_OAUTH2_CLIENT_ID} \
  --from-literal=GOOGLE_OAUTH2_CLIENT_SECRET=${GOOGLE_OAUTH2_CLIENT_SECRET} \
  --from-literal=GOOGLE_OAUTH2_REFRESH_TOKEN=${GOOGLE_OAUTH2_REFRESH_TOKEN}
```
