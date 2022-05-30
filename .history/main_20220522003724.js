import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(.35,.35,.35);
const material = new THREE.MeshLambertMaterial({});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = { width: window.innerWidth, height: window.innerHeight };

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.setAnimationLoop(animation);

// controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();


// light
var m = { x: 0, y: 0 };
var pos = { x: 0, y: 0 };

window.addEventListener("mousemove", function (e) {
  m.x = e.clientX;
  m.y = e.clientY;
  pos.x = (m.x / window.innerWidth) * 2 - 1;
  pos.y = ((m.y / window.innerHeight) * 2 - 1) * -1;
  light.target.position.set(pos.x * lightZoom, pos.y * lightZoom, lightZoom);
  light.target.updateMatrixWorld();
});

scene.add(pointLight);

function animation(time) {
  console.log(pointLight.position.x, pointLight.position.y);
  renderer.render(scene, camera);
}
