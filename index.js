import * as THREE from './threejs/three.module.js';
import {STLLoader} from './threejs/STLLoader.js';
import {OrbitControls} from './threejs/OrbitControls.js';
import {DragControls} from './threejs/DragControls.js';

let scene, camera, renderer, object,dControl,texture,geometry,mesh,material;
let loader = new STLLoader();
loader.load('./3dmodels/SILLA TIPO HUEVO BLANCA.stl', (model)=>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 0x00ff00})
    );
    object.scale.set(10, 10, 10);
    object.position.set(0,0,0);
    object.rotation.x = -Math.PI/2;
    init();
});

function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/ window.innerHeight,
        0.1,
        2000
    );
    camera.position.z = 40;
    camera.position.y = 40;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    texture = new THREE.TextureLoader().load( "CGJbf.jpg" );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set( 11, 11 );
    texture.anisotropy = 160;
            texture.encoding = THREE.sRGBEncoding;
  geometry = new THREE.PlaneGeometry( 12,12,10,10);

    material = new THREE.MeshBasicMaterial( { map: texture} );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.y =0;
    mesh.position.z=0;
    mesh.rotation.x = - Math.PI / 2;
            scene.add(mesh)
    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);
    dControl=new DragControls([loader],camera,renderer.domElement);
    dControl.addEventListener('dragstart',()=>{
        control.enabled=false
    })
        dControl.addEventListener('dragend',()=>{
        control.enabled=true
    })
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,10);
    scene.add(light);

    let light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-10);
    scene.add(light2);

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


 function redimensionar(){
            
        camera.aspect=(window.innerWidth/window.innerHeight);
        camera.updateProjectionMatrix()
         renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene,camera);
        }
    window.addEventListener('resize',redimensionar);
