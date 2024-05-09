import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createBridge, createTerrain, createTrail, getTrailCurve } from './terrain';
// import image from './public/test.png'

const TRAIN_SPEED = 60
const TRAIN_WIDTH = 5

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

createBridge(scene, new THREE.Vector3(70, -16, 4))

const trailCurve = getTrailCurve(scene)

const trainGeometry = new THREE.BoxGeometry(6, 10, 6)
const trainMaterial = new THREE.MeshStandardMaterial( {color: 0x000000 } ); 
const textureLoader = new THREE.TextureLoader();
const wheelTexture = textureLoader.load('train_wheel.png');
const trainWheelMaterial = new THREE.MeshBasicMaterial( {map: wheelTexture } ); 
const trainWheelBarMaterial = new THREE.MeshStandardMaterial( {color: 0x888888 } ); 
const train = new THREE.Mesh( trainGeometry, trainMaterial ); 
//scene.add( train );

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

const trainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
trainCamera.position.set(-5, 10, 0);
trainCamera.rotation.set(0, 4.7, 0);
scene.camera = trainCamera


train2.position.y += 0.75

train.position.set(0, 7, 0)

camera.position.set( 0, 100, 100 );
camera.lookAt(0, 0, 0)

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

    let trainPosition = trailCurve.getPointAt(trainProgress);

    train2.position.copy(trainPosition);
    
    let trainTangent = trailCurve.getTangentAt(trainProgress);
    const rotationYAngle = -Math.atan2(trainTangent.z, trainTangent.x);
    train2.rotation.y = rotationYAngle;
    trainCamera.rotation.y = rotationYAngle - Math.PI / 2;
    const trainCabinRoofPosition = trainCabinRoofMesh.getWorldPosition(new THREE.Vector3());
    trainCamera.position.copy(trainCabinRoofPosition);
    trainCamera.position.y -= 1.5



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


	controls.update();

	renderer.render( scene, trainCamera );
}

createTerrain(scene);
createTrail(scene);
animate();