import { MeshBuilder, Vector3, Mesh, enableEdgesRendering } from "@babylonjs/core";


export default class myBox extends Mesh{
    constructor(size, position, scene, material) {
        super()
        this._size = size
        this._scene = scene
        this._material = material
        this._position = position
		this.initGeometry(position);
        this.enableEdgesRendering()
    }

    initGeometry(position) {
		this._mesh = MeshBuilder.CreateBox("myBox", { size: this._size }, this._scene);
        this._mesh.material = this._material;
		this._mesh.position = position;

        return this._mesh
    }

    enableEdgesRendering(){
        this._mesh.enableEdgesRendering()
        this._mesh.edgesWidth = 4.0;
    }


}



//myBox.initGeometry