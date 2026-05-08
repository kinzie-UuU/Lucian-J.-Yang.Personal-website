var cardPresets = [
  { x: -0.46, y: -0.12, w: 200, h: 268, r: -9, d: -120 },
  { x: -0.31, y: -0.04, w: 212, h: 284, r: -6, d: -56 },
  { x: -0.17, y: -0.16, w: 196, h: 262, r: -4, d: 18 },
  { x: -0.03, y: -0.18, w: 190, h: 254, r:  5, d: 44 },
  { x:  0.13, y: -0.05, w: 222, h: 296, r:  7, d: 110 },
  { x:  0.28, y: -0.12, w: 188, h: 252, r: -6, d: 176 },
  { x:  0.38, y:  0.04, w: 180, h: 240, r: -4, d: 132 },
  { x: -0.24, y:  0.08, w: 194, h: 260, r:  7, d: -12 },
  { x: -0.06, y:  0.06, w: 214, h: 286, r: -9, d: -74 },
  { x:  0.11, y:  0.06, w: 190, h: 254, r:  4, d: 28 },
  { x:  0.26, y:  0.05, w: 206, h: 276, r: -5, d: 104 },
  { x:  0.42, y:  0.02, w: 184, h: 246, r:  6, d: 188 },
];

// Hero wheel-step system
// step 0 = water intro (2 wheel ticks held here)
// step 1-5 = card focus steps
var HERO_CARD_COUNT = 5;
var HERO_INTRO_TICKS = 2;
var HERO_WHEEL_STEP_THRESHOLD = 18;
var HERO_WHEEL_BACK_THRESHOLD = 44;
var HERO_TOUCH_STEP_THRESHOLD = 42;
var HERO_RELEASE_EASING_GAP = 0.08;

var heroClusterLayout = [
  { ox: -0.52, oy: -0.23, scale: 0.88, rot: -12, depth: -24, phase: 0.1 },
  { ox: -0.32, oy: -0.31, scale: 0.86, rot: -6, depth: -8,  phase: 0.6 },
  { ox: -0.10, oy: -0.29, scale: 0.84, rot:  5, depth:  8,  phase: 1.1 },
  { ox:  0.14, oy: -0.23, scale: 0.86, rot:  9, depth: 22,  phase: 1.7 },
  { ox:  0.38, oy: -0.15, scale: 0.92, rot:  7, depth: 52,  phase: 2.1 },
  { ox:  0.52, oy:  0.07, scale: 0.84, rot: -8, depth: 18,  phase: 2.6 },
  { ox:  0.36, oy:  0.27, scale: 0.86, rot:  4, depth: -2,  phase: 3.1 },
  { ox:  0.12, oy:  0.35, scale: 0.90, rot: -9, depth: -18, phase: 3.7 },
  { ox: -0.16, oy:  0.31, scale: 0.82, rot:  8, depth: -34, phase: 4.2 },
  { ox: -0.40, oy:  0.17, scale: 1.04, rot:  0, depth: 66,  phase: 4.8 },
  { ox: -0.24, oy: -0.07, scale: 0.82, rot: -4, depth: 28,  phase: 5.4 },
  { ox:  0.22, oy:  0.09, scale: 0.78, rot: 11, depth: -12, phase: 5.9 },
];
