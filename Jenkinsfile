pipeline {
  agent any
  tools {
    nodejs 'Node_24' // Configurado en Global Tools
  }
  stages {
    // Etapa 1: Checkout
    stage('Checkout') {
        steps {
            git branch: 'main', url: 'https://github.com/nicolas1996-ing/ucp-app.git'
        }
    }

    // Etapa 2: Build
    stage('Build') {
        steps {
            sh 'npm install'
            sh 'npm run build'
        }
    }

    // Etapa 3: Pruebas Paralelizadas
    stage('Pruebas en Paralelo') {
      parallel {
        // Pruebas en Chrome
        stage('Pruebas Chrome') {
          steps {
            script {
              try {
                sh 'JEST_JUNIT_OUTPUT=junit-chrome.xml npm test -- --browser=chrome --watchAll=false --ci --reporters=jest-junit'
                junit 'junit-chrome.xml'
              } catch (err) {
                echo "Pruebas en Chrome fallaron: ${err}"
                currentBuild.result = 'UNSTABLE'
              }
            }
          }
        }
        // Pruebas en Firefox
        stage('Pruebas Firefox') {
          steps {
            script {
              try {
                sh 'JEST_JUNIT_OUTPUT=junit-firefox.xml npm test -- --browser=firefox --watchAll=false --ci --reporters=jest-junit'
                junit 'junit-firefox.xml'
              } catch (err) {
                echo "Pruebas en Firefox fallaron: ${err}"
                currentBuild.result = 'UNSTABLE'
              }
            }
          }
        }
      }
    }

    // Etapa 4: Deploy Simulado
    stage('Deploy a Producción (Simulado)') {
      steps {
        script {
          // Crear carpeta "prod" y copiar build
          sh 'mkdir -p prod && cp -r build/* prod/'
          echo "¡Deploy simulado exitoso! Archivos copiados a /prod"
        }
      }
    }
  }

  post {
    always {
       mail(
        to: 'josenicolasaristizabalramirez@gmail.com',
        subject: "Build Status: ${currentBuild.currentResult}",
        body: "Job: ${env.JOB_NAME}\nEstado: ${currentBuild.currentResult}\nURL: ${env.BUILD_URL}"
      )
      // Limpiar workspace
      cleanWs()
    }
  }
}
