import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createBridge, createTerrain, createTrail, createTunnel, getTrailCurve } from './terrain';
import { createTrees } from './trees';
import { Sky } from 'three/examples/jsm/Addons.js';

const TRAIN_WIDTH = 5
const WAVE_SPEED = 0.05;
let TIME = "Day"

// Initialize Scene
const scene = new THREE.Scene();


const sky = new Sky();
sky.scale.setScalar( 1000 );

const camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera1.position.set(0, 70, 100);
camera1.rotation.set(0, 0, 0);
// Train frontal camera
const camera2 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera2.position.set(-5, 10, 0);
camera2.rotation.set(0, 4.7, 0);

// Train backwards camera
const camera3 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera3.position.set(-5, 10, 0);
camera3.rotation.set(0, 4.7 + Math.PI, 0);

const camera4 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera4.position.set(-140, 10, -40);
camera4.rotation.set(0, -0.5, 0);

const camera5 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera5.position.set(130, 5, 5);
camera5.rotation.set(0, 1.5, 0);

const camera6 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera6.position.set(0, 10, 50);
let activeCamera = 0
const cameras = [camera1, camera2, camera3, camera4, camera5, camera6]

// Initialize Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let trainSpeed = 0
const sceneLights = []

function addLights() {
    // scene.background = new THREE.Color(TIME == "Day" ? 0xADD8E6 : TIME == "Night" ? 0x001F3F : 0x000000);
    // const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, THREE.MathUtils.degToRad( TIME == "Day" ? 80 : 180 ), THREE.MathUtils.degToRad( 40 ) );

    sky.material.uniforms.sunPosition.value = new THREE.Vector3(0,0,0);

    sceneLights.forEach(light => {
        scene.remove(light);
    });
    sceneLights.length = 0;

    if (TIME == "Day") {

        const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, THREE.MathUtils.degToRad(20), THREE.MathUtils.degToRad(40) );
        sky.material.uniforms.sunPosition.value = sunPosition;

        const sunLight = new THREE.DirectionalLight(0xfff6e1, 0.8);
        sunLight.castShadow = true;
        sunLight.position.copy(new THREE.Vector3(1000,400,1000));

        sunLight.shadow.mapSize.width = 8192;
        sunLight.shadow.mapSize.height = 8192;
        sunLight.shadow.bias = -0.0005;
        sunLight.shadow.normalBias = 0.05;
    
        sunLight.shadow.camera.far = 3000;
        sunLight.shadow.camera.left = -500;
        sunLight.shadow.camera.right = 500;
        sunLight.shadow.camera.top = 500;
        sunLight.shadow.camera.bottom = -500;

        // const helper = new THREE.CameraHelper(sunLight.shadow.camera);
        // scene.add(helper);

        scene.add(sunLight);
        scene.add(sunLight.target);

        const ambientLight = new THREE.AmbientLight(0x808080, 0.8);
        scene.add(ambientLight);
        sceneLights.push(sunLight, ambientLight)
    } else if (TIME == "Night") {
        const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, THREE.MathUtils.degToRad(180), THREE.MathUtils.degToRad( 40 ) );

        sky.material.uniforms.sunPosition.value = sunPosition

        const moonLight = new THREE.DirectionalLight(0x888888, 0.1);
        moonLight.castShadow = true;
        moonLight.position.copy(new THREE.Vector3(1000,400,1000));

        moonLight.shadow.mapSize.width = 8192;
        moonLight.shadow.mapSize.height = 8192;
        moonLight.shadow.bias = -0.0005;
        moonLight.shadow.normalBias = 0.05;
    
        moonLight.shadow.camera.far = 3000;
        moonLight.shadow.camera.left = -500;
        moonLight.shadow.camera.right = 500;
        moonLight.shadow.camera.top = 500;
        moonLight.shadow.camera.bottom = -500;
        scene.add(moonLight);
        scene.add(moonLight.target);


        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        sceneLights.push(moonLight, ambientLight)

    }
}

createBridge(scene, new THREE.Vector3(70, -16, 1))

