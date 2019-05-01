var canvas = undefined;
var gl = undefined;
var program = undefined;
var positionAttributeLocation = undefined;    
var resolutionUniformLocation = undefined;
var colorUniformLocation = undefined;
var positionBuffer = undefined; 

init();
render();


function init(){
    canvas = document.getElementById("c");
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Problem making gl context")
    }

    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    var vertexShader =  webglUtils_compileShader(gl,vertexShaderSource,  gl.VERTEX_SHADER);
    var fragmentShader = webglUtils_compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    program = webglUtils_createProgram(gl, vertexShader, fragmentShader);

    positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    colorUniformLocation = gl.getUniformLocation(program, "u_color"); 
    
}

function render(){
    webglUtils_resize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    gl.useProgram(program);            
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    gl.enableVertexAttribArray(positionAttributeLocation);
   
    positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

 
    for (var ii = 0; ii < 50; ++ii){
        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    
        var primitiveType = gl.TRIANGLES;
        var count = 6;
        
        webglUtils_setRectangle(
            gl, webglUtils_randomInt(300), webglUtils_randomInt(300), webglUtils_randomInt(300), webglUtils_randomInt(300));

        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}  
