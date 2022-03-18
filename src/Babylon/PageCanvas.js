import React from "react";
import { Vector3, HemisphericLight, MeshBuilder,
    ArcRotateCamera, ShadowGenerator, DirectionalLight, 
    StandardMaterial, Color3, Color4 } from "@babylonjs/core";
import SceneComponent from "../components/SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";
import styles from './PageCanvas.module.css';
import myBox from '../Babylon/Test/testBox';


let box;


const onSceneReady = (scene) => {



//CAMERA
const mainCamera = new ArcRotateCamera("camera1", 3, 1, 20, Vector3.Zero(), scene); 
mainCamera.setTarget(Vector3.Zero());// This targets the camera to scene origin


  const canvas = scene.getEngine().getRenderingCanvas();
  // This attaches the camera to the canvas
  mainCamera.attachControl(canvas, true);

  //MATERIAL
  var mainMaterial = new StandardMaterial("myMaterial", scene);
  mainMaterial.diffuseColor = new Color3(0.5, 0.5, 1);

  var transparentMat = new StandardMaterial("myMaterial", scene);
  transparentMat.diffuseColor = new Color3(0.5, 1, 0.3);
  transparentMat.alpha = 0.5;



  // LIGHT
  var skyLight = new HemisphericLight("skyLight", new Vector3(0, 1, 1), scene);
  skyLight.intensity = 0.6;

    
  var sunLight = new DirectionalLight("DirectionalLight", new Vector3(0, -5, 2), scene);
  sunLight.autoCalcShadowZBounds = true

  


  //MESHES
  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.position.y = 1;
  box.material = mainMaterial

  const secondBox = MeshBuilder.CreateBox("box", { size: 4 }, scene);
  secondBox.position = new Vector3(2, 2, 4)
  secondBox.material = transparentMat;
  
  secondBox.enableEdgesRendering(); 
  secondBox.edgesWidth = 4.0;
    secondBox.edgesColor = new Color4(0, 0, 1, 1);


  const newBox = new myBox(2, new Vector3(-3, 1, -2), scene, transparentMat)
  

  // Our built-in 'ground' shape.
  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);


  //LINES TESTING
  const linesOptions = {
    points: [new Vector3(-5, 0, 0), new Vector3(5, 0, 0)], //vec3 array,
    updatable: true
}

    let lines = MeshBuilder.CreateLines("lines", linesOptions, scene);
    lines.color = new Color3(1, 0, 0);
    // linesOptions.points[0].x +=6; 
    // linesOptions.instance = lines;
    // lines = MeshBuilder.CreateLines("lines", linesOptions);
  
  //SHADOW
  var shadowGenerator = new ShadowGenerator(1024, sunLight);
  shadowGenerator.getShadowMap().renderList.push(box, secondBox);
  ground.receiveShadows = true;
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};


export default () => (
  <div>
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" className={styles.myCanvas} />
  </div>
);