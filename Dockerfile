FROM ubuntu:22.04
WORKDIR /src
ENV DEBIAN_FRONTEND="noninteractive"

COPY .devcontainer/bashrc.sh /root/.bashrc
COPY .devcontainer/profile.sh /root/.profile

RUN apt-get update

RUN apt-get install -y build-essential curl vim nano git

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm i -g npm
