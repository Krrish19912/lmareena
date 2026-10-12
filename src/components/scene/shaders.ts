// GLSL helpers shared by the procedural 3D materials.

// Ashima / Stefan Gustavson 3D simplex noise (MIT).
export const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export const CORE_VERT = /* glsl */ `
uniform float uTime;
uniform float uNoise;
uniform float uPulse;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vDisp;
${NOISE_GLSL}
void main(){
  vec3 n = normalize(normal);
  float t = uTime;
  float d = snoise(n * 1.3 + vec3(0.0, t * 0.35, t * 0.2));
  d += 0.35 * snoise(n * 2.7 - vec3(t * 0.5));
  vDisp = d;
  vec3 p = position + n * (d * uNoise + uPulse);
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vWorld = wp.xyz;
  vNormal = normalize(mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const CORE_SOLID_FRAG = /* glsl */ `
uniform vec3 uA;
uniform vec3 uB;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vDisp;
void main(){
  vec3 V = normalize(cameraPosition - vWorld);
  float fres = pow(1.0 - max(dot(normalize(vNormal), V), 0.0), 2.2);
  vec3 col = mix(uA, uB, clamp(vDisp * 0.5 + 0.5, 0.0, 1.0));
  vec3 base = vec3(0.015, 0.02, 0.035);
  gl_FragColor = vec4(base + col * fres * 1.8, 1.0);
}
`;

export const CORE_WIRE_FRAG = /* glsl */ `
uniform vec3 uA;
uniform vec3 uB;
varying vec3 vNormal;
varying vec3 vWorld;
varying float vDisp;
void main(){
  vec3 V = normalize(cameraPosition - vWorld);
  float fres = 1.0 - max(dot(normalize(vNormal), V), 0.0);
  vec3 col = mix(uA, uB, clamp(vDisp * 0.5 + 0.5, 0.0, 1.0));
  gl_FragColor = vec4(col * (0.5 + fres * 1.5), 0.55);
}
`;

export const STARS_VERT = /* glsl */ `
attribute float aSeed;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uPointer;
uniform float uPixelRatio;
uniform float uSize;
varying float vAlpha;
varying vec3 vColor;
void main(){
  vec3 p = position;
  float range = 60.0;
  float speed = 3.0 + uSpeed * 40.0;
  p.z = mod(p.z + uTime * speed * (0.4 + aSeed), range) - range * 0.5;
  p.xy += uPointer * (1.5 + aSeed * 2.0) * (0.3 + 0.7 * (p.z + 30.0) / 60.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * uPixelRatio * (0.5 + aSeed) * (18.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
  vAlpha = smoothstep(-2.0, -12.0, mv.z) * (0.35 + 0.65 * aSeed);
  vColor = mix(vec3(0.13, 0.83, 0.93), vec3(0.65, 0.55, 0.98), step(0.6, aSeed));
}
`;

export const STARS_FRAG = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a);
}
`;

export const GRID_VERT = /* glsl */ `
varying vec3 vWorld;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const GRID_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
varying vec3 vWorld;
void main(){
  vec2 uv = vWorld.xz / 2.0;
  uv.y += uTime * 0.12;
  vec2 g = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = 1.0 - min(min(g.x, g.y), 1.0);
  float dist = length(vWorld.xz);
  float fade = smoothstep(34.0, 4.0, dist);
  gl_FragColor = vec4(uColor, line * fade * 0.28);
}
`;
