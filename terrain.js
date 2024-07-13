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
    const heightmap = loader.load('test3.png');

    const aoMap = loader.load('textures/Stylized_Grass_003_ambientOcclusion.jpg');
    const baseColorMap = loader.load('textures/Stylized_Grass_003_basecolor.jpg');
    const normalMap = loader.load('textures/Stylized_Grass_003_normal.jpg');
    const roughnessMap = loader.load('textures/Stylized_Grass_003_roughness.jpg');

    const terrainGeometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, SEGMENTS, SEGMENTS);
    const waterGeometry = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, SEGMENTS, SEGMENTS);
    
    
    baseColorMap.wrapS = THREE.RepeatWrapping;
    baseColorMap.wrapT = THREE.RepeatWrapping;
    baseColorMap.repeat.set(25, 25);
    
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    aoMap.repeat.set(25, 25);
    
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(25, 25);
    
    roughnessMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.repeat.set(25, 25);
    
    
    const terrainMaterial = new THREE.MeshStandardMaterial({
        map: baseColorMap,
        displacementMap: heightmap,
        displacementScale: DISPLACEMENT_SCALE,
        aoMap: aoMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        roughness: 0.8,
        metalness: 0,
        wireframe: false
    });

    const waterColorMap = loader.load('textures/Water_002_COLOR.jpg');
    const waterDisplacementMap = loader.load('textures/Water_002_DISP.png');
    const waterNormalMap = loader.load('textures/Water_002_NORM.jpg');
    const waterAoMap = loader.load('textures/Water_002_OCC.jpg');
    const waterSpecMap = loader.load('textures/Water_002_SPEC.jpg');

    waterColorMap.wrapS = THREE.RepeatWrapping;
    waterColorMap.wrapT = THREE.RepeatWrapping;
    waterColorMap.repeat.set(25, 25);

    waterDisplacementMap.wrapS = THREE.RepeatWrapping;
    waterDisplacementMap.wrapT = THREE.RepeatWrapping;
    waterDisplacementMap.repeat.set(25, 25);

    waterNormalMap.wrapS = THREE.RepeatWrapping;
    waterNormalMap.wrapT = THREE.RepeatWrapping;
    waterNormalMap.repeat.set(25, 25);

    waterAoMap.wrapS = THREE.RepeatWrapping;
    waterAoMap.wrapT = THREE.RepeatWrapping;
    waterAoMap.repeat.set(25, 25);

    waterSpecMap.wrapS = THREE.RepeatWrapping;
    waterSpecMap.wrapT = THREE.RepeatWrapping;
    waterSpecMap.repeat.set(25, 25);

    const waterMaterial = new THREE.MeshPhongMaterial({
        map: waterColorMap,
        displacementMap: waterDisplacementMap,
        aoMap: waterAoMap,
        normalMap: waterNormalMap,
        shininess: 100,
        reflectivity: 0.5,
        wireframe: false
    });
    
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.receiveShadow = true;
    
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.receiveShadow = true;
    
    terrain.position.y = -14
    water.position.y = -5
    terrain.rotation.x = -Math.PI / 2
    water.rotation.x = -Math.PI / 2

    scene.add(terrain);
    scene.add(water);
    return waterMaterial;
}

function resetUVs( object )
{
    var pos = object.geometry.getAttribute( 'position' ),
        nor = object.geometry.getAttribute( 'normal' ),
        uvs = object.geometry.getAttribute( 'uv' );

    for( var i=0; i<pos.count; i++ )
    {
        var x = 0,
            y = 0;
    
        var nx = Math.abs(nor.getX(i)),
            ny = Math.abs(nor.getY(i)),
            nz = Math.abs(nor.getZ(i));

        if( nx>=ny && nx>=nz ) {
            x = pos.getZ( i );
            y = pos.getY( i );
        }

        if( ny>=nx && ny>=nz ) {
                x = pos.getX( i );
                y = pos.getZ( i );
        }

        if( nz>=nx && nz>=ny ) {
                x = pos.getX( i );
                y = pos.getY( i );
        }

        uvs.setXY( i, x, y );
    }
}