const trailCurve = getTrailCurve(scene)

const trainMaterial = new THREE.MeshStandardMaterial( {color: 0x900000 } );
const trainSecondaryMaterial = new THREE.MeshStandardMaterial( {color: 0xccc200 } );
const trainWheelBarEndMaterial = new THREE.MeshStandardMaterial( {color: 0x380000 } );
const textureLoader = new THREE.TextureLoader();
const wheelTexture = textureLoader.load('train_wheel.png');
const trainWheelMaterial = new THREE.MeshStandardMaterial( {map: wheelTexture } ); 
const trainWheelBarMaterial = new THREE.MeshStandardMaterial( {color: 0x888888 } ); 

const trainFrontCylinder = new THREE.CylinderGeometry( TRAIN_WIDTH / 2, TRAIN_WIDTH / 2, 6, 32 );
const trainFrontCylinder2 = new THREE.CylinderGeometry( TRAIN_WIDTH / 2 + 0.5, TRAIN_WIDTH / 2 + 0.5, 1, 32 );
const trainFrontCylinderMesh = new THREE.Mesh( trainFrontCylinder, trainMaterial ); 
trainFrontCylinderMesh.castShadow = true
trainFrontCylinderMesh.receiveShadow = true
const trainFrontCylinderMesh2 = new THREE.Mesh( trainFrontCylinder2, trainMaterial ); 
trainFrontCylinderMesh2.castShadow = true
trainFrontCylinderMesh2.receiveShadow = true
scene.add( trainFrontCylinderMesh );
scene.add( trainFrontCylinderMesh2 );

trainFrontCylinderMesh.position.y = 5
trainFrontCylinderMesh.rotation.z = Math.PI / 2
trainFrontCylinderMesh.position.x += 3
trainFrontCylinderMesh2.position.x += 6
trainFrontCylinderMesh2.position.y = 5
trainFrontCylinderMesh2.rotation.z = Math.PI / 2

