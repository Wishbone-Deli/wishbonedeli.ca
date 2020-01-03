FROM node:12 as intermediate

WORKDIR /usr/src/build
COPY package.json .
RUN npm i

ARG RECAPTCHA_API_KEY=my_api_key
ARG GOOGLE_MAPS_JAVASCRIPT_API_KEY=google_maps_javascript_api_key
ENV RECAPTCHA_API_KEY=${RECAPTCHA_API_KEY}
ENV GOOGLE_MAPS_JAVASCRIPT_API_KEY=${GOOGLE_MAPS_JAVASCRIPT_API_KEY}

COPY . .
RUN npm run build

FROM node:12

WORKDIR /usr/src/app
COPY --from=intermediate /usr/src/build .
COPY public .
CMD ["npm", "start"]
