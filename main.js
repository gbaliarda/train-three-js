import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createBridge, createTerrain, createTrail, getTrailCurve } from './terrain';
import { createTrees } from './trees';
// import image from './public/test.png'

const TRAIN_SPEED = 60
const TRAIN_WIDTH = 5

// Initialize Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xADD8E6);
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

const light = new THREE.DirectionalLight(0xffffff, 1.0)
light.castShadow = true;
scene.add(light)

createBridge(scene, new THREE.Vector3(70, -16, 1))

const trailCurve = getTrailCurve(scene)

const trainMaterial = new THREE.MeshStandardMaterial( {color: 0x000000 } ); 
const textureLoader = new THREE.TextureLoader();
const wheelTexture = textureLoader.load('train_wheel.png');
const trainWheelMaterial = new THREE.MeshBasicMaterial( {map: wheelTexture } ); 
const trainWheelBarMaterial = new THREE.MeshStandardMaterial( {color: 0x888888 } ); 

const trainFrontCylinder = new THREE.CylinderGeometry( TRAIN_WIDTH / 2, TRAIN_WIDTH / 2, 6, 32 );
const trainFrontCylinder2 = new THREE.CylinderGeometry( TRAIN_WIDTH / 2 + 0.5, TRAIN_WIDTH / 2 + 0.5, 1, 32 );
const trainFrontCylinderMesh = new THREE.Mesh( trainFrontCylinder, trainMaterial ); 
const trainFrontCylinderMesh2 = new THREE.Mesh( trainFrontCylinder2, trainMaterial ); 
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
const trainCabinLowerPlateMesh2 = new THREE.Mesh( trainCabinLowerPlate, trainMaterial);
const trainCabinLowerPlateMesh3 = new THREE.Mesh( trainCabinLowerPlate, trainMaterial);
const trainCabinCollumnMesh = new THREE.Mesh( trainCabinCollumn, trainMaterial);
const trainCabinCollumnMesh2 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
const trainCabinCollumnMesh3 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
const trainCabinCollumnMesh4 = new THREE.Mesh( trainCabinCollumn, trainMaterial);
const trainCabinRoofMesh = new THREE.Mesh( trainCabinRoof, trainMaterial);
const trainCabinFloorMesh = new THREE.Mesh( trainCabinFloor, trainMaterial);
const trainCabinFloorPlateMesh = new THREE.Mesh( trainCabinFloorPlate, trainMaterial);
const trainCabinFloorBarMesh = new THREE.Mesh( trainCabinFloorBar, trainMaterial);
const trainCabinFloorPlateMesh2 = new THREE.Mesh( trainCabinFloorPlate, trainMaterial);
const trainCabinFloorBarMesh2 = new THREE.Mesh( trainCabinFloorBar, trainMaterial);
const trainRightWheelMesh = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainRightWheelMesh2 = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainRightWheelMesh3 = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainLeftWheelMesh = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainLeftWheelMesh2 = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainLeftWheelMesh3 = new THREE.Mesh( trainWheel, trainWheelMaterial);
const trainRightWheelBarMesh = new THREE.Mesh( trainWheelBar, trainWheelBarMaterial);
const trainRightWheelBarEndMesh = new THREE.Mesh( trainWheelBarEnd, trainWheelBarMaterial);
const trainLeftWheelBarMesh = new THREE.Mesh( trainWheelBar, trainWheelBarMaterial);
const trainLeftWheelBarEndMesh = new THREE.Mesh( trainWheelBarEnd, trainWheelBarMaterial);
const trainChimneyMesh = new THREE.Mesh( trainChimney, trainMaterial);
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
trainLeftWheelMesh.position.x += 1

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

train2.position.y += 0.75

createTrees(scene, 8, new THREE.Vector3(-85, 0, -80), 30);
createTrees(scene, 45, new THREE.Vector3(-30, 0, 60), 60);
createTrees(scene, 6, new THREE.Vector3(-55, 0, -140), 12);
createTrees(scene, 18, new THREE.Vector3(110, 0, -100), 40);


function switchCamera(cameraIndex) {
    if (cameraIndex >= 0 && cameraIndex < cameras.length) {
        activeCamera = cameraIndex;
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
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
        default:
            break;
    }
});

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let rotateRight = false;
let rotateLeft = false;

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'KeyE':
            rotateRight = true;
            break;
        case 'KeyQ':
            rotateLeft = true;
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


const controls = new OrbitControls(camera1, renderer.domElement);
controls.update();

const clock = new THREE.Clock();
let trainProgress = 0;

function moveTrain() {
	const delta = clock.getDelta();

	trainProgress += 0.001 * TRAIN_SPEED * delta;

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



    const oscillationValue = Math.sin(trainProgress * Math.PI * 2 * TRAIN_SPEED / 5);

    const oscillationScaled = (oscillationValue + 1) * 0.25; // [-1, 1] to [0, 0.5]
    const oscillationShifted = oscillationScaled + 1.75; // [0, 0.5] to [1.75, 2.25]

    trainRightWheelBarMesh.position.y = oscillationShifted;
    trainRightWheelBarEndMesh.position.y = oscillationShifted;
    trainLeftWheelBarMesh.position.y = oscillationShifted;
    trainLeftWheelBarEndMesh.position.y = oscillationShifted;
    trainRightWheelMesh.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1
    trainRightWheelMesh2.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1
    trainRightWheelMesh3.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1
    trainLeftWheelMesh.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1
    trainLeftWheelMesh2.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1
    trainLeftWheelMesh3.rotation.y = trainProgress * Math.PI * 2 * TRAIN_SPEED / 5 * -1

}

function animate() {
	requestAnimationFrame( animate );

	moveTrain()

    moveCamera()

	controls.update();

	renderer.render( scene, cameras[activeCamera]);
}

createTerrain(scene);
createTrail(scene);
animate();