const trainCabinLowerPlate = new THREE.BoxGeometry( TRAIN_WIDTH, TRAIN_WIDTH, 0.5);
const trainCabinFloor = new THREE.BoxGeometry( TRAIN_WIDTH * 2, TRAIN_WIDTH, 0.25);
const trainCabinFloorPlate = new THREE.BoxGeometry( TRAIN_WIDTH, 2, 0.75);
const trainCabinFloorBar = new THREE.BoxGeometry( TRAIN_WIDTH + TRAIN_WIDTH / 2, 1, 0.75);
const trainCabinRoof = new THREE.BoxGeometry( TRAIN_WIDTH + 1, TRAIN_WIDTH + 1, 0.5);
const trainCabinCollumn = new THREE.CylinderGeometry( 0.25, 0.25, 8, 32 );
const trainWheel = new THREE.CylinderGeometry( 1, 1, 0.5);
const trainWheelBar = new THREE.CylinderGeometry( 0.17, 0.17, 6.5);
const trainWheelBarEnd = new THREE.CylinderGeometry( 0.3, 0.3, 1.5);
const trainChimney = new THREE.CylinderGeometry( 0.35, 0.35, 2.5);
const trainCabinLowerPlateMesh = new THREE.Mesh( trainCabinLowerPlate, trainMaterial);
trainCabinLowerPlateMesh.castShadow = true
trainCabinLowerPlateMesh.receiveShadow = true
const trainCabinLowerPlateMesh2 = new THREE.Mesh( trainCabinLowerPlate, trainMaterial);
trainCabinLowerPlateMesh2.castShadow = true
trainCabinLowerPlateMesh2.receiveShadow = true
const trainCabinLowerPlateMesh3 = new THREE.Mesh( trainCabinLowerPlate, trainMaterial);
trainCabinLowerPlateMesh3.castShadow = true
trainCabinLowerPlateMesh3.receiveShadow = true
const trainCabinCollumnMesh = new THREE.Mesh( trainCabinCollumn, trainMaterial);
trainCabinCollumnMesh.castShadow = true
trainCabinCollumnMesh.receiveShadow = true
const trainCabinCollumnMesh2 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
trainCabinCollumnMesh2.castShadow = true
trainCabinCollumnMesh2.receiveShadow = true
const trainCabinCollumnMesh3 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
trainCabinCollumnMesh3.castShadow = true
trainCabinCollumnMesh3.receiveShadow = true
const trainCabinCollumnMesh4 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
trainCabinCollumnMesh4.castShadow = true
trainCabinCollumnMesh4.receiveShadow = true
const trainCabinRoofMesh = new THREE.Mesh( trainCabinRoof, trainSecondaryMaterial);
trainCabinRoofMesh.castShadow = true
trainCabinRoofMesh.receiveShadow = true
const trainCabinFloorMesh = new THREE.Mesh( trainCabinFloor, trainMaterial);
trainCabinFloorMesh.castShadow = true
trainCabinFloorMesh.receiveShadow = true
const trainCabinFloorPlateMesh = new THREE.Mesh( trainCabinFloorPlate, trainMaterial);
trainCabinFloorPlateMesh.castShadow = true
trainCabinFloorPlateMesh.receiveShadow = true
const trainCabinFloorBarMesh = new THREE.Mesh( trainCabinFloorBar, trainMaterial);
trainCabinFloorBarMesh.castShadow = true
trainCabinFloorBarMesh.receiveShadow = true
const trainCabinFloorPlateMesh2 = new THREE.Mesh( trainCabinFloorPlate, trainMaterial);
trainCabinFloorPlateMesh2.castShadow = true
trainCabinFloorPlateMesh2.receiveShadow = true
const trainCabinFloorBarMesh2 = new THREE.Mesh( trainCabinFloorBar, trainMaterial);
trainCabinFloorBarMesh2.castShadow = true
trainCabinFloorBarMesh2.receiveShadow = true
const trainRightWheelMesh = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainRightWheelMesh.castShadow = true
trainRightWheelMesh.receiveShadow = true
const trainRightWheelMesh2 = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainRightWheelMesh2.castShadow = true
trainRightWheelMesh2.receiveShadow = true
const trainRightWheelMesh3 = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainRightWheelMesh3.castShadow = true
trainRightWheelMesh3.receiveShadow = true
const trainLeftWheelMesh = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainLeftWheelMesh.castShadow = true
trainLeftWheelMesh.receiveShadow = true
const trainLeftWheelMesh2 = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainLeftWheelMesh2.castShadow = true
trainLeftWheelMesh2.receiveShadow = true
const trainLeftWheelMesh3 = new THREE.Mesh( trainWheel, trainWheelMaterial);
trainLeftWheelMesh3.castShadow = true
trainLeftWheelMesh3.receiveShadow = true
const trainRightWheelBarMesh = new THREE.Mesh( trainWheelBar, trainWheelBarMaterial);
trainRightWheelBarMesh.castShadow = true
trainRightWheelBarMesh.receiveShadow = true
const trainRightWheelBarEndMesh = new THREE.Mesh( trainWheelBarEnd, trainWheelBarEndMaterial);
trainRightWheelBarEndMesh.castShadow = true
trainRightWheelBarEndMesh.receiveShadow = true
const trainLeftWheelBarMesh = new THREE.Mesh( trainWheelBar, trainWheelBarMaterial);
trainLeftWheelBarMesh.castShadow = true
trainLeftWheelBarMesh.receiveShadow = true
const trainLeftWheelBarEndMesh = new THREE.Mesh( trainWheelBarEnd, trainWheelBarEndMaterial);
trainLeftWheelBarEndMesh.castShadow = true
trainLeftWheelBarEndMesh.receiveShadow = true
const trainChimneyMesh = new THREE.Mesh( trainChimney, trainMaterial);
trainChimneyMesh.castShadow = true
trainChimneyMesh.receiveShadow = true
trainCabinLowerPlateMesh.position.y = 5
trainCabinLowerPlateMesh.position.z += TRAIN_WIDTH / 2
trainCabinLowerPlateMesh.position.x += -2
trainCabinLowerPlateMesh2.position.y = 5
trainCabinLowerPlateMesh2.position.x += 0
trainCabinLowerPlateMesh2.rotation.y = Math.PI / 2
trainCabinLowerPlateMesh3.position.y = 5
trainCabinLowerPlateMesh3.position.z -= TRAIN_WIDTH / 2
trainCabinLowerPlateMesh3.position.x += -2
trainCabinCollumnMesh.position.z -= TRAIN_WIDTH / 2
trainCabinCollumnMesh.position.y = 5
trainCabinCollumnMesh.position.y += 2
trainCabinCollumnMesh.position.x += 0

