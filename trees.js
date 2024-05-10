import * as THREE from "three";

const treeTrunkMaterial1 = new THREE.MeshBasicMaterial( {color: 0x5b1f00} ); 
const treeLeavesMaterial1 = new THREE.MeshStandardMaterial( {color: 0x1e4620} ); 
const treeTrunk1 = new THREE.CylinderGeometry( 1, 1, 15, 32 ); 
const treeTrunk2 = new THREE.CylinderGeometry( 1.25, 1.25, 11, 32 ); 
const treeTrunk3 = new THREE.CylinderGeometry( 1, 1, 13, 32 ); 
const treeTrunk4 = new THREE.CylinderGeometry( 1, 1, 17, 32 ); 
const treeLeaves1 = new THREE.SphereGeometry( 6, 32, 16 ); 
const treeLeaves2 = new THREE.SphereGeometry( 5, 32, 16 ); 
const treeLeaves3 = new THREE.SphereGeometry( 4, 32, 16 ); 

const treeTrunkMesh1 = new THREE.Mesh( treeTrunk1, treeTrunkMaterial1 );
const treeLeavesMesh1 = new THREE.Mesh( treeLeaves1, treeLeavesMaterial1 );
const treeLeavesMesh1_2 = new THREE.Mesh( treeLeaves2, treeLeavesMaterial1 );
const treeLeavesMesh1_3 = new THREE.Mesh( treeLeaves2, treeLeavesMaterial1 );
treeTrunkMesh1.position.z = 20 
treeTrunkMesh1.position.y = 7 
treeLeavesMesh1.position.z = 19
treeLeavesMesh1.position.y = 13
treeLeavesMesh1_2.position.z = 20
treeLeavesMesh1_2.position.x = 3
treeLeavesMesh1_2.position.y = 15
treeLeavesMesh1_3.position.z = 21
treeLeavesMesh1_3.position.x = -3
treeLeavesMesh1_3.position.y = 12

const treeGroup1 = new THREE.Group()
treeGroup1.add(treeTrunkMesh1)
treeGroup1.add(treeLeavesMesh1)
treeGroup1.add(treeLeavesMesh1_2)
treeGroup1.add(treeLeavesMesh1_3)
// scene.add(treeGroup1)

const treeTrunkMesh2 = new THREE.Mesh( treeTrunk2, treeTrunkMaterial1 );
const treeLeavesMesh2 = new THREE.Mesh( treeLeaves2, treeLeavesMaterial1 );
const treeLeavesMesh2_2 = new THREE.Mesh( treeLeaves3, treeLeavesMaterial1 );
treeTrunkMesh2.position.z = 20 
treeTrunkMesh2.position.y = 6 
treeLeavesMesh2.position.y = 12 
treeLeavesMesh2.position.z = 19 
treeLeavesMesh2_2.position.y = 11 
treeLeavesMesh2_2.position.z = 22 
treeLeavesMesh2_2.position.x = 1 
const treeGroup2 = new THREE.Group()
treeGroup2.add(treeTrunkMesh2)
treeGroup2.add(treeLeavesMesh2)
treeGroup2.add(treeLeavesMesh2_2)
// scene.add(treeGroup2)

const treeTrunkMesh3 = new THREE.Mesh( treeTrunk3, treeTrunkMaterial1 );
const treeLeavesMesh3 = new THREE.Mesh( treeLeaves2, treeLeavesMaterial1 );
const treeLeavesMesh3_2 = new THREE.Mesh( treeLeaves2, treeLeavesMaterial1 );
const treeLeavesMesh3_3 = new THREE.Mesh( treeLeaves1, treeLeavesMaterial1 );
treeTrunkMesh3.position.z = 20 
treeTrunkMesh3.position.y = 7 
treeLeavesMesh3.position.y = 11
treeLeavesMesh3.position.z = 20
treeLeavesMesh3.position.x = -2
treeLeavesMesh3_2.position.y = 11
treeLeavesMesh3_2.position.z = 20
treeLeavesMesh3_2.position.x = 2
treeLeavesMesh3_3.position.y = 15
treeLeavesMesh3_3.position.z = 20
const treeGroup3 = new THREE.Group()
treeGroup3.add(treeTrunkMesh3)
treeGroup3.add(treeLeavesMesh3)
treeGroup3.add(treeLeavesMesh3_2)
treeGroup3.add(treeLeavesMesh3_3)
// scene.add(treeGroup3)

const treeTrunkMesh4 = new THREE.Mesh( treeTrunk4, treeTrunkMaterial1 );
const treeLeavesMesh4 = new THREE.Mesh( treeLeaves1, treeLeavesMaterial1 );
const treeLeavesMesh4_2 = new THREE.Mesh( treeLeaves1, treeLeavesMaterial1 );
treeTrunkMesh4.position.z = 20 
treeTrunkMesh4.position.y = 8 
treeLeavesMesh4.position.z = 20 
treeLeavesMesh4.position.y = 23 
treeLeavesMesh4_2.position.z = 20 
treeLeavesMesh4_2.position.y = 18 
const treeGroup4 = new THREE.Group()
treeGroup4.add(treeTrunkMesh4)
treeGroup4.add(treeLeavesMesh4)
treeGroup4.add(treeLeavesMesh4_2)
// scene.add(treeGroup4)

export function createTrees(scene, n, centerPosition, areaRadius) {
    const minX = centerPosition.x - areaRadius;
    const maxX = centerPosition.x + areaRadius;
    const minZ = centerPosition.z - areaRadius;
    const maxZ = centerPosition.z + areaRadius;

    for (let i = 0; i < n; i++) {
        const randomX = THREE.MathUtils.randFloat(minX, maxX);
        const randomZ = THREE.MathUtils.randFloat(minZ, maxZ);
        const randomPosition = new THREE.Vector3(randomX, 0, randomZ);

        const randomTreeGroup = getRandomTreeGroup();
        
        const treeGroup = randomTreeGroup.clone();
        treeGroup.position.copy(randomPosition);
        scene.add(treeGroup);
    }
}

export function getRandomTreeGroup() {
    const treeGroups = [treeGroup1, treeGroup2, treeGroup3, treeGroup4];
    const randomIndex = Math.floor(Math.random() * treeGroups.length);
    return treeGroups[randomIndex];
}
