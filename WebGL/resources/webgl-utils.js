class webglUtils {
    /**
     * Creates and compiles a shader.
     *
     * @param {!WebGLRenderingContext} gl The WebGL Context.
     * @param {string} shaderSource The GLSL source code for the shader.
     * @param {number} shaderType The type of shader, VERTEX_SHADER or
     *     FRAGMENT_SHADER.
     * @return {!WebGLShader} The shader.
     */

    compileShader(gl, shaderSource, shaderType) {
      // Create the shader object
      var shader = gl.createShader(shaderType);
     
      // Set the shader source code.
      gl.shaderSource(shader, shaderSource);
     
      // Compile the shader
      gl.compileShader(shader);
     
      // Check if it compiled
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!success) {
        // Something went wrong during compilation; get the error
        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
      }
     
      return shader;
    }


    /**
     * Creates a program from 2 shaders.
     *
     * @param {!WebGLRenderingContext) gl The WebGL context.
     * @param {!WebGLShader} vertexShader A vertex shader.
     * @param {!WebGLShader} fragmentShader A fragment shader.
     * @return {!WebGLProgram} A program.
     */

    createProgram(gl, vertexShader, fragmentShader) {
      // create a program.
      var program = gl.createProgram();
     
      // attach the shaders.
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
     
      // link the program.
      gl.linkProgram(program);
     
      // Check if it linked.
      var success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!success) {
          // something went wrong with the link
          throw ("program filed to link:" + gl.getProgramInfoLog (program));
      }
     
      return program;
    };

    /**
     * Resizes the canvas to be the same size as web browser
     *
     * @param {!HTMLCanvas} the canvas to be drawn on.
     */

    resize(canvas) {
        // Resize the canvas to be the same size as the browser
        var displayWidth = canvas.clientWidth;
        var displayHeight = canvas.clientHeight;
        
        console.log("dWidth: " + displayWidth + " dHeight: " + displayHeight);
        console.log("cWidth: " + canvas.width + " cHeight: " + canvas.height); 

        // check if canvas is the same size
        if (canvas.width != displayWidth || 
            canvas.height != displayHeight) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            console.log("Canvas Resized")
            console.log("cWidth: " + canvas.width + " cHeight: " + canvas.height);

        }
    }

    resizeHD(canvas) {
        var realToCSSPixels = window.devicePixelRatio;

        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
        var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (canvas.width  !== displayWidth ||
            canvas.height !== displayHeight) {

          // Make the canvas the same size
          canvas.width  = displayWidth;
          canvas.height = displayHeight;
        }
    }

    /**
    * Creates a random integer between 0 and the range provided.
    *
    * @param {Integer Range} the maximum random integer desired
    * @return {Random Integer} a random integer
    */

    randomInt(range){
        return Math.floor(Math.random() * range);
    } 


    /**
    * Creates a rectangle with the provided cordinates and adds them to buffer
    *
    * @param {gl context} gl canvas context
    * @param {integer} x coordinate of rectangle
    * @param {integer} y coordinate of rectangle
    * @param {integer} width of rectangle 
    * @param {integer} height of rectangle
    */

    setRectangle(gl, x, y, width, height) {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + width;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2]), gl.STATIC_DRAW);

    }
    /*
    createTriangle2D(gl,x1, y1, x2, y2, x3, y3){
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                    x1, y1, 
                    x2, y2, 
                    x3, y3]), gl.STATIC_DRAW);
    }
    */

    createTriangle2D(gl){
        var cx = gl.canvas.width /2;
        var cy = gl.canvas.height /2;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            cx, cy-150, 
            cx, cy+150, 
            cx-150, cy,

            cx, cy-150, 
            cx, cy+150, 
            cx+150, cy                            
    
            ]), gl.STATIC_DRAW);

    }

  

     
}


