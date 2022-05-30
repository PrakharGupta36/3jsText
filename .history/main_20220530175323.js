import * as THREE from "three";
import "./style.css";
import * as dat from "dat.gui";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const scene = new THREE.Scene();
const gui = new dat.GUI();
const file = document.getElementById("file");
gui.closed = false;

const parameters = {
  color: 0xff0000,
  background: 0xde5353,
  loadFile: () => {
    file.click();
  },
};

// font
const loader = new FontLoader();
loader.load("./fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry = new TextGeometry("Hello three.js!", {
    font: font,
    size: 1.5,
    height: 2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const textMesh = new THREE.Mesh(geometry, [
    new THREE.MeshPhongMaterial({}),
    new THREE.MeshPhongMaterial({ color: "black" }),
  ]);
  textMesh.castShadow = true;
  geometry.center();
  scene.add(textMesh);

  const donutGeometry = new THREE.TorusBufferGeometry(0.5, 0.1, 20, 45);
  const donutMaterial = new THREE.MeshPhongMaterial({ color: "lightgreen" });

  for (let i = 0; i < 350; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    donut.position.x = (Math.random() - 0.5) * 30;
    donut.position.y = (Math.random() - 0.5) * 30;
    donut.position.z = (Math.random() - 0.5) * 30;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    

    scene.add(donut);
  }
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (e) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animation);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
renderer.setClearColor(parameters.background);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 20;

// controls

const controls = new OrbitControls(camera, canvas);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// tweaks

gui.addColor(parameters, "background").onChange(() => {
  renderer.setClearColor(parameters.background);
});

// animation
const clock = new THREE.Clock();
function animation(time) {
  const elaspedTime = clock.getElapsedTime();

  controls.update();


  renderer.render(scene, camera);
}
