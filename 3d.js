

		require('librerias-js/three.js-master/build/three')
		require('librerias-js/three.js-master/examples/js/loaders/ColladaLoader2')
		require('librerias-js/three.js-master/examples/js/Detector')
		require('librerias-js/three.js-master/examples/js/libs/stats.min')
		require('librerias-js/THREE.CubemapToEquirectangular-master/build/CubemapToEquirectangular.js')
		require('js/loaders/FBXLoader')

		

            if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var container, stats, clock;
			var camera, scene, renderer, elf, elapsed1;
			elapsed1=0;
			init();
			animate();

			function init() {
				container = document.getElementById( 'capture' );
				camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 2000 );
				camera.position.set( 10, 10, 10 );
				camera.lookAt( new THREE.Vector3( 2, 2, 2 ) );
				scene = new THREE.Scene();
				clock = new THREE.Clock();
				// loading manager
				var loadingManager = new THREE.LoadingManager( function() {
					scene.add( elf );
                    scene.add( elf2 );

				} );
				// collada
				var loader = new THREE.ColladaLoader( loadingManager );
				loader.options.convertUpAxis = true;
				//loader.load( 'elf/elf.dae', function ( collada ) {
                loader.load(  'interior2.dae', function ( collada ) {
                    elf = collada.scene;
                    elf.position.x = 0;
                    elf.position.y = 0;
                    elf.position.z = 0;
                    elf.scale.x = 0.2;
                    elf.scale.y = 0.2;
                    elf.scale.z = 0.2;
                } );
                loader.load(  'elf/elf.dae', function ( collada ) {

                    elf2 = collada.scene;
                } );

				//
				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );
				var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
				directionalLight.position.set( 1, 1, 0 ).normalize();
				scene.add( directionalLight );
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				//
				stats = new Stats();
				container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
                equi = new CubemapToEquirectangular( renderer, true );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
            document.getElementById( 'capture' ).addEventListener( 'click', function( e ) {

                equi.update( camera, scene );

            } );
			function animate() {
				requestAnimationFrame( animate );
				render();
                if(elapsed1==50) {
                    elapsed1 = 50;
                    equi.update( camera, scene );
                };
                if(elapsed1>50) {elapsed1=51;};
                elapsed1=elapsed1+1;
				stats.update();
             }
			function render() {
				//var delta = clock.getDelta();
                //var elapsed = clock.getElapsedTime();


				//if ( elf !== undefined ) {
				//	elf.rotation.z += delta * 0.5;
				//}
				renderer.render( scene, camera );


			}


