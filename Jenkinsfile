/*  
Khadija Kobra
G01120432
Arnab Debnath
G01120433
Jenkinsfile to build and push image to docker and deploying the updated image to the cluster
*/

pipeline{
	agent any 
	environment{
		registry = "khadijakobra/hw3_angular1"
		DOCKERHUB_PASS = "docker645"
		 unique_Id = UUID.randomUUID().toString()
		
	}
	stages{
		stage("Building jar"){
			steps{
				script{
					checkout scm
					sh 'echo ${BUILD_TIMESTAMP}'
					sh 'docker login  -u khadijakobra -p ${DOCKERHUB_PASS}'
					def customimage=docker.build("khadijakobra/hw3_angular1:${BUILD_ID}")
					

					
			}

		}

	}
	stage("Pushing image to DockerHub"){
		steps{
			script{
				sh 'docker push khadijakobra/hw3_angular1:${BUILD_ID}'
			}
		}
	}
		
	stage("Rancher single pod deploy"){
	         steps{
	         	//sh 'kubectl set image deployment/hw2image hw2image=khadijakobra/hw2:${BUILD_ID} --kubeconfig /var/lib/jenkins/.kube/config -n hw2'
	         	sh 'kubectl set image deployment/hw3image hw3image=khadijakobra/hw3_angular1:${BUILD_ID} --kubeconfig /var/lib/jenkins/.kube/config --insecure-skip-tls-verify -n hw3' 
	         }
	    }
	

}




}
