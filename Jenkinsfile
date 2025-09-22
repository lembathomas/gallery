pipeline {
  agent any

  triggers {
    githubPush()  // triggers build when you push to GitHub
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'node server.js &'
      }
    }

    stage('Deploy to Render') {
      steps {
        // Deployment strategy depends on Render setup
        // Usually Render auto-deploys when GitHub repo updates
        echo "Triggering Render deployment..."
      }
    }
  }
}

