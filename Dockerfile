FROM mrnehu/base-typescript:prod-latest
RUN apk add --no-cache git openssh-client && \
	ssh-keygen -f ~/.ssh/id_rsa -C "git-deploy" && \
	echo 'StrictHostKeyChecking no' >> /etc/ssh/ssh_config
COPY . .
RUN yarn install && yarn run build
