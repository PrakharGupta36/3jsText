import * as THREE from "three"

let scene, camera, renderer, cube, ambientLight, pointLight;

let mouse = {
  x: 0,
  y: 0,
};

init();
render();

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas").appendChild(renderer.domElement);

  // Camera
  let screenWidth = window.innerWidth,
    screenHeight = window.innerHeight,
    viewAngle = 75,
    nearDistance = 0.1,
    farDistance = 1000;
  camera = new THREE.PerspectiveCamera(
    viewAngle,
    screenWidth / screenHeight,
    nearDistance,
    farDistance
  );
  camera.position.z = 0.75;
  camera.lookAt(scene.position);

  // Lights
  // Ambient light
  ambientLight = new THREE.AmbientLight(0x333333, 0.25);
  scene.add(ambientLight);

  // Point light
  pointLight = new THREE.PointLight(0xaaaaaa, 0.35);
  pointLight.position.set(0, 0, 0);
  pointLight.castShadow = true;
  pointLight.shadow.bias = 0.0001;
  pointLight.mapSizeWidth = 2048; // Shadow Quality
  pointLight.mapSizeHeight = 2048; // Shadow Quality
  scene.add(pointLight);

  // Cube
  let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  let cubeMaterial = new THREE.MeshPhongMaterial({
    // Required For Shadows
    color: 0x888888,
    specular: 0x000000,
    shininess: 10,
  });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(0, 0, -1);
  cube.rotation.x = 10;
  cube.rotation.y = 20;
  scene.add(cube);

  // Listeners
  document.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("resize", onResize);
}

// Render Loop
function render() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}

// On mouse move
function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);
  let dir = vector.sub(camera.position).normalize();
  let distance = -camera.position.z / dir.z;
  let pos = camera.position.clone().add(dir.multiplyScalar(distance));
  pointLight.position.copy(pos);
}

// On resize
function onResize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
