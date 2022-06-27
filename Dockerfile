FROM node:8.11.1

WORKDIR /usr/src/smart-brain

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
