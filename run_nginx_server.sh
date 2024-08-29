docker run --name dacs2024-nginx \
	-v ./web-app:/usr/share/nginx/html:ro \
	-v ./nginx.conf:/etc/nginx/nginx.conf:ro \
	-v ./dist/urbancheck-front-app/browser/:/web-app:ro \
	-d -p 80:80 nginx

