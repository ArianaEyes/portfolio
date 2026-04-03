FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -g appgroup
USER appuser
WORKDIR /app/
RUN mkdir datos
COPY --chown=appuser:appgroup package*.json .
RUN npm install
COPY --chown=appuser:appgroup . . 
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]