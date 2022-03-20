import * as BABYLON from "@babylonjs/core";

const onDrawingLine = () => {
    scene.onPointerDown = function castRay(){ 
        const ray = scene.createPickingRay(scene.pointerX, scene.pointerY,
            Matrix.Identity(), mainCamera);
    
            const hit = scene.pickWithRay(ray);
    };
};



const onDrawLine2 = () => {
    // state.isDrawing = true

    console.log('button click')
    let lines
    let pointsCounter = 0
    let isDrawing = false
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
                
                isDrawing = true
                
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

                if(isDrawing){
                    scene.onPointerMove = () => {
                        console.log('move')
                    };
                }




                optionsLine.points[0] = hit.pickedPoint; 
                optionsLine.instance = lines;
                console.log('lines', optionsLine.points[0])

                lines = MeshBuilder.CreateLines("lines", optionsLine); 
                //No scene parameter when using instance
                pointsCounter ++

                console.log('finLine', lines)

                isDrawing = false
            }else if(pointsCounter == 2){
                isDrawing = false
                console.log('counter = 2', isDrawing)
                return
            };
    
        return
        }; 
    };
}

export default onDrawingLine;