trainCabinCollumnMesh2.position.z -= TRAIN_WIDTH / 2
trainCabinCollumnMesh2.position.y = 5
trainCabinCollumnMesh2.position.y += 2
trainCabinCollumnMesh2.position.x += -4

trainCabinCollumnMesh3.position.z += TRAIN_WIDTH / 2
trainCabinCollumnMesh3.position.y = 5
trainCabinCollumnMesh3.position.y += 2
trainCabinCollumnMesh3.position.x += 0

trainCabinCollumnMesh4.position.z += TRAIN_WIDTH / 2
trainCabinCollumnMesh4.position.y = 5
trainCabinCollumnMesh4.position.y += 2
trainCabinCollumnMesh4.position.x += -4

trainCabinRoofMesh.position.y = 11
trainCabinRoofMesh.position.x += -2
trainCabinRoofMesh.rotation.x = Math.PI / 2

trainCabinFloorMesh.position.y = 3
trainCabinFloorMesh.rotation.x = Math.PI / 2
trainCabinFloorMesh.position.x += 0.5

trainCabinFloorPlateMesh.position.y = 3
trainCabinFloorPlateMesh.position.z += TRAIN_WIDTH / 2 + 0.25
trainCabinFloorPlateMesh.position.x += -2

trainCabinFloorBarMesh.position.y = 3
trainCabinFloorBarMesh.position.z += TRAIN_WIDTH / 2 + 0.25
trainCabinFloorBarMesh.position.x += 0.5

trainCabinFloorPlateMesh2.position.y = 3
trainCabinFloorPlateMesh2.position.z -= TRAIN_WIDTH / 2 + 0.25
trainCabinFloorPlateMesh2.position.x += -2

trainCabinFloorBarMesh2.position.y = 3
trainCabinFloorBarMesh2.position.z -= TRAIN_WIDTH / 2 + 0.25
trainCabinFloorBarMesh2.position.x += 2.5

trainRightWheelMesh.position.y = 2
trainRightWheelMesh.position.z += TRAIN_WIDTH / 2 - 1
trainRightWheelMesh.rotation.x = Math.PI / 2
trainRightWheelMesh.position.x += 3

trainRightWheelMesh2.position.y = 2
trainRightWheelMesh2.position.z += TRAIN_WIDTH / 2 - 1
trainRightWheelMesh2.rotation.x = Math.PI / 2
trainRightWheelMesh2.position.x += 0.75

trainRightWheelMesh3.position.y = 2
trainRightWheelMesh3.position.z += TRAIN_WIDTH / 2 - 1
trainRightWheelMesh3.rotation.x = Math.PI / 2
trainRightWheelMesh3.position.x += -1.5

trainLeftWheelMesh.position.y = 2
trainLeftWheelMesh.position.z -= TRAIN_WIDTH / 2 - 1
trainLeftWheelMesh.rotation.x = Math.PI / 2
trainLeftWheelMesh.position.x += 3

trainLeftWheelMesh2.position.y = 2
trainLeftWheelMesh2.position.z -= TRAIN_WIDTH / 2 - 1
trainLeftWheelMesh2.rotation.x = Math.PI / 2
trainLeftWheelMesh2.position.x += 0.75

