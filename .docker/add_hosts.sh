CONTAINER_NAME=$1
DOMAIN=$2
if [ -z $CONTAINER_NAME ]; then
  printf "Please provide a valid container name\n"
  exit 1
fi
if [ -z $DOMAIN ]; then
  printf "Please provide a valid domain name\n"
  exit 1
fi

ip_list=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{printf  " " }}{{end}}' "$CONTAINER_NAME")

(cat /etc/hosts | grep -q $DOMAIN) && (echo "detected an entry of $DOMAIN in /etc/hosts, removing.." && sudo sed -i "/$DOMAIN/d" "/etc/hosts")

for ip in $ip_list; do
    printf "Adding %s as an IP address for %s\n" $ip $DOAMIN
    echo "$ip $DOMAIN" | sudo tee -a /etc/hosts > /dev/null
done

traceroute $DOMAIN

