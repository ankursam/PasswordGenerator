FROM scratch
ADD app.js /Users/Ankur/Downloads/passwordgenerator2/app.js
ADD node_modules /Users/Ankur/Downloads/passwordgenerator2/node_modules
ADD package.json /Users/Ankur/Downloads/passwordgenerator2/package.json
ADD public/ /Users/Ankur/Downloads/passwordgenerator2/public/*
ADD views/  /Users/Ankur/Downloads/passwordgenerator2/views/*
ADD bin/ /bin/*
WORKDIR /Users/Ankur/Downloads/passwordgenerator2/

RUN node app.js
