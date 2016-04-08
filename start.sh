docker run --rm \
	-v data_pages:/data \
	-v data_pages:/app/keys \
	-p 4000:5000 \
	-e DEPLOY_BRANCH=gl-pages \
	-e DEPLOY_PAGEDIR=/data \
	-e SERVER_URL=http://pages.example.com \
	-e GITLAB_URL=http://git.example.com \
	pages
