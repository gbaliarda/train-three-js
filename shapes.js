import * as THREE from 'three';

export function getTunnelShape() {
    const tunnelShape = new THREE.Shape();
    tunnelShape.lineTo(0, 0.5); 
    tunnelShape.lineTo(-13, 0.5);
    tunnelShape.lineTo(-16, 6);
    tunnelShape.lineTo(-13, 12);
    tunnelShape.lineTo(0, 12);
    tunnelShape.lineTo(0, 12.5);
    tunnelShape.lineTo(-13.5, 12.5);
    tunnelShape.lineTo(-17, 6);
    tunnelShape.lineTo(-13.5, 0);
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
    leftRailShape.moveTo(0, -1);
    leftRailShape.lineTo(0.5, -1); 
    leftRailShape.lineTo(0.5, -1.25);
    leftRailShape.lineTo(0, -1.25);
    leftRailShape.lineTo(0, -1);
    
    const rightRailShape = new THREE.Shape();
    const distanciaY = 1.5;
    rightRailShape.moveTo(0, distanciaY - 0.25);
    rightRailShape.lineTo(0.5, distanciaY - 0.25); 
    rightRailShape.lineTo(0.5, distanciaY - 0.5); 
    rightRailShape.lineTo(0, distanciaY - 0.5);
    rightRailShape.lineTo(0, distanciaY - 0.25);
    
    return {leftRailShape, rightRailShape}
}

export function getTrainShape() {
    
}