pipeline {

  environment {
    PROJECT = "wishbone-delicatessen"
    APP_NAME = "wishbone-deli"
    FE_SVC_NAME = "${APP_NAME}-entrypoint"
    CLUSTER = "jenkins-cd"
    CLUSTER_ZONE = "us-east1-d"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    JENKINS_CRED = "${PROJECT}"

    // credentials
    RECAPTCHA_API_KEY = credentials('RECAPTCHA_API_KEY')
    GOOGLE_MAPS_JAVASCRIPT_API_KEY = credentials('GOOGLE_MAPS_JAVASCRIPT_API_KEY')
    GOOGLE_USER_EMAIL = credentials('GOOGLE_USER_EMAIL')
    GOOGLE_OAUTH2_CLIENT_ID = credentials('GOOGLE_OAUTH2_CLIENT_ID')
    GOOGLE_OAUTH2_CLIENT_SECRET = credentials('GOOGLE_OAUTH2_CLIENT_SECRET')
    GOOGLE_OAUTH2_REFRESH_TOKEN = credentials('GOOGLE_OAUTH2_REFRESH_TOKEN')
  }

  agent {
    kubernetes {
      label 'wishbonedeli.ca-slave' // name of the Jenkins node
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: node
    image: node:12
    command:
    - cat
    tty: true
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
    }
  }

  stages {
    stage('Test') {
      steps {
        container('node') {
          sh """
            npm i
            RECAPTCHA_API_KEY=${RECAPTCHA_API_KEY} \
            GOOGLE_MAPS_JAVASCRIPT_API_KEY=${GOOGLE_MAPS_JAVASCRIPT_API_KEY} \
            GOOGLE_USER_EMAIL=${GOOGLE_USER_EMAIL} \
            GOOGLE_OAUTH2_CLIENT_ID=${GOOGLE_OAUTH2_CLIENT_ID} \
            GOOGLE_OAUTH2_CLIENT_SECRET=${GOOGLE_OAUTH2_CLIENT_SECRET} \
            GOOGLE_OAUTH2_REFRESH_TOKEN=${GOOGLE_OAUTH2_REFRESH_TOKEN} \
            npm test
          """
        }
      }
    }
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh """
          gcloud builds submit --config=cloudbuild.yaml \
          --substitutions=_RECAPTCHA_API_KEY=${RECAPTCHA_API_KEY},_GOOGLE_MAPS_JAVASCRIPT_API_KEY=${GOOGLE_MAPS_JAVASCRIPT_API_KEY},_IMAGE_TAG=${IMAGE_TAG} \
          .
          """
        }
      }
    }
    stage('Deploy Production') {
      // Production branch
      when { branch 'master' }
      steps{
        container('kubectl') {
          // Change deployed image in canary to the one we just built
          sh("sed -i.bak 's#gcr.io/wishbone-delicatessen/wishbone-deli:1.0.0#${IMAGE_TAG}#' ./k8s/wd.yaml")

          // Copy over wd-secret from `default` to the current namespace
          sh("kubectl get secret wd-secret --namespace=default -oyaml | sed 's#default#production#' | kubectl apply --namespace=production -f - || true")

          step([
            $class: 'KubernetesEngineBuilder',
            namespace:'production',
            projectId: env.PROJECT,
            clusterName: env.CLUSTER,
            zone: env.CLUSTER_ZONE,
            manifestPattern: 'k8s/wd-service.yaml',
            credentialsId: env.JENKINS_CRED,
            verifyDeployments: false
          ])
          step([
            $class: 'KubernetesEngineBuilder',
            namespace:'production',
            projectId: env.PROJECT,
            clusterName: env.CLUSTER,
            zone: env.CLUSTER_ZONE,
            manifestPattern: 'k8s/wd.yaml',
            credentialsId: env.JENKINS_CRED,
            verifyDeployments: true
          ])
          // Print loadbalancer IP address
          sh("echo http://`kubectl --namespace=production get service/${FE_SVC_NAME} -o jsonpath='{.status.loadBalancer.ingress[0].ip}'` > ${FE_SVC_NAME}")
        }
      }
    }
    stage('Deploy Dev') {
      // Developer Branches
      when {
        not { branch 'master' }
      }
      steps {
        container('kubectl') {
          // Create namespace if it doesn't exist
          sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
          // Don't use public load balancing for development branches
          sh("sed -i.bak 's#LoadBalancer#ClusterIP#' ./k8s/wd-service.yaml")
          sh("sed -i.bak 's#gcr.io/wishbone-delicatessen/wishbone-deli:1.0.0#${IMAGE_TAG}#' ./k8s/wd-dev.yaml")

          // Copy over wd-secret from `default` to the current namespace
          sh("kubectl get secret wd-secret --namespace=default -oyaml | sed 's#default#${env.BRANCH_NAME}#' | kubectl apply --namespace=${env.BRANCH_NAME} -f - || true")

          step([
            $class: 'KubernetesEngineBuilder',
            namespace: "${env.BRANCH_NAME}",
            projectId: env.PROJECT,
            clusterName: env.CLUSTER,
            zone: env.CLUSTER_ZONE,
            manifestPattern: 'k8s/wd-service.yaml',
            credentialsId: env.JENKINS_CRED, verifyDeployments: false
          ])
          step([
            $class: 'KubernetesEngineBuilder',
            namespace: "${env.BRANCH_NAME}",
            projectId: env.PROJECT,
            clusterName: env.CLUSTER,
            zone: env.CLUSTER_ZONE,
            manifestPattern: 'k8s/wd-dev.yaml',
            credentialsId: env.JENKINS_CRED,
            verifyDeployments: true
          ])
          echo 'To access your environment run `kubectl proxy`'
          echo "Then access your service via http://localhost:8001/api/v1/proxy/namespaces/${env.BRANCH_NAME}/services/${FE_SVC_NAME}:80/"
        }
      }
    }
  }
}
