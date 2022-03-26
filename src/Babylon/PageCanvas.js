import React from "react";
import { Vector3, HemisphericLight, MeshBuilder,
    ArcRotateCamera, ShadowGenerator, DirectionalLight, 
    StandardMaterial, Color3, Color4, Matrix, RayHelper, AxesViewer, PointerEventTypes} from "@babylonjs/core";
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
    ground.enablePointerMoveEvents = true;

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

/*
    const onDrawingLine = () => {

        let lines
        const optionsLine = {
            points: [],//vec3 array,
            updatable: true
        };
        let pointsCounter = 0
    
        //detecting mouse buttons
        // scene.onPointerDown = () => {
        // scene.onPointerObservable.add((pointerInfo) => {
        //     switch (pointerInfo.type) {
        //         case PointerEventTypes.POINTERTAP:
        //             switch (pointerInfo.event.button) {
        //                 case 0:
        //                     startDrawingLine()
        //                     console.log("LEFT");
        //                     break;
        //                 case 1: 
        //                     console.log("MIDDLE");
        //                     break;
        //                 case 2: 
        //                     console.log("RIGHT");
        //                     break;
        //             }
        //         break;
        //     }
        // });
        // }



        scene.onPointerDown = () => {
        
            let ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
            Matrix.Identity(), mainCamera);
    
            let hit = scene.pickWithRay(ray);

            console.log(ray, hit)


            if(hit.pickedMesh && hit.pickedMesh.name == 'ground'){
                
                pointsCounter++

                const miniBox = new MyBox(0.15, hit.pickedPoint, scene, mainMaterial)
                console.log('first point')
                
                optionsLine.points = [hit.pickedPoint, hit.pickedPoint];
                
                lines = MeshBuilder.CreateLines("lines", optionsLine, scene);  //scene is optional and defaults to the current scene
                lines.color = new Color3(1, 0, 0);


                console.log('before ONPOINTER MOVE INIT',pointsCounter)


                //condition to start onpointermove
                if(pointsCounter < 2){

                    scene.onPointerMove = (evt, pickResult) => {
                        console.log('AFTER ONPOINTER MOVE INIT',pointsCounter)
                            if(pickResult.hit){
                                
                                optionsLine.points[0] = pickResult.pickedPoint; 
                                optionsLine.instance = lines;
                                
                                lines = MeshBuilder.CreateLines("lines", optionsLine)
                                if(pointsCounter < 2){

                                    scene.onPointerDown = () => {
                                    
                                    ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
                                    Matrix.Identity(), mainCamera);
                            
                                    hit = scene.pickWithRay(ray);

                                    console.log(ray, hit)
                                    pointsCounter++
                                    const miniBox = new MyBox(0.15, hit.pickedPoint, scene, mainMaterial)
                                    console.log('second point')
                                    console.log('second click points Counter', pointsCounter)
                                    
                                    return pointsCounter
                                };

                                return pointsCounter




                                }
                                
                            }
                            else {
                                //console.log('Line can be continued only on ground');
                                return pointsCounter}
                    };


                }
                else{
                    return pointsCounter 
                };


                







                }
                else {
                    console.log('Line can be started only on ground')
                    return
                }

            console.log('func start')
            return    
        };

        


        return
    };

    */



    const initLine = (position, optionsLine, lines) => {
        
        optionsLine.points = [position, position];
        lines = MeshBuilder.CreateLines("lines", optionsLine, scene);  //scene is optional and defaults to the current scene
        lines.color = new Color3(1, 0, 0);

        return({
            lines:lines,
            optionsLine: optionsLine
        })
    };

    const updateLine = () => {
        var moveObserver = scene.onPointerObservable.add((pointerInfo) => {            
            switch (pointerInfo.type) {
                //if key down
                case PointerEventTypes.POINTERMOVE:
                    const point = pointerInfo.pickInfo.pickedPoint
                    console.log(point)
                    //counter++
                    break;
                default:
                    break;
            };
            
        
            
            // if(counter>0){
            //     scene.onPointerObservable.remove(moveObserver)
            // console.log('REMOVED Move observer')
            // }

        });
    }
    //observer for click
    const createPoint = () => {
        let counter = 0

        var observer = scene.onPointerObservable.add((pointerInfo) => {            
            switch (pointerInfo.type) {
                //if key down
                case PointerEventTypes.POINTERDOWN:
                    switch(pointerInfo.event.button){
                        case 0:
                            const point = pointerInfo.pickInfo.pickedPoint
                            console.log(point)
                            placePoint(point)
                            counter++
                            break;
                        default:
                            console.log('wrong button');
                            break;
                    };
                break;
                default:                               
                    break;
            }
            
            if(counter>0){
                scene.onPointerObservable.remove(observer)
            console.log('REMOVED')}

        });

            
    }
    
    const placePoint = (point) => {
        const newPoint = new MyBox(0.1, point, scene, mainMaterial)

    };

    const createLine = () => {
        
        let counter = 0

        console.log('creatingLine');

        var observer = scene.onPointerObservable.add((pointerInfo) => {            
            switch (pointerInfo.type) {
                //if key down
                case PointerEventTypes.POINTERDOWN:
                    switch(pointerInfo.event.button){
                        case 0:
                            const point = pointerInfo.pickInfo.pickedPoint
                            console.log(point)
                            placePoint(point)
                            counter++
                            break;
                        default:
                            console.log('wrong button');
                            break;
                    };
                break;
                default:                               
                    break;
            }

            if(counter > 0){
            scene.onPointerObservable.remove(observer);
            console.log('REMOVED first-click-observer');

            
                updateLine()
                var observerClick = scene.onPointerObservable.add((pointerInfo) => {          
                    switch (pointerInfo.type) {
                        //if key down
                        case PointerEventTypes.POINTERDOWN:
                            switch(pointerInfo.event.button){
                                case 0:
                                    const point = pointerInfo.pickInfo.pickedPoint
                                    console.log(point)
                                    placePoint(point)
                                    counter++
                                    console.log('COUNTER', counter)
                                    break;
                                default:
                                    console.log('wrong button');
                                    break;
                            };
                            break;
                        default:                               
                            break;
                    }

                    if(counter > 1){
                        scene.onPointerObservable.remove(observerClick);
                        console.log('REMOVED 2 onclick observ')
                    };
                })
        }




        });
            
        
    }
 

    const onDrawPoint = () => {
        createPoint()
    };

    const onDrawLine = () => {
        console.log('button was clicked')
        createLine()
        
            
        
        
    };

    //SHADOWS
    var shadowGenerator = new ShadowGenerator(1024, sunLight);
    shadowGenerator.getShadowMap().renderList.push(box, secondBox);
    ground.receiveShadows = true;


    //GUI
    const createButton = () => {
    let guiCanvas = GUI.AdvancedDynamicTexture.CreateFullscreenUI('myUI', true, scene);
    var grid = new GUI.Grid();   
    grid.background = "grey"; 
    guiCanvas.addControl(grid);
    
    grid.width = "100px";
    grid.height = "50px";

    grid.addColumnDefinition(grid.width, true);
    grid.addRowDefinition(0.5);
    grid.addRowDefinition(0.5);
    grid.fontSize = 12
    grid.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    grid.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    
    let guiButton = GUI.Button.CreateSimpleButton('guiButton', 'Create Point');
    //guiButton.width = '100px';
    //guiButton.height = '50px';
    guiButton.color = 'black';
    guiButton.cornerRadius = '3';
    guiButton.background = 'white';
    

    let guiButton2 = GUI.Button.CreateSimpleButton('guiButton2', 'Draw Line');
    //guiButton2.width = '100px';
    //guiButton2.height = '50px';
    guiButton2.color = 'black';
    guiButton2.cornerRadius = '3';
    guiButton2.background = 'white';
    
    //what to do when clicked
    guiButton.onPointerUpObservable.add(onDrawPoint)
    guiButton2.onPointerUpObservable.add(onDrawLine)



    grid.addControl(guiButton, 0)
    grid.addControl(guiButton2, 1)
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