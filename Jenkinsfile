pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    dockerImage = docker.build("my-image:${env.BUILD_ID}")
                }
            }
        }

        stage('Push Docker image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps go here
                // For example, you might use the Docker CLI or a Docker cloud service to deploy your image
                // sh 'docker run -d -p 80:80 my-image:${env.BUILD_ID}'
            }
        }
    }
}