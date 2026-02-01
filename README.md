# Microservice Deployment Across Two VirtualBox VMs

## What this repo contains
- **backend/**: VM2 backend microservice (Express) on port **3000**
- **gateway/**: VM1 API gateway (Express + Axios) on port **4000**, calls VM2 over the host-only network

## Target architecture
- **VM1 (API Gateway):** 192.168.56.101
- **VM2 (Backend):** 192.168.56.102
- Communication: VM1 -> VM2 via `http://192.168.56.102:3000/api/data`

## Prerequisites
- Oracle VirtualBox + Extension Pack
- Ubuntu Server 22.04 on both VMs
- Host-only network `vboxnet0` created and **DHCP disabled**
- Node.js 18 installed via **NVM** on both VMs

## Networking (VirtualBox)
For **each VM**:
- Adapter 1: **NAT**
- Adapter 2: **Host-only Adapter** -> `vboxnet0`

Static IPs (Netplan):
- VM1: `192.168.56.101/24` on `enp0s8`
- VM2: `192.168.56.102/24` on `enp0s8`

## Install Node.js 18 (NVM) - run on both VMs
```bash
sudo apt update
sudo apt install -y curl ca-certificates
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
nvm alias default 18
node -v
npm -v
```

## Run the backend on VM2
```bash
cd ~/microservice-virtualbox/backend
npm install
npm start
```

Test on VM2:
```bash
curl http://localhost:3000/api/data
```

Test from VM1:
```bash
curl http://192.168.56.102:3000/api/data
```

## Run the gateway on VM1
```bash
cd ~/microservice-virtualbox/gateway
npm install
npm start
```

Test on VM1:
```bash
curl http://localhost:4000/fetch
```

## Troubleshooting
### Ping works but `curl` says `No route to host`
- Ensure `enp0s8` exists and has the correct IP on both VMs:
  ```bash
  ip a
  ip route | grep 192.168.56
  ```
- Ensure Host-only DHCP is **disabled** (prevents duplicate IPs).
- If UFW is enabled on VM2:
  ```bash
  sudo ufw allow 3000/tcp
  sudo ufw allow from 192.168.56.0/24
  ```

### Gateway says `Backend not reachable`
- Backend is not running, or VM2 port 3000 blocked
- Confirm listening:
  ```bash
  ss -tulpn | grep :3000
  ```

## License
For academic use.
