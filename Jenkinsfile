pipeline {
    agent any

    stages {
        stage('Pull Master') {
            steps {
               bat 'git pull origin master'
            }
        }
        stage('NPM Install for UI') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\projectmanager\\ui"){
                    bat 'npm install'
                } 
            }
        }
        stage('NPM Install for Middleware') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\projectmanager\\middleware"){
                    bat 'npm install'
                }                
            }
        }
        stage('Create UI Build') {
            steps {
                dir("${JENKINS_HOME}\\workspace\\projectmanager\\ui"){
                    bat 'npm run ng -- build --prod'
                }                
            }
        }
    }
}
