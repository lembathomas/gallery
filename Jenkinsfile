pipeline {
    agent any
        tools {
          nodejs 'nodeJs-24'
        }

    triggers {
        githubPush() // Trigger build on GitHub push
    }
// Build Stages
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/lembathomas/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Running Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'DEPLOY_HOOK')]) {
                    sh 'curl -X POST $DEPLOY_HOOK'
                }
            }
        }
    }
    post {
        always {
            echo 'Notification stage executed.'
        }
        // Success deployment notification
        success {
            emailext(
                to: 'lembathomas@gmail.com',
                subject: "Build: ${currentBuild.fullDisplayName} succeeded!\n View deployed app: https://gallery-f7s2.onrender.com",
                body: "The deployment was successful. Check the details at ${env.BUILD_URL}"
            )

            slackSend(
                channel: '#all-rc',
                tokenCredentialId: 'slack-webhook2',
                color: 'good',
                message: "Build: ${currentBuild.fullDisplayName} succeeded!\n View deployed app: https://gallery-f7s2.onrender.com"
            )

        }
        // Failure deployment notification
        failure {
            // email notification
            emailext(
                to: 'lembathomas@gmail.com',
                subject: "Failed Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment failed. Check the details at ${env.BUILD_URL}"
            )
            // slack notification
            slackSend(
                channel: '#all-rc',
                tokenCredentialId: 'slack-webhook2',
                color: 'danger',
                message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.\n${env.BUILD_URL}"
            )

        }
    }

}
