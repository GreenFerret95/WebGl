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
    resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    colorUniformLocation = gl.getUniformLocation(program, "u_color");

}

function render(){
    utils.resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.enableVertexAttribArray(positionAttributeLocation);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    var primitiveType = gl.TRIANGLES;
    var count = 6;

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    
    var x1 = utils.randomInt(300);
    var y1 = utils.randomInt(300);

    var x2 = utils.randomInt(300);
    var y2 = utils.randomInt(300);

    var x3 = utils.randomInt(300);
    var y3 = utils.randomInt(300);
    var r = Math.random();
    var g = Math.random();
    var b = Math.random();

    utils.createTriangle2D(gl, x1, y1, x2, y2, x3, y3);
    gl.uniform4f(colorUniformLocation,r , g, b, 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    /*
    for (var ii = 0; ii < 50; ++ii){
        
        var size = 2;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        var primitiveType = gl.TRIANGLES;
        var count = 6;

        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        utils.setRectangle(
                gl, utils.randomInt(300), utils.randomInt(300), utils.randomInt(300), utils.randomInt(300));
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    
   
    }
    */
}
