import * as THREE from 'three';
import { getRailShape, getTrackShape, getTunnelShape } from './shapes';

const GRASS_COLOR = 0x00e335
const WATER_COLOR = 0x42a5b8
const SEGMENTS = 128
const TERRAIN_SIZE = 500
const DISPLACEMENT_SCALE = 40
const TRAIL_SCALE = 1

export function createTerrain(scene) {
    const loader = new THREE.TextureLoader();
    const heightmap = loader.load('test.png');

    const terrainGeometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, SEGMENTS, SEGMENTS);
    const waterGeometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, SEGMENTS, SEGMENTS);
    
    const terrainMaterial = new THREE.MeshStandardMaterial({ color: GRASS_COLOR, map: heightmap, displacementMap: heightmap, displacementScale: DISPLACEMENT_SCALE, wireframe: false });
    const waterMaterial = new THREE.MeshBasicMaterial({ color: WATER_COLOR });
    
    
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    
    scene.add(terrain);
    scene.add(water);
    terrain.position.y = -14
    water.position.y = -5
    terrain.rotation.x = -Math.PI / 2
    water.rotation.x = -Math.PI / 2
}

export function createTrail(scene) {
    // Trail + Rail
    const trailCurve = getTrailCurve()

    const trackShape = getTrackShape()
    const { leftRailShape, rightRailShape } = getRailShape()

    const extrudeSettings = {
        steps: 100,
        bevelEnabled: false,
        extrudePath: trailCurve
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

    // Tunnel
    const tunnelShape = getTunnelShape()

    const tunnelPoints = [];
    tunnelPoints.push(new THREE.Vector3(-132 * TRAIL_SCALE, 1, -130 * TRAIL_SCALE));
    tunnelPoints.push(new THREE.Vector3(-132 * TRAIL_SCALE, 1, -80 * TRAIL_SCALE));

    const tunnelCurve = new THREE.CatmullRomCurve3(tunnelPoints);
    const tunnelGeometry = new THREE.ExtrudeGeometry([tunnelShape], { steps: 100, bevelEnabled: false, extrudePath: tunnelCurve });
    const tunnelMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    scene.add(tunnel)
}

export function getTrailCurve() {
    const trailPoints = [];
    trailPoints.push(new THREE.Vector3(0, 1, 0));
    trailPoints.push(new THREE.Vector3(120 * TRAIL_SCALE, 1, 0)); 
    trailPoints.push(new THREE.Vector3(140 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE)); 
    trailPoints.push(new THREE.Vector3(140 * TRAIL_SCALE, 1, -140 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(100 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(20 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-40 * TRAIL_SCALE, 1, -180 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-100 * TRAIL_SCALE, 1, -180 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-120 * TRAIL_SCALE, 1, -160 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-120 * TRAIL_SCALE, 1, -40 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-100 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-50 * TRAIL_SCALE, 1, -20 * TRAIL_SCALE));
    trailPoints.push(new THREE.Vector3(-5, 1, 0));
    trailPoints.push(new THREE.Vector3(0, 1, 0));
    return new THREE.CatmullRomCurve3(trailPoints);
}

export function createBridge(scene, position) {
    const arcGeometry = new THREE.TorusGeometry( 4, 2, 16, 100, Math.PI ); 
    const arcMaterial = new THREE.MeshBasicMaterial( { color: 0x7d1d00 } ); 
    const torus = new THREE.Mesh( arcGeometry, arcMaterial ); 
    torus.position.y = 11

    const arcCollumnBoxGeometry = new THREE.BoxGeometry( 4, 10, 4 );
    const arcTopBoxGeometry = new THREE.BoxGeometry( 12, 3, 4 );
    const arcBoxMaterial = new THREE.MeshBasicMaterial( {color: 0x7d1d00} ); 
    const leftArcColumn = new THREE.Mesh( arcCollumnBoxGeometry, arcBoxMaterial ); 
    const rightArcColumn = new THREE.Mesh( arcCollumnBoxGeometry, arcBoxMaterial );
    const topArcBox = new THREE.Mesh( arcTopBoxGeometry, arcBoxMaterial );
    leftArcColumn.position.y = 11
    leftArcColumn.position.x = -4
    rightArcColumn.position.y = 11
    rightArcColumn.position.x = 4
    topArcBox.position.y = 15

    const arcGroup = new THREE.Group();

    arcGroup.add(torus);
    arcGroup.add(leftArcColumn);
    arcGroup.add(rightArcColumn);
    arcGroup.add(topArcBox);

    scene.add(arcGroup);

    arcGroup.position.x = position.x
    arcGroup.position.y = position.y
    arcGroup.position.z = position.z

    const arcGroup2 = arcGroup.clone();
    scene.add(arcGroup2);
    arcGroup2.position.x += 10;

    const arcGroup3 = arcGroup.clone();
    scene.add(arcGroup3);
    arcGroup3.position.x += 20;

    const arcGroup4 = arcGroup.clone();
    scene.add(arcGroup4);
    arcGroup4.position.x += 30;
}