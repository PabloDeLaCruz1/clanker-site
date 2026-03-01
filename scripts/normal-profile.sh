#!/usr/bin/env bash
set -euo pipefail

# Revert to a conservative normal profile (AC power)
sudo pmset -c sleep 1
sudo pmset -c displaysleep 10
sudo pmset -c disksleep 10
sudo pmset -c powernap 1
sudo pmset -c tcpkeepalive 1

pmset -g custom
