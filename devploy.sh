eval $(docker-machine env dev)

docker stop jtmain_node_app

docker rm jtmain_node_app
docker build . -t jtmain:latest -f node.dockerfile
docker run -d --net=bridge --name jtmain_node_app -p 80:8080 jtmain:latest 