FROM public.ecr.aws/lambda/nodejs:14@sha256:209eaa0ac09c930273a46e4bf1b5bac729e04ccc6f8fb9943cb26e2028c67fde
ENV NODE_ENV=production
WORKDIR /var/task/
COPY main.js main.js.map package.json package-lock.json ./
COPY assets ./assets
RUN npm install
CMD ["main.handler"]
