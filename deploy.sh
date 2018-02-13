eval $(docker-machine env dev)


docker build . -t jtmain:latest -f node.dockerfile

docker tag jtmain:latest us.gcr.io/jvents-1150/jtmain:latest
gcloud docker -- push us.gcr.io/jvents-1150/jtmain:latest

gcloud container images list --repository us.gcr.io/jvents-1150

gcloud container images list-tags us.gcr.io/jvents-1150/jtmain