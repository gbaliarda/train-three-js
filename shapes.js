import * as THREE from 'three';

export function getTunnelShape() {
    const tunnelShape = new THREE.Shape();
    tunnelShape.lineTo(0, 0.5); 
    tunnelShape.lineTo(-10, 0.5);
    tunnelShape.lineTo(-13, 6);
    tunnelShape.lineTo(-10, 12);
    tunnelShape.lineTo(0, 12);
    tunnelShape.lineTo(0, 12.5);
    tunnelShape.lineTo(-10.5, 12.5);
    tunnelShape.lineTo(-14, 6);
    tunnelShape.lineTo(-10.5, 0);
    tunnelShape.lineTo(0, 0);

    return tunnelShape
}

export function getTrackShape() {
    const trackShape = new THREE.Shape();

    trackShape.lineTo(0, 1.5); 
    trackShape.lineTo(2, 3); 
    trackShape.lineTo(2, -3);
    trackShape.lineTo(0, -1.5);

    return trackShape
}

export function getRailShape() {
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
    
    return {leftRailShape, rightRailShape}
}

export function getTrainShape() {
    
}