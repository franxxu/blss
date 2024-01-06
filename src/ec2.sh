#!/bin/bash
yum update -y
# ---install mongodb
# ******create yum repo file
echo "creating yum repo file" >> /var/log/userdata.log
echo "[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc" > /etc/yum.repos.d/mongodb-org-7.0.repo
echo "******yum repo file created" >> /var/log/userdata.log

# install mongosh with openssl
echo "******installing mongosh with openssl" >> /var/log/userdata.log
yum install -y mongodb-mongosh-shared-openssl3 &>> /var/log/userdata.log
echo "******mongosh with openssl installed" >> /var/log/userdata.log

# install mongodb
echo "******installing mongodb" >> /var/log/userdata.log
yum install -y mongodb-org &>> /var/log/userdata.log
echo "******mongodb installed" >> /var/log/userdata.log

# start mongodb as service
echo "******starting mongodb as service and enable reboot" >> /var/log/userdata.log
systemctl start mongod &>> /var/log/userdata.log
systemctl enable mongod &>> /var/log/userdata.log
echo "******mongod started" >> /var/log/userdata.log

# ---installing nodejs & pm2
echo "******installing nodejs & pm2" >> /var/log/userdata.log
dnf update &>> /var/log/userdata.log
dnf upgrade &>> /var/log/userdata.log
dnf install -y nodejs &>> /var/log/userdata.log
npm install -g pm2 &>> /var/log/userdata.log
echo "******nodejs & pm2 installed" >> /var/log/userdata.log

# ---installing git
echo "******starting git" >> /var/log/userdata.log
dnf install -y git &>> /var/log/userdata.log
echo "******git installed" >> /var/log/userdata.log

# git clone https://github.com/franxxu/blss.git
# echo "NODE_ENV=development
#      PORT=80
#      DATABASE_LOCAL=mongodb://127.0.0.1:27017/blss" > config.env

# pm2 startup
# pm2 start server.js --name "blss"
# pm2 save
