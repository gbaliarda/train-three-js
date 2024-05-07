import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import image from './public/test.png'

// Constants
const WATER_COLOR = 0x90e0ef
const TRAIL_SCALE = 1
const TRAIN_SPEED = 60
const GRASS_COLOR = 0x00e335

// Initialize Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADD8E6);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Initialize Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.DirectionalLight(0xffffff, 1.0)
light.castShadow = true;
scene.add(light)

const loader = new THREE.TextureLoader();
const heightmap = loader.load('test.png');
const terrainSize = 500;

// Crear la geometría del terreno
const terrainGeometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 128, 128);
const waterGeometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 128, 128);


// Crear el material del terreno
const terrainMaterial = new THREE.MeshStandardMaterial({ color: GRASS_COLOR, map: heightmap, displacementMap: heightmap, displacementScale: 40, wireframe: false });
const waterMaterial = new THREE.MeshBasicMaterial({ color: WATER_COLOR });


const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
const water = new THREE.Mesh(waterGeometry, waterMaterial);

scene.add(terrain);
scene.add(water);
terrain.position.y = -14
water.position.y = -5
terrain.rotation.x = -Math.PI / 2
water.rotation.x = -Math.PI / 2


var points = [];
points.push(new THREE.Vector3(0, 1, 0));
points.push(new THREE.Vector3(100 * TRAIL_SCALE, 1, 0)); 
points.push(new THREE.Vector3(120 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE)); 
points.push(new THREE.Vector3(120 * TRAIL_SCALE, 1, -140 * TRAIL_SCALE));
points.push(new THREE.Vector3(100 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
points.push(new THREE.Vector3(20 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
points.push(new THREE.Vector3(-40 * TRAIL_SCALE, 1, -180 * TRAIL_SCALE));
points.push(new THREE.Vector3(-100 * TRAIL_SCALE, 1, -180 * TRAIL_SCALE));
points.push(new THREE.Vector3(-120 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
points.push(new THREE.Vector3(-120 * TRAIL_SCALE, 1, -40 * TRAIL_SCALE));
points.push(new THREE.Vector3(-100 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE));
points.push(new THREE.Vector3(-50 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE));
points.push(new THREE.Vector3(-5, 1, 0));
points.push(new THREE.Vector3(0, 1, 0));

const curve = new THREE.CatmullRomCurve3(points);
const trackShape = new THREE.Shape();

trackShape.lineTo(0, 1.5); 
trackShape.lineTo(2, 3); 
trackShape.lineTo(2, -3);
trackShape.lineTo(0, -1.5);


const leftRailShape = new THREE.Shape();
leftRailShape.moveTo(0, -0.5);
leftRailShape.lineTo(0.5, -0.5); 
leftRailShape.lineTo(0.5, -0.75);
leftRailShape.lineTo(0, -0.75);
leftRailShape.lineTo(0, -0.5);

const rightRailShape = new THREE.Shape();
const distanciaY = 1;
rightRailShape.moveTo(0, distanciaY - 0.25);
rightRailShape.lineTo(0.5, distanciaY - 0.25); 
rightRailShape.lineTo(0.5, distanciaY - 0.5); 
rightRailShape.lineTo(0, distanciaY - 0.5);
rightRailShape.lineTo(0, distanciaY - 0.25);

const extrudeSettings = {
    steps: 100,
    bevelEnabled: false,
    extrudePath: curve
};

const trackGeometry = new THREE.ExtrudeGeometry([trackShape], extrudeSettings);
const railGeometry = new THREE.ExtrudeGeometry([leftRailShape, rightRailShape], extrudeSettings);
const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x7d1d00 });
const railMaterial = new THREE.MeshStandardMaterial({ color: 0x1c1c1c });
const track = new THREE.Mesh(trackGeometry, trackMaterial);
const rail = new THREE.Mesh(railGeometry, railMaterial);
track.position.y += 1
rail.position.y += 1.25

scene.add(track);
scene.add(rail);

const trainGeometry = new THREE.BoxGeometry(6, 10, 6)
const trainMaterial = new THREE.MeshStandardMaterial( {color: 0x000000 } ); 
const train = new THREE.Mesh( trainGeometry, trainMaterial ); 
scene.add( train );

train.position.set(0, 7, 0)

camera.position.set( 0, 100, 100 );
camera.lookAt( 0, 0, 0 );

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

const clock = new THREE.Clock();
let trainProgress = 0;

function moveTrain() {
	const delta = clock.getDelta();

	trainProgress += 0.001 * TRAIN_SPEED * delta;

	if (trainProgress >= 1) {
        trainProgress = 0;
    }

    let trainPosition = curve.getPointAt(trainProgress);
	trainPosition.setY(7)

    train.position.copy(trainPosition);

    let trainTangent = curve.getTangentAt(trainProgress);
    train.rotation.y = -Math.atan2(trainTangent.z, trainTangent.x);

}

function animate() {
	requestAnimationFrame( animate );

	moveTrain()

	controls.update();

	renderer.render( scene, camera );
}


animate();