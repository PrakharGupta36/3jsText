import * as THREE from "three";

// init

const scene = new THREE.Scene();

// red cube

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

