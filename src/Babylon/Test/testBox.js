import { MeshBuilder, Vector3, Mesh, enableEdgesRendering, AbstractMesh } from "@babylonjs/core";


export default class MyBox extends AbstractMesh{
    constructor(size, position, scene, material) {
        super()
        this._size = size
        this._scene = scene
        this._material = material
        this._position = position
		this.initGeometry(position);
        
    }

    initGeometry(position) {
		this._mesh = MeshBuilder.CreateBox("myBox", { size: this._size }, this._scene);
        this._mesh.material = this._material;
		this._mesh.position = position;
        // this._mesh.enableEdgesRendering()
        // this._mesh.edgesWidth = 4.0;

        return this._mesh
    }


    showWireframe(width, color){
        this._mesh.enableEdgesRendering();
        this._mesh.edgesWidth = width;
        this._mesh.edgesColor = color;
    }



}



//myBox.initGeometry
    