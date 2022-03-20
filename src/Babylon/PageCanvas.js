import React from "react";
import { Vector3, HemisphericLight, MeshBuilder,
    ArcRotateCamera, ShadowGenerator, DirectionalLight, 
    StandardMaterial, Color3, Color4, Matrix, RayHelper, AxesViewer} from "@babylonjs/core";
import SceneComponent from "../components/SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// import "./App.css";
import styles from './PageCanvas.module.css';
import MyBox from '../Babylon/Test/testBox';
import * as GUI from 'babylonjs-gui';


let box;


const onSceneReady = (scene) => {

    const axes = new AxesViewer(scene, 7)
    const canvas = scene.getEngine().getRenderingCanvas();

    //CAMERA
    const mainCamera = new ArcRotateCamera("camera1", 3, 1, 10, Vector3.Zero(), scene); 
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
    // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);


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

    const newBox = new MyBox(2, new Vector3(-3, 1, -2), scene, mainMaterial)
    newBox.showWireframe(5.0, new Color4(0, 0, 0, 1))


    //LINES TESTING
    // const linesOptions = {
    // points: [new Vector3(-5, 0, 0), new Vector3(5, 0, 0)], //vec3 array,
    // updatable: true
    // }

    // let lines = MeshBuilder.CreateLines("lines", linesOptions, scene);
    // lines.color = new Color3(1, 0, 0);
    // linesOptions.points[0].x +=6; 
    // linesOptions.instance = lines;
    // lines = MeshBuilder.CreateLines("lines", linesOptions);


    const onDrawLine = () => {
        // state.isDrawing = true

        console.log('button click')
        let lines
        let pointsCounter = 0
        //raycasting
        scene.onPointerDown = function castRay(){   


            const ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
                Matrix.Identity(), mainCamera);
        
                const hit = scene.pickWithRay(ray);
                
                // var rayHelper = new RayHelper(ray);
                // rayHelper.show(scene);
                
                if(hit.pickedMesh && hit.pickedMesh.name == 'ground'){
                    const optionsLine = {
                        points: [],//vec3 array,
                        updatable: true
                    }


                    if(pointsCounter == 0){
                        console.log('point', hit.pickedPoint)
            
                        const miniBox = new MyBox(0.15, hit.pickedPoint, scene, mainMaterial)
                        
                        optionsLine.points = [hit.pickedPoint, hit.pickedPoint];
                        
                        lines = MeshBuilder.CreateLines("lines", optionsLine, scene);  //scene is optional and defaults to the current scene
                        lines.color = new Color3(1, 0, 0);
                        // Update
                        //optionsLine.points[0].x += 6; 
                        //optionsLine.instance = lines;
                        //console.log('lines', optionsLine.points[0])

                        //lines = MeshBuilder.CreateLines("lines", optionsLine); //No scene parameter when using instance




                        pointsCounter ++

                        console.log(pointsCounter)
                } else if(pointsCounter == 1){

                    const miniBox = new MyBox(0.15, hit.pickedPoint, scene, mainMaterial)
                    // Update
                    optionsLine.points[0] = hit.pickedPoint; 
                    optionsLine.instance = lines;
                    console.log('lines', optionsLine.points[0])

                    lines = MeshBuilder.CreateLines("lines", optionsLine); 
                    //No scene parameter when using instance
                    pointsCounter ++

                    console.log('finLine', lines)
                };
        
                
            }; 
        };
    }



    



    

    //SHADOW
    var shadowGenerator = new ShadowGenerator(1024, sunLight);
    shadowGenerator.getShadowMap().renderList.push(box, secondBox);
    ground.receiveShadows = true;


    //GUI
    const createButton = () => {
    let guiCanvas = GUI.AdvancedDynamicTexture.CreateFullscreenUI('myUI', true, scene);
    let guiButton = GUI.Button.CreateSimpleButton('guiButton', 'Draw Line');
    guiButton.width = '100px';
    guiButton.height = '50px';
    guiButton.color = 'black';
    guiButton.cornerRadius = '3';
    guiButton.background = 'grey';
    guiButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    //what to do when clicked
    guiButton.onPointerUpObservable.add(onDrawLine)

    guiCanvas.addControl(guiButton)
    };


    createButton()

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