trainLeftWheelMesh3.position.y = 2
trainLeftWheelMesh3.position.z -= TRAIN_WIDTH / 2 - 1
trainLeftWheelMesh3.rotation.x = Math.PI / 2
trainLeftWheelMesh3.position.x += -1.5

trainRightWheelBarMesh.position.y = 2
trainRightWheelBarMesh.position.z += TRAIN_WIDTH / 2 - 0.5
trainRightWheelBarMesh.position.x += 1
trainRightWheelBarMesh.rotation.z = Math.PI / 2

trainRightWheelBarEndMesh.position.y = 2
trainRightWheelBarEndMesh.position.z += TRAIN_WIDTH / 2 - 0.5
trainRightWheelBarEndMesh.position.x += 5
trainRightWheelBarEndMesh.rotation.z = Math.PI / 2

trainLeftWheelBarMesh.position.y = 2
trainLeftWheelBarMesh.position.z -= TRAIN_WIDTH / 2 - 0.5
trainLeftWheelBarMesh.position.x += 1
trainLeftWheelBarMesh.rotation.z = Math.PI / 2

trainLeftWheelBarEndMesh.position.y = 2
trainLeftWheelBarEndMesh.position.z -= TRAIN_WIDTH / 2 - 0.5
trainLeftWheelBarEndMesh.position.x += 5
trainLeftWheelBarEndMesh.rotation.z = Math.PI / 2

trainChimneyMesh.position.y = 8.75
trainChimneyMesh.position.x += 6

const train2 = new THREE.Group();
train2.add(trainFrontCylinderMesh)
train2.add(trainFrontCylinderMesh2)
train2.add(trainCabinLowerPlateMesh)
train2.add(trainCabinLowerPlateMesh2)
train2.add(trainCabinLowerPlateMesh3)
train2.add(trainCabinCollumnMesh)
train2.add(trainCabinCollumnMesh2)
train2.add(trainCabinCollumnMesh3)
train2.add(trainCabinCollumnMesh4)
train2.add(trainCabinRoofMesh)
train2.add(trainCabinFloorMesh);
train2.add(trainCabinFloorPlateMesh);
train2.add(trainCabinFloorBarMesh);
train2.add(trainCabinFloorPlateMesh2);
train2.add(trainCabinFloorBarMesh2);
train2.add(trainRightWheelMesh);
train2.add(trainRightWheelMesh2);
train2.add(trainRightWheelMesh3);
train2.add(trainLeftWheelMesh);
train2.add(trainLeftWheelMesh2);
train2.add(trainLeftWheelMesh3);
train2.add(trainRightWheelBarMesh);
train2.add(trainRightWheelBarEndMesh);
train2.add(trainLeftWheelBarMesh);
train2.add(trainLeftWheelBarEndMesh);
train2.add(trainChimneyMesh);
scene.add(train2)

const spotLight = new THREE.SpotLight(0xffffff, 300);
spotLight.distance = 100;
spotLight.angle = Math.PI / 3; 
spotLight.penumbra = 0.1;
spotLight.castShadow = true; 
spotLight.position.y = 11

scene.add(spotLight);

train2.position.y += 0.75

createTrees(scene, 8, new THREE.Vector3(-85, 0, -80), 25);
createTrees(scene, 45, new THREE.Vector3(-30, 0, 60), 60);
createTrees(scene, 6, new THREE.Vector3(-55, 0, -140), 12);
createTrees(scene, 11, new THREE.Vector3(125, 0, -100), 40);

function createLampPost(position) {
    const lightTubeGeometry = new THREE.CylinderGeometry( 1, 1, 15, 32 ); 
    const lightTubeMaterial = new THREE.MeshStandardMaterial( {color: 0x1e4620} ); 
    const lightBolbGeometry = new THREE.SphereGeometry( 2.5, 32, 16 ); 
    const lightBolbMaterial = new THREE.MeshStandardMaterial( {transparent: true, emissive: 0xdddddd, emissiveIntensity: 50, opacity: 0.6} ); 
    
    const lightTubeMesh = new THREE.Mesh( lightTubeGeometry, lightTubeMaterial );
    lightTubeMesh.castShadow = true;
    const lightBolbMesh = new THREE.Mesh( lightBolbGeometry, lightBolbMaterial );
    lightBolbMesh.castShadow = true;
    
    lightTubeMesh.position.set(position.x, position.y, position.z)
    lightBolbMesh.position.set(position.x, position.y + 10, position.z)

    const pointLight = new THREE.PointLight(0xffffff, 500, 100);
    pointLight.position.set(position.x, position.y + 20, position.z);
    pointLight.castShadow = true;

    const lightPost = new THREE.Group()
    lightPost.add(lightTubeMesh)
    lightPost.add(lightBolbMesh)
    lightPost.add(pointLight);

    scene.add(lightPost)
}

createLampPost(new THREE.Vector3(50, 5, 10))
createLampPost(new THREE.Vector3(120, 5, -10))
createLampPost(new THREE.Vector3(190, 5, -60))
createLampPost(new THREE.Vector3(40, 5, -150))
createLampPost(new THREE.Vector3(-140, 5, -150))
createLampPost(new THREE.Vector3(-120, 5, -25))

function switchCamera(cameraIndex) {
    if (cameraIndex >= 0 && cameraIndex < cameras.length) {
        activeCamera = cameraIndex;
    }
}

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let rotateRight = false;
let rotateLeft = false;
let accelerate = false;
let braking = false;

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            // moveLeft = true;
            break;
        case 'KeyD':
            // moveRight = true;
            TIME = (TIME === "Day") ? "Night" : (TIME === "Night") ? "NoLight" : "Day";
            addLights();
            break;
        case 'KeyE':
            rotateRight = true;
            break;
        case 'KeyQ':
            rotateLeft = true;
            break;
        case 'Digit1':
            switchCamera(0);
            break;
        case 'Digit2':
            switchCamera(1);
            break;
        case 'Digit3':
            switchCamera(2);
            break;
        case 'Digit4':
            switchCamera(3);
            break;
        case 'Digit5':
            switchCamera(4);
            break;
        case 'Digit6':
            switchCamera(5);
            break;
        case 'KeyC':
            switchCamera((activeCamera + 1) % cameras.length);
            break;
        case 'ArrowUp':
            accelerate = true;
            break;
        case 'ArrowDown':
            braking = true;
            break;
        default:
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
        case 'KeyE':
            rotateRight = false;
            break;
        case 'KeyQ':
            rotateLeft = false;
            break;
        case 'ArrowUp':
            accelerate = false;
            break;
        case 'ArrowDown':
            braking = false;
            break;
    }
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function moveCamera() {
    const speed = 0.5;

    const cameraDirection = new THREE.Vector3(0, 0, -1);
    camera6.getWorldDirection(cameraDirection);

    const velocity = cameraDirection.clone().multiplyScalar(speed);

    if (moveForward) 
        camera6.position.add(velocity);
    if (moveBackward)
        camera6.position.sub(velocity);
    if (moveLeft) {
        const leftDirection = new THREE.Vector3(cameraDirection.z, 0, -cameraDirection.x);
        leftDirection.normalize();
        const leftVelocity = leftDirection.clone().multiplyScalar(speed);
        camera6.position.add(leftVelocity);
    }
    if (moveRight) {
        const rightDirection = new THREE.Vector3(-cameraDirection.z, 0, cameraDirection.x);
        rightDirection.normalize();
        const rightVelocity = rightDirection.clone().multiplyScalar(speed);
        camera6.position.add(rightVelocity);
    }
    if (rotateRight) 
        camera6.rotation.y -= speed / 10;
    if (rotateLeft)
        camera6.rotation.y += speed / 10;
}

function updateSpeed(newSpeed) {
    trainSpeed = newSpeed
    document.getElementById('Velocity').innerText = `Velocity: ${trainSpeed}`
    console.log(document.getElementById('Velocity').innerText)
}


const controls = new OrbitControls(camera1, renderer.domElement);
controls.update();

