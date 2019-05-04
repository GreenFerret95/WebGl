var utils = new webglUtils();
var gl = undefined;
var program = undefined;

var positionAttributeLocation = undefined;
var resolutionUniformLocation = undefined;
var colorUniformLocation = undefined;

init();
render();

function init(){
    var canvas = document.getElementById("c");
    
    gl = canvas.getContext("webgl");
    if (!gl) { console.log("Problem making gl context") }
    
    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    var vertexShader =  utils.compileShader(gl,vertexShaderSource,  gl.VERTEX_SHADER);
    var fragmentShader = utils.compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    program = utils.createProgram(gl, vertexShader, fragmentShader);
    
    positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    

    resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

}

function render(){
    utils.resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    /* -------------- POSITION -------------------*/

    gl.enableVertexAttribArray(positionAttributeLocation);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    var max_width = gl.canvas.width;
    var max_height = gl.canvas.height;
    var cx = max_width/2;
    var cy = max_height/2;

    gl.bufferData(
        gl.ARRAY_BUFFER, 
        new Float32Array([
        cx,cy-150,
        cx,cy+150, 
        cx-150, cy,

        cx, cy-150, 
        cx, cy+150, 
        cx+150, cy
        ]), gl.STATIC_DRAW);



    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    var primitiveType = gl.TRIANGLES;
    var count = 6;

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);


    /* ------------------ COLOR ------------------- */
    gl.enableVertexAttribArray(colorAttributeLocation);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER, 
        new Float32Array([
        1, 0, 1, 1,
        1, 0, 0, 1,
        0, 0, 0, 1,

        1, 1, 1, 1,
        1, 0, 0, 1,
        0, 0, 1, 1        
        ]), gl.STATIC_DRAW);    

    var size = 4;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0; 
    
    gl.vertexAttribPointer(colorAttributeLocation, size, type, normalize, stride, offset);


    gl.drawArrays(gl.TRIANGLES,0,6);

}
