FROM node

RUN mkdir /home/app && groupadd -r app && useradd -d /home/app -r -g app app && chown app:app -R /home/app

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN chown app:app -R ./

USER app

ENTRYPOINT ["npm", "run"]
CMD ["start"]