const clock = new THREE.Clock();
let trainProgress = 0;

function moveTrain() {
    if (accelerate && trainSpeed < 100) {
        updateSpeed(trainSpeed + 10)
        accelerate = false
    }
    if (braking && trainSpeed > 0) {
        updateSpeed(trainSpeed - 10)
        braking = false
    }

	const delta = clock.getDelta();

	trainProgress += 0.001 * trainSpeed * delta;

	if (trainProgress >= 1) {
        trainProgress = 0;
    }

    let trainPosition = trailCurve.getPointAt(trainProgress);

    train2.position.copy(trainPosition);
    
    let trainTangent = trailCurve.getTangentAt(trainProgress);
    const rotationYAngle = -Math.atan2(trainTangent.z, trainTangent.x);
    train2.rotation.y = rotationYAngle;
    camera2.rotation.y = rotationYAngle - Math.PI / 2;
    camera3.rotation.y = (rotationYAngle - Math.PI / 2) + Math.PI;
    const trainCabinRoofPosition = trainCabinRoofMesh.getWorldPosition(new THREE.Vector3());
    camera2.position.copy(trainCabinRoofPosition);
    camera2.position.y -= 1.5
    camera3.position.copy(trainCabinRoofPosition);
    camera3.position.y -= 1.5

    const spotLightPosition = trainFrontCylinderMesh.getWorldPosition(new THREE.Vector3())
    const spotLightTargetPosition = trainChimneyMesh.getWorldPosition(new THREE.Vector3())
    spotLight.position.copy(spotLightPosition);
    spotLight.position.y = 10

    spotLight.target.position.set(spotLightTargetPosition.x, spotLightTargetPosition.y, spotLightTargetPosition.z);

    spotLight.target.updateMatrixWorld()


    const oscillationAngle = trainProgress * Math.PI * 2 * trainSpeed;

    const oscillationRadius = 0.25;
    const oscillationX = - Math.cos(oscillationAngle) * oscillationRadius;
    const oscillationY = Math.sin(oscillationAngle) * oscillationRadius;

    trainRightWheelBarMesh.position.x = 1.5 + oscillationX * 1.5;
    trainRightWheelBarMesh.position.y = 2 + oscillationY;
    trainRightWheelBarEndMesh.position.x = 5 + oscillationX * 1.5;
    trainRightWheelBarEndMesh.position.y = 2 + oscillationY;
    trainLeftWheelBarMesh.position.x = 1.5 + oscillationX * 1.5;
    trainLeftWheelBarMesh.position.y = 2 + oscillationY;
    trainLeftWheelBarEndMesh.position.x = 5 + oscillationX * 1.5;
    trainLeftWheelBarEndMesh.position.y = 2 + oscillationY;

    trainRightWheelMesh.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1
    trainRightWheelMesh2.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1
    trainRightWheelMesh3.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1
    trainLeftWheelMesh.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1
    trainLeftWheelMesh2.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1
    trainLeftWheelMesh3.rotation.y = trainProgress * Math.PI * 2 * trainSpeed * -1

}

const waterMaterial = createTerrain(scene);
createTrail(scene);
createTunnel(scene, new THREE.Vector3(110, 5, -126), new THREE.Vector3(0, Math.PI / 2, 0));
addLights();

function animateWater() {
    const time = performance.now() * 0.001;
    waterMaterial.map.offset.x = time * WAVE_SPEED;
    waterMaterial.map.offset.y = time * WAVE_SPEED;

    waterMaterial.displacementMap.offset.x = time * WAVE_SPEED;
    waterMaterial.displacementMap.offset.y = time * WAVE_SPEED;

    waterMaterial.normalMap.offset.x = time * WAVE_SPEED;
    waterMaterial.normalMap.offset.y = time * WAVE_SPEED;
}


function animate() {
    requestAnimationFrame( animate );
    
    animateWater()

	moveTrain()
    
    moveCamera()
    
	controls.update();
    
	renderer.render( scene, cameras[activeCamera]);
}

scene.add(sky)
animate();