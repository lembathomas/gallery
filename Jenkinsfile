pipeline {
    agent any

    environment {
        // Change these values to your actual details
        RENDER_URL = 'https://gallery.onrender.com'   // your Render deployment URL
        SLACK_CHANNEL = '#all-rc'                // your Slack channel name
        EMAIL = 'lembathomas@gmail.com'             // your email for failure notifications
    }

    triggers {
        githubPush()   // auto-trigger on push
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/lembathomas/gallery.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
		sh 'export PATH=$PATH:/usr/local/bin && npm install'
         }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'node server.js &'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "Render will auto-deploy since the repo is connected"
            }
        }
    }

    post {
        failure {
            mail to: "${env.EMAIL}",
                 subject: "❌ Build Failed: #${env.BUILD_NUMBER}",
                 body: "Build ${env.BUILD_NUMBER} failed. Check Jenkins for details."
        }

        success {
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                message: "✅ Build #${env.BUILD_NUMBER} succeeded! Live at: ${env.RENDER_URL}"
            )
        }
    }
}
