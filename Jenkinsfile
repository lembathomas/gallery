pipeline {
    agent any

    tools {
        nodejs "node20"   // Make sure this matches the NodeJS tool name in Jenkins
    }

    environment {
        RENDER_URL    = 'https://gallery.onrender.com'
        SLACK_CHANNEL = '#all-rc'
        EMAIL         = 'lembathomas@gmail.com'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Checking out repository..."
                git branch: 'master', url: 'https://github.com/lembathomas/gallery.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "🧩 Installing dependencies..."
                sh 'npm install'
            }
        }
    }

    post {
        success {
            echo "✅ Dependencies installed successfully!"
            slackSend(
                channel: "${env.SLACK_CHANNEL}",
                message: "✅ npm install completed successfully for build #${env.BUILD_NUMBER}! Site live at: ${env.RENDER_URL}"
            )
        }

        failure {
            echo "❌ npm install failed."
            mail to: "${env.EMAIL}",
                 subject: "❌ npm install Failed: #${env.BUILD_NUMBER}",
                 body: """
                    Hello Thomas,

                    The Jenkins build #${env.BUILD_NUMBER} failed during npm install for the Gallery App.

                    Check the Jenkins logs for details:
                    ${env.BUILD_URL}

                    Regards,
                    Jenkins
                 """
        }
    }
}