export function createTrail(scene) {
    const loader = new THREE.TextureLoader();

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
    
    const aoMap = loader.load('textures/Ground_Dirt_008_ambientOcclusion.jpg');
    const baseColorMap = loader.load('textures/Ground_Dirt_008_baseColor.jpg');
    const normalMap = loader.load('textures/Ground_Dirt_008_normal.jpg');
    const roughnessMap = loader.load('textures/Ground_Dirt_008_roughness.jpg');
    
    baseColorMap.wrapS = THREE.RepeatWrapping;
    baseColorMap.wrapT = THREE.RepeatWrapping;
    baseColorMap.repeat.set(1, 1);
    
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    aoMap.repeat.set(1, 1);
    
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(1, 1);
    
    roughnessMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.repeat.set(1, 1);
    
    const trackMaterial = new THREE.MeshStandardMaterial({
        // color: 0x7d1d00,
        aoMap: aoMap,
        map: baseColorMap,
        normalMap: normalMap,
        roughnessMap: roughnessMap,
        roughness: 1,
        metalness: 0,
    });
    
    // const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x7d1d00 });
    const railAoMap = loader.load('textures/Metal_006_ambientOcclusion.jpg');
    const railBaseColorMap = loader.load('textures/Metal_006_baseColor.jpg');
    const railNormalMap = loader.load('textures/Metal_006_normal.jpg');
    const railRoughnessMap = loader.load('textures/Metal_006_roughness.jpg');
    railBaseColorMap.wrapS = THREE.RepeatWrapping;
    railBaseColorMap.wrapT = THREE.RepeatWrapping;
    railBaseColorMap.repeat.set(1, 1);
    
    railAoMap.wrapS = THREE.RepeatWrapping;
    railAoMap.wrapT = THREE.RepeatWrapping;
    railAoMap.repeat.set(1, 1);
    
    railNormalMap.wrapS = THREE.RepeatWrapping;
    railNormalMap.wrapT = THREE.RepeatWrapping;
    railNormalMap.repeat.set(1, 1);
    
    railRoughnessMap.wrapS = THREE.RepeatWrapping;
    railRoughnessMap.wrapT = THREE.RepeatWrapping;
    railRoughnessMap.repeat.set(1, 1);
    // const railMaterial = new THREE.MeshStandardMaterial({ color: 0x1c1c1c });
    const railMaterial = new THREE.MeshStandardMaterial({
        // color: 0x7d1d00,
        aoMap: railAoMap,
        map: railBaseColorMap,
        normalMap: railNormalMap,
        roughnessMap: railRoughnessMap,
        roughness: 1,
        metalness: 0,
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.castShadow = true
    track.receiveShadow = true
    const rail = new THREE.Mesh(railGeometry, railMaterial);
    rail.castShadow = true
    rail.receiveShadow = true
    resetUVs(track)
    resetUVs(rail)
    track.position.y += 1
    rail.position.y += 1.25
    
    scene.add(track);
    scene.add(rail);
    
    const plankGeometry = new THREE.BoxGeometry(1, 0.2, 3);

    const plankAoMap = loader.load('textures/Wood_026_ambientOcclusion.jpg');
    const plankBaseColorMap = loader.load('textures/Wood_026_baseColor.jpg');
    const plankNormalMap = loader.load('textures/Wood_026_normal.jpg');
    const plankRoughnessMap = loader.load('textures/Wood_026_roughness.jpg');

    plankBaseColorMap.wrapS = THREE.RepeatWrapping;
    plankBaseColorMap.wrapT = THREE.RepeatWrapping;
    plankBaseColorMap.repeat.set(1, 1);
    
    plankAoMap.wrapS = THREE.RepeatWrapping;
    plankAoMap.wrapT = THREE.RepeatWrapping;
    plankAoMap.repeat.set(1, 1);
    
    plankNormalMap.wrapS = THREE.RepeatWrapping;
    plankNormalMap.wrapT = THREE.RepeatWrapping;
    plankNormalMap.repeat.set(1, 1);
    
    plankRoughnessMap.wrapS = THREE.RepeatWrapping;
    plankRoughnessMap.wrapT = THREE.RepeatWrapping;
    plankRoughnessMap.repeat.set(1, 1);
    const plankMaterial = new THREE.MeshStandardMaterial({
        // color: 0x7d1d00,
        aoMap: plankAoMap,
        map: plankBaseColorMap,
        normalMap: plankNormalMap,
        roughnessMap: plankRoughnessMap,
        roughness: 1,
        metalness: 0,
    });
    
    const numWoodenPlanks = 300;
    for (let i = 0; i < numWoodenPlanks; i++) {
        const t = i / (numWoodenPlanks - 1); 
        const point = trailCurve.getPointAt(t);
        const tangent = trailCurve.getTangentAt(t);
        
        const woodMesh = new THREE.Mesh(plankGeometry, plankMaterial);

        woodMesh.position.copy(point);
        woodMesh.position.y += 1;

        woodMesh.rotation.y = -Math.atan2(tangent.z, tangent.x);
        
        woodMesh.castShadow = true
        woodMesh.receiveShadow = true
        resetUVs(woodMesh)
        scene.add(woodMesh);
    }
}

export function createTunnel(scene, position, rotation) {
    const loader = new THREE.TextureLoader();

    const aoMap = loader.load('textures/Brick_wall_008_OOC.jpg');
    const baseColorMap = loader.load('textures/Brick_wall_008_COLOR.jpg');
    const normalMap = loader.load('textures/Brick_wall_008_NORM.jpg');
    const specularMap = loader.load('textures/Brick_wall_008_SPEC.jpg');
    const heightMap = loader.load('textures/Brick_wall_008_DISP.jpg');
    
    baseColorMap.wrapS = THREE.RepeatWrapping;
    baseColorMap.wrapT = THREE.RepeatWrapping;
    baseColorMap.repeat.set(0.2, 0.2);
    
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    aoMap.repeat.set(0.2, 0.2);
    
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(0.2, 0.2);
    
    specularMap.wrapS = THREE.RepeatWrapping;
    specularMap.wrapT = THREE.RepeatWrapping;
    specularMap.repeat.set(0.2, 0.2);

    heightMap.wrapS = THREE.RepeatWrapping;
    heightMap.wrapT = THREE.RepeatWrapping;
    heightMap.repeat.set(0.2, 0.2);

    const tunnelMaterial = new THREE.MeshStandardMaterial({
        aoMap: aoMap,
        map: baseColorMap,
        normalMap: normalMap,
        displacementMap: heightMap,
        displacementScale: 0.1,
        roughness: 1,
        metalness: 0,
    });

    // const tunnelWallGeometry = new THREE.BoxGeometry(50, 10, 1)
    // const tunnelRoofGeometry = new THREE.BoxGeometry(50, 9.4, 1)
    // const tunnelWall = new THREE.Mesh(tunnelWallGeometry, tunnelMaterial)
    // const tunnelWall2 = new THREE.Mesh(tunnelWallGeometry, tunnelMaterial)
    // const tunnelRoof = new THREE.Mesh(tunnelRoofGeometry, tunnelMaterial)
    // const tunnelRoof2 = new THREE.Mesh(tunnelRoofGeometry, tunnelMaterial)
    // tunnelWall.position.set(position.x, position.y + 0, position.z - 7.5)
    // tunnelWall2.position.set(position.x, position.y + 0, position.z + 7.5)
    // tunnelRoof.position.set(position.x, position.y + 7, position.z - 3.7)
    // tunnelRoof2.position.set(position.x, position.y + 7, position.z + 3.7)
    // tunnelRoof.rotateX(45)
    // tunnelRoof2.rotateX(-45)

    // tunnelWall.castShadow = true;
    // tunnelWall.receiveShadow = true;
    // tunnelWall2.castShadow = true;
    // tunnelWall2.receiveShadow = true;
    // tunnelRoof.castShadow = true;
    // tunnelRoof.receiveShadow = true;
    // tunnelRoof2.castShadow = true;
    // tunnelRoof2.receiveShadow = true;


    const tunnelShape = getTunnelShape()

    const tunnelPoints = [];
    tunnelPoints.push(new THREE.Vector3(-132 * TRAIL_SCALE, 0, -130 * TRAIL_SCALE));
    tunnelPoints.push(new THREE.Vector3(-132 * TRAIL_SCALE, 0, -80 * TRAIL_SCALE));

    const tunnelCurve = new THREE.CatmullRomCurve3(tunnelPoints);
    const tunnelGeometry = new THREE.ExtrudeGeometry([tunnelShape], { steps: 100, bevelEnabled: false, extrudePath: tunnelCurve });
    // const tunnelMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const tunnel = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
    tunnel.castShadow = true;
    tunnel.receiveShadow = true;
    // const tunnel = new THREE.Group();
    // tunnel.rotation.set(rotation.x, rotation.y, rotation.z)
    // tunnel.add(tunnelWall)
    // tunnel.add(tunnelWall2)
    // tunnel.add(tunnelRoof)
    // tunnel.add(tunnelRoof2)

    // resetUVs(tunnelWall)
    // resetUVs(tunnelWall2)
    // resetUVs(tunnelRoof)
    // resetUVs(tunnelRoof2)
    resetUVs(tunnel)
    scene.add(tunnel)

    const lightBolbGeometry = new THREE.SphereGeometry( 1, 32, 16 ); 
    const lightBolbMaterial = new THREE.MeshStandardMaterial( {transparent: true, emissive: 0xdddddd, emissiveIntensity: 50, opacity: 0.8} ); 
    const lightBolbMesh = new THREE.Mesh( lightBolbGeometry, lightBolbMaterial );
    lightBolbMesh.castShadow = true;
    lightBolbMesh.position.set(-126 * TRAIL_SCALE, 15.5, -95 * TRAIL_SCALE)
    const pointLight = new THREE.PointLight(0xffffff, 500, 100);
    pointLight.position.set(-126 * TRAIL_SCALE, 14, -95 * TRAIL_SCALE)
    pointLight.castShadow = true;

    const lightBolbMesh2 = new THREE.Mesh( lightBolbGeometry, lightBolbMaterial );
    lightBolbMesh2.castShadow = true;
    lightBolbMesh2.position.set(-126 * TRAIL_SCALE, 15.5, -115 * TRAIL_SCALE)
    const pointLight2 = new THREE.PointLight(0xffffff, 500, 100);
    pointLight2.position.set(-126 * TRAIL_SCALE, 14, -115 * TRAIL_SCALE)
    pointLight2.castShadow = true;

    scene.add(lightBolbMesh)
    scene.add(pointLight)
    scene.add(lightBolbMesh2)
    scene.add(pointLight2)
}

export function getTrailCurve() {
    const trailPoints = [];
    trailPoints.push(new THREE.Vector3(0, 1, 0));
    trailPoints.push(new THREE.Vector3(120 * TRAIL_SCALE, 1, 0)); 
    trailPoints.push(new THREE.Vector3(170 * TRAIL_SCALE, 1, -10 * TRAIL_SCALE)); 
    trailPoints.push(new THREE.Vector3(170 * TRAIL_SCALE, 1, -140 * TRAIL_SCALE));
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
    const loader = new THREE.TextureLoader();

    const aoMap = loader.load('textures/Brick_wall_008_OOC.jpg');
    const baseColorMap = loader.load('textures/Brick_wall_008_COLOR.jpg');
    const normalMap = loader.load('textures/Brick_wall_008_NORM.jpg');
    const specularMap = loader.load('textures/Brick_wall_008_SPEC.jpg');
    const heightMap = loader.load('textures/Brick_wall_008_DISP.jpg');
    
    baseColorMap.wrapS = THREE.RepeatWrapping;
    baseColorMap.wrapT = THREE.RepeatWrapping;
    baseColorMap.repeat.set(0.2, 0.2);
    
    aoMap.wrapS = THREE.RepeatWrapping;
    aoMap.wrapT = THREE.RepeatWrapping;
    aoMap.repeat.set(0.2, 0.2);
    
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(0.2, 0.2);
    
    specularMap.wrapS = THREE.RepeatWrapping;
    specularMap.wrapT = THREE.RepeatWrapping;
    specularMap.repeat.set(0.2, 0.2);

    heightMap.wrapS = THREE.RepeatWrapping;
    heightMap.wrapT = THREE.RepeatWrapping;
    heightMap.repeat.set(0.2, 0.2);
    
    const bridgeMaterial = new THREE.MeshStandardMaterial({
        // color: 0x7d1d00,
        aoMap: aoMap,
        map: baseColorMap,
        normalMap: normalMap,
        displacementMap: heightMap,
        roughness: 1,
        metalness: 0,
    });


    const arcGeometry = new THREE.TorusGeometry( 4, 2, 16, 100, Math.PI ); 
    const arcMaterial = new THREE.MeshStandardMaterial( { color: 0x7d1d00 } ); 
    const torus = new THREE.Mesh( arcGeometry, bridgeMaterial ); 
    torus.castShadow = true;
    torus.receiveShadow = true;
    resetUVs(torus)
    torus.position.y = 11

    const arcCollumnBoxGeometry = new THREE.BoxGeometry( 4, 10, 4 );
    const arcTopBoxGeometry = new THREE.BoxGeometry( 12, 2, 8 );
    const arcBoxMaterial = new THREE.MeshStandardMaterial( {color: 0x7d1d00} ); 
    const leftArcColumn = new THREE.Mesh( arcCollumnBoxGeometry, bridgeMaterial ); 
    leftArcColumn.castShadow = true;
    leftArcColumn.receiveShadow = true;
    const rightArcColumn = new THREE.Mesh( arcCollumnBoxGeometry, bridgeMaterial );
    rightArcColumn.castShadow = true;
    rightArcColumn.receiveShadow = true;
    const topArcBox = new THREE.Mesh( arcTopBoxGeometry, bridgeMaterial );
    topArcBox.castShadow = true;
    topArcBox.receiveShadow = true;
    resetUVs(leftArcColumn)
    resetUVs(rightArcColumn)
    resetUVs(topArcBox)
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
    
    const bridgeDiagonalTube = new THREE.CylinderGeometry( 0.5, 0.5, 17, 32 ); 
    const bridgeVerticalTube = new THREE.CylinderGeometry( 0.5, 0.5, 13, 32 ); 
    const bridgeTubeMaterial = new THREE.MeshStandardMaterial( {color: 0x7d1d00} ); 
    const bridgeTubeMesh = new THREE.Mesh( bridgeDiagonalTube, bridgeMaterial );
    bridgeTubeMesh.castShadow = true;
    bridgeTubeMesh.receiveShadow = true;
    const bridgeTubeMesh2 = new THREE.Mesh( bridgeDiagonalTube, bridgeMaterial );
    bridgeTubeMesh2.castShadow = true;
    bridgeTubeMesh2.receiveShadow = true;
    const bridgeTubeMesh3 = new THREE.Mesh( bridgeVerticalTube, bridgeMaterial );
    bridgeTubeMesh3.castShadow = true;
    bridgeTubeMesh3.receiveShadow = true;
    const bridgeTubeMesh4 = new THREE.Mesh( bridgeVerticalTube, bridgeMaterial );
    bridgeTubeMesh4.castShadow = true;
    bridgeTubeMesh4.receiveShadow = true;
    const bridgeTubeMesh5 = new THREE.Mesh( bridgeVerticalTube, bridgeMaterial );
    bridgeTubeMesh5.castShadow = true;
    bridgeTubeMesh5.receiveShadow = true;
    const bridgeTubeMesh6 = new THREE.Mesh( bridgeDiagonalTube, bridgeMaterial );
    bridgeTubeMesh6.castShadow = true;
    bridgeTubeMesh6.receiveShadow = true;
    const bridgeTubeMesh7 = new THREE.Mesh( bridgeDiagonalTube, bridgeMaterial );
    bridgeTubeMesh7.castShadow = true;
    bridgeTubeMesh7.receiveShadow = true;
    resetUVs(bridgeTubeMesh)
    resetUVs(bridgeTubeMesh2)
    resetUVs(bridgeTubeMesh3)
    resetUVs(bridgeTubeMesh4)
    resetUVs(bridgeTubeMesh5)
    resetUVs(bridgeTubeMesh6)
    resetUVs(bridgeTubeMesh7)

    bridgeTubeMesh.position.y = 9
    bridgeTubeMesh.rotation.z = - Math.PI / 4
    bridgeTubeMesh2.position.y = 9
    bridgeTubeMesh2.position.x += 12
    bridgeTubeMesh2.rotation.z = Math.PI / 4
    bridgeTubeMesh3.position.x += 6
    bridgeTubeMesh3.position.y = 9
    bridgeTubeMesh4.position.x += 18
    bridgeTubeMesh4.position.y = 9
    bridgeTubeMesh5.position.y = 15
    bridgeTubeMesh5.position.x += 12
    bridgeTubeMesh5.rotation.z = Math.PI / 2
    bridgeTubeMesh6.rotation.z = - Math.PI / 4
    bridgeTubeMesh6.position.y = 9
    bridgeTubeMesh6.position.x += 12
    bridgeTubeMesh7.rotation.z = Math.PI / 4
    bridgeTubeMesh7.position.x = 24
    bridgeTubeMesh7.position.y = 9

    const bridgeCross = new THREE.Group()
    bridgeCross.add(bridgeTubeMesh)
    bridgeCross.add(bridgeTubeMesh2)
    bridgeCross.add(bridgeTubeMesh3)
    bridgeCross.add(bridgeTubeMesh4)
    bridgeCross.add(bridgeTubeMesh5)
    bridgeCross.add(bridgeTubeMesh6)
    bridgeCross.add(bridgeTubeMesh7)
    scene.add(bridgeCross)
    bridgeCross.position.z = 4.5
    bridgeCross.position.x = 72
    bridgeCross.position.y = -3

    const bridgeCross2 = bridgeCross.clone()
    scene.add(bridgeCross2)
    bridgeCross.position.z = -2.75
}