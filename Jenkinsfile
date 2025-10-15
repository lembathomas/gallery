pipeline {
    agent any
    tools {
        nodejs 'nodjs24'
    }

    triggers {
        githubPush()
    }

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
        // Render deployment stage removed
    }

    post {
        always {
            echo 'Notification stage executed.'
        }

        success {
            emailext(
                to: 'lembathomas@gmail.com',
                subject: "Build: ${currentBuild.fullDisplayName} succeeded! View deployed app: https://gallery-f7s2.onrender.com",
                body: "The deployment was successful. Check build details at ${env.BUILD_URL}"
            )

            slackSend(
                channel: '#all-rc',
                tokenCredentialId: 'slack-webhook2',
                color: 'good',
                message: "Build: ${currentBuild.fullDisplayName} succeeded! View deployed app: https://gallery-f7s2.onrender.com"
            )
        }

        failure {
            emailext(
                to: 'lembathomas@gmail.com',
                subject: "Failed Deployment: ${currentBuild.fullDisplayName}",
                body: "The deployment failed. Check details at ${env.BUILD_URL}"
            )

            slackSend(
                channel: '#all-rc',
                tokenCredentialId: 'slack-webhook2',
                color: 'danger',
                message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} failed. ${env.BUILD_URL}"
            )
        }
    }
}
