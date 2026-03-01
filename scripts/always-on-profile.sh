#!/usr/bin/env bash
set -euo pipefail

# Always-on profile (AC power)
sudo pmset -c sleep 0
sudo pmset -c displaysleep 10
sudo pmset -c disksleep 10
sudo pmset -c powernap 0
sudo pmset -c tcpkeepalive 1

pmset -g custom
