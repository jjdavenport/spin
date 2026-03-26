// GLSL utility functions for Earth shaders
// Based on https://github.com/matiasngf/portfolio/tree/main/packages/experiments/earth

export const valueRemap = /*glsl*/ `
float valueRemap(float value, float min, float max, float newMin, float newMax) {
  return newMin + (newMax - newMin) * (value - min) / (max - min);
}
`;

export const perturbNormalArb = /*glsl*/ `
vec2 dHdxy_fwd(vec2 uv, sampler2D map, float scale) {
  float scaledBumpScale = scale / 10.0;
  vec2 dSTdx = dFdx( uv );
  vec2 dSTdy = dFdy( uv );
  float Hll = scaledBumpScale * texture2D( map, uv ).x;
  float dBx = scaledBumpScale * texture2D( map, uv + dSTdx ).x - Hll;
  float dBy = scaledBumpScale * texture2D( map, uv + dSTdy ).x - Hll;
  return vec2( dBx, dBy );
}

vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {
  vec3 vSigmaX = dFdx( surf_pos );
  vec3 vSigmaY = dFdy( surf_pos );
  vec3 vN = surf_norm;
  vec3 R1 = cross( vSigmaY, vN );
  vec3 R2 = cross( vN, vSigmaX );
  float fDet = dot( vSigmaX, R1 );
  vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
  return normalize( abs( fDet ) * surf_norm - vGrad );
}
`;

export const curveUp = /*glsl*/ `
float curveUp( float x, float factor ) {
  return ( 1.0 - factor / (x + factor) ) * (factor + 1.0);
}
`;

export const simplexNoise = /*glsl*/ `
vec3 random3(vec3 c) {
  float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract(512.0*j);
  j *= .125;
  r.x = fract(512.0*j);
  j *= .125;
  r.y = fract(512.0*j);
  return r-0.5;
}

const float SIMPLEX_NOISE_F3 =  0.3333333;
const float SIMPLEX_NOISE_G3 =  0.1666667;

float simplex3d(vec3 p) {
   vec3 s = floor(p + dot(p, vec3(SIMPLEX_NOISE_F3)));
   vec3 x = p - s + dot(s, vec3(SIMPLEX_NOISE_G3));
   vec3 e = step(vec3(0.0), x - x.yzx);
   vec3 i1 = e*(1.0 - e.zxy);
   vec3 i2 = 1.0 - e.zxy*(1.0 - e);
   vec3 x1 = x - i1 + SIMPLEX_NOISE_G3;
   vec3 x2 = x - i2 + 2.0*SIMPLEX_NOISE_G3;
   vec3 x3 = x - 1.0 + 3.0*SIMPLEX_NOISE_G3;
   vec4 w, d;
   w.x = dot(x, x);
   w.y = dot(x1, x1);
   w.z = dot(x2, x2);
   w.w = dot(x3, x3);
   w = max(0.6 - w, 0.0);
   d.x = dot(random3(s), x);
   d.y = dot(random3(s + i1), x1);
   d.z = dot(random3(s + i2), x2);
   d.w = dot(random3(s + 1.0), x3);
   w *= w;
   w *= w;
   d *= w;
   return dot(d, vec4(52.0));
}

const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);

float simplex3d_fractal(vec3 m) {
    return   0.5333333*simplex3d(m*rot1)
      +0.2666667*simplex3d(2.0*m*rot2)
      +0.1333333*simplex3d(4.0*m*rot3)
      +0.0666667*simplex3d(8.0*m);
}
`;
