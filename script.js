function main() {
    var gl = document.querySelector("canvas").getContext("webgl");
    var vs = gl.createShader(gl.VERTEX_SHADER);
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    var multibrot = gl.createProgram();
    var vsrc = "precision highp float;attribute vec2 a_position;void main() {gl_Position = vec4(a_position, 1.0, 1.0);}";
    var fsrc = "precision highp float;uniform float un;void main() {vec2 z = vec2(0.0);vec2 c = 4.0 * (gl_FragCoord.xy / vec2(600.0)) - vec2(2.0);int iterations = 0;for(int i = 0; i < 1000000; i++) {iterations = i;if(i > 128) {break;}z = vec2(pow(z.x * z.x + z.y * z.y, un / 2.0) * cos(un * atan(z.y, z.x)), pow(z.x * z.x + z.y * z.y, un / 2.0) * sin(un * atan(z.y, z.x))) + c;if(length(z) > 4.0) {break;}}if(length(z) > 2.0) {gl_FragColor = vec4(vec3(float(iterations)) / 16.0, 1.0);} else {gl_FragColor = vec4(vec3(0.0), 1.0);}}";
    gl.shaderSource(vs, vsrc);
    gl.shaderSource(fs, fsrc);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(multibrot, vs);
    gl.attachShader(multibrot, fs);
    gl.linkProgram(multibrot);
    gl.useProgram(multibrot);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer(gl.ARRAY_BUFFER));
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    
    var posAttribLoc = gl.getAttribLocation(multibrot, "a_position");
    gl.enableVertexAttribArray(posAttribLoc);
    gl.vertexAttribPointer(posAttribLoc, 2, gl.FLOAT, false, 0, 0);
    
    var n = 1;
    function init() {
        gl.uniform1f(gl.getUniformLocation(multibrot, "un"), n);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        n += 0.005;
        window.requestAnimationFrame(init);
    }
    window.requestAnimationFrame(init);
}
main();