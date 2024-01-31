pipeline {
    agent Agent
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Build') {
            steps {
                // checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'Github', url: 'https://github.com/Induprojects/Capstone-Project.git']])
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/RomainC75/three_data_viz.git']])
                sh 'npm install'
                // sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // sh 'npm run test'
                echo "Test"
            }
        }
       stage('Build Image') {
            steps { 
                sh 'docker build -t reactimage .'
                sh 'docker tag reactimage:latest indumathicloud001/dev:latest'
            }    
       }
       stage('Docker login') {
            steps { 
                withCredentials([usernamePassword(credentialsId: 'Dockercred', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh 'docker push indumathicloud001/dev:latest'
                }
            }
       }
       stage('Deploy') {
            steps {  
                script {
                   def dockerCmd = 'docker run -itd --name My-first-container -p 80:5000 indumathicloud001/dev:latest'
                   sshagent(['sshkeypair']) {
                   sh "ssh -o StrictHostKeyChecking=no ubuntu@54.86.64.88 ${dockerCmd}"
                   }
                }
            }
       }
    }
}