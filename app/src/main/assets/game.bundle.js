// game-src/components/registry.mjs
var COMPONENTS = [
  { id: "al-sheet", name: "Aluminum sheet", category: "raw-material", color: "#9bb0bc", dimensions: [2.6, 0.08, 1.4], mass: 1.3, ports: [], electrical: { conductivity: 35e6 }, mechanical: { density: 2700, strength: 31e7, friction: 0.55 }, model: "plate", behavior: "fabricable" },
  { id: "steel-plate", name: "Steel plate", category: "raw-material", color: "#59636b", dimensions: [1.8, 0.08, 1], mass: 2.2, ports: [], electrical: { conductivity: 14e6 }, mechanical: { density: 7850, strength: 4e8, friction: 0.62 }, model: "plate", behavior: "fabricable" },
  { id: "pcb", name: "Prototype PCB", category: "electronics", color: "#176b57", dimensions: [1.7, 0.08, 1.05], mass: 0.12, ports: ["5V", "GND", "D13", "A0", "PWM"], electrical: { voltage: 5, current: 0.5 }, mechanical: { density: 1850, strength: 1e8, friction: 0.4 }, model: "board", behavior: "board" },
  { id: "mcu", name: "MCU development board", category: "computing", color: "#263238", dimensions: [1.5, 0.1, 0.65], mass: 0.08, ports: ["5V", "GND", "D13", "A0", "PWM", "USB-C"], electrical: { voltage: 5, current: 0.2 }, mechanical: { density: 2200, strength: 8e7, friction: 0.4 }, model: "board", behavior: "mcu" },
  { id: "battery", name: "Li-ion battery pack", category: "power", color: "#d39b35", dimensions: [1.25, 0.45, 0.55], mass: 0.18, ports: ["+", "-"], electrical: { voltage: 7.4, current: 2.2, capacity: 2.2 }, mechanical: { density: 2100, strength: 3e7, friction: 0.45 }, model: "battery", behavior: "battery" },
  { id: "motor", name: "DC gear motor", category: "robotics", color: "#b86c2d", dimensions: [0.68, 0.55, 0.68], mass: 0.22, ports: ["M+", "M-", "mount-A", "mount-B"], electrical: { voltage: 6, current: 1.2 }, mechanical: { density: 7800, strength: 25e7, friction: 0.65 }, model: "motor", behavior: "motor" },
  { id: "wheel", name: "Rubber wheel", category: "robotics", color: "#242a2e", dimensions: [0.82, 0.28, 0.82], mass: 0.16, ports: ["axle"], electrical: {}, mechanical: { density: 1150, strength: 15e6, friction: 0.85 }, model: "wheel", behavior: "wheel" },
  { id: "led", name: "Red LED", category: "output", color: "#d54b4b", dimensions: [0.22, 0.26, 0.22], mass: 0.01, ports: ["anode", "cathode"], electrical: { forwardVoltage: 2, current: 0.02 }, mechanical: { density: 1200, strength: 5e7, friction: 0.35 }, model: "led", behavior: "led" },
  { id: "sensor", name: "Distance sensor", category: "sensor", color: "#3b9da8", dimensions: [0.45, 0.2, 0.25], mass: 0.03, ports: ["5V", "GND", "SIG"], electrical: { voltage: 5, current: 0.04 }, mechanical: { density: 1700, strength: 8e7, friction: 0.4 }, model: "sensor", behavior: "sensor" },
  { id: "speaker", name: "Mini speaker", category: "output", color: "#6e7884", dimensions: [0.42, 0.15, 0.42], mass: 0.04, ports: ["+", "-"], electrical: { voltage: 5, current: 0.15 }, mechanical: { density: 1600, strength: 4e7, friction: 0.5 }, model: "speaker", behavior: "speaker" },
  { id: "screw", name: "M3 screw", category: "fastener", color: "#c3ccd1", dimensions: [0.12, 0.45, 0.12], mass: 8e-3, ports: [], electrical: {}, mechanical: { density: 7850, strength: 6e8, friction: 0.7 }, model: "fastener", behavior: "fastener" },
  { id: "wire", name: "Jumper wire", category: "wire", color: "#e35a54", dimensions: [1.7, 0.035, 0.035], mass: 0.01, ports: ["end-a", "end-b"], electrical: { voltage: 30, current: 1 }, mechanical: { density: 8900, strength: 2e8, friction: 0.35 }, model: "wire", behavior: "wire" },
  { id: "screwdriver", name: "Phillips screwdriver", category: "tool", color: "#d34d43", dimensions: [0.16, 0.95, 0.16], mass: 0.09, ports: [], electrical: {}, mechanical: { density: 1200, strength: 6e7, friction: 0.5 }, model: "tool", behavior: "tool" },
  { id: "multimeter", name: "Digital multimeter", category: "tool", color: "#e7b84b", dimensions: [0.48, 0.12, 0.7], mass: 0.3, ports: ["COM", "V\u03A9", "A"], electrical: {}, mechanical: { density: 1e3, strength: 35e6, friction: 0.5 }, model: "instrument", behavior: "meter" }
];
var expanded = [
  ["bolt", "M4 hex bolt", "fastener", "#bdc7cb", [0.16, 0.55, 0.16], 0.012, [], "fastener", "fastener"],
  ["nut", "M4 lock nut", "fastener", "#9ba8ae", [0.2, 0.08, 0.2], 8e-3, [], "fastener", "fastener"],
  ["washer", "M4 washer", "fastener", "#a8b3b8", [0.24, 0.03, 0.24], 3e-3, [], "fastener", "fastener"],
  ["bearing", "608 bearing", "mechanical", "#718087", [0.44, 0.14, 0.44], 0.03, ["shaft"], "bearing", "bearing"],
  ["shaft", "Steel axle", "mechanical", "#899aa0", [1.2, 0.1, 0.1], 0.05, ["wheel", "gear"], "shaft", "shaft"],
  ["gear", "Spur gear", "mechanical", "#e5ae4a", [0.46, 0.1, 0.46], 0.025, ["shaft"], "gear", "gear"],
  ["servo", "Servo actuator", "robotics", "#2f4f62", [0.55, 0.4, 0.25], 0.06, ["5V", "GND", "PWM", "horn"], "servo", "servo"],
  ["spring", "Compression spring", "mechanical", "#c4ced0", [0.18, 0.45, 0.18], 0.01, [], "spring", "spring"],
  ["hinge", "Aluminum hinge", "mechanical", "#a5b0b3", [0.45, 0.08, 0.24], 0.035, ["pin"], "hinge", "hinge"],
  ["rod", "Carbon rod", "mechanical", "#323c43", [1.6, 0.06, 0.06], 0.02, [], "rod", "rod"],
  ["belt", "Timing belt", "mechanical", "#24282e", [1.2, 0.05, 0.12], 0.02, ["pulley"], "belt", "belt"],
  ["pulley", "Drive pulley", "mechanical", "#d1a144", [0.32, 0.12, 0.32], 0.03, ["shaft", "belt"], "pulley", "pulley"],
  ["capacitor", "100uF capacitor", "electronics", "#236da5", [0.18, 0.34, 0.18], 8e-3, ["+", "-"], "capacitor", "capacitor"],
  ["diode", "Signal diode", "electronics", "#1e2930", [0.28, 0.06, 0.06], 2e-3, ["anode", "cathode"], "diode", "diode"],
  ["transistor", "NPN transistor", "electronics", "#252d32", [0.18, 0.18, 0.08], 3e-3, ["B", "C", "E"], "transistor", "transistor"],
  ["mosfet", "MOSFET driver", "electronics", "#20262c", [0.28, 0.22, 0.1], 6e-3, ["G", "D", "S"], "mosfet", "mosfet"],
  ["relay", "5V relay", "electronics", "#2f6799", [0.42, 0.32, 0.32], 0.035, ["coil+", "coil-", "NO", "COM"], "relay", "relay"],
  ["potentiometer", "10k potentiometer", "electronics", "#5d6871", [0.25, 0.3, 0.25], 0.02, ["A", "W", "B"], "potentiometer", "potentiometer"],
  ["regulator", "5V regulator", "power", "#354148", [0.32, 0.18, 0.22], 0.012, ["VIN", "GND", "VOUT"], "regulator", "regulator"],
  ["lcd", "16x2 LCD", "output", "#234b63", [1.2, 0.25, 0.42], 0.07, ["5V", "GND", "I2C"], "display", "display"],
  ["oled", "I2C OLED", "output", "#173346", [0.65, 0.14, 0.38], 0.025, ["5V", "GND", "SDA", "SCL"], "display", "display"],
  ["buzzer", "Piezo buzzer", "output", "#232b31", [0.24, 0.12, 0.24], 0.01, ["+", "-"], "buzzer", "speaker"],
  ["rgb-led", "RGB LED", "output", "#a65fae", [0.24, 0.28, 0.24], 0.012, ["R", "G", "B", "GND"], "led", "led"],
  ["imu", "9-axis IMU", "sensor", "#245b83", [0.35, 0.12, 0.28], 0.01, ["5V", "GND", "I2C"], "sensor", "sensor"],
  ["temp-sensor", "Temperature sensor", "sensor", "#4a9aa2", [0.22, 0.14, 0.18], 6e-3, ["5V", "GND", "SIG"], "sensor", "sensor"],
  ["light-sensor", "Light sensor", "sensor", "#dba64d", [0.22, 0.12, 0.18], 6e-3, ["5V", "GND", "SIG"], "sensor", "sensor"],
  ["microphone", "Electret microphone", "sensor", "#7b8790", [0.22, 0.25, 0.22], 0.015, ["5V", "GND", "SIG"], "sensor", "sensor"],
  ["gps", "GPS module", "sensor", "#376f8b", [0.6, 0.12, 0.38], 0.022, ["5V", "GND", "UART"], "sensor", "sensor"],
  ["uart-wire", "UART cable", "wire", "#64a8d8", [1.5, 0.04, 0.04], 0.014, ["TX", "RX", "GND"], "wire", "wire"],
  ["usb-cable", "USB-C programming cable", "wire", "#d8dfe3", [1.8, 0.06, 0.06], 0.024, ["USB-A", "USB-C"], "wire", "wire"],
  ["motor-cable", "Motor power cable", "wire", "#e85d58", [1.4, 0.06, 0.06], 0.02, ["M+", "M-"], "wire", "wire"],
  ["soldering-iron", "Soldering iron", "tool", "#cc8e4d", [0.12, 0.9, 0.12], 0.12, [], "tool", "tool"],
  ["oscilloscope", "Portable oscilloscope", "tool", "#295a74", [0.7, 0.35, 0.45], 0.48, ["CH1", "CH2", "GND"], "instrument", "meter"],
  ["caliper", "Digital caliper", "tool", "#b8c6ca", [0.72, 0.12, 0.18], 0.11, [], "tool", "tool"],
  ["marker", "Layout marker", "tool", "#27648b", [0.12, 0.62, 0.12], 0.035, [], "tool", "tool"],
  ["bender", "Sheet-metal bender", "tool", "#52717a", [0.52, 0.52, 0.38], 1.4, [], "tool", "tool"],
  ["trimmer", "Deburring trimmer", "tool", "#c77a46", [0.14, 0.58, 0.14], 0.08, [], "tool", "tool"]
];
for (const [id, name, category, color, dimensions, mass, ports, model, behavior] of expanded) {
  COMPONENTS.push({ id, name, category, color, dimensions, mass, ports, electrical: {}, mechanical: { friction: 0.5 }, model, behavior });
}
var COMPONENT_BY_ID = Object.fromEntries(COMPONENTS.map((item) => [item.id, item]));
function metadataFor(id) {
  return COMPONENT_BY_ID[id] || COMPONENTS[0];
}

// game-src/electronics/simulator.mjs
function createCircuitState() {
  return { powered: false, voltage: 0, current: 0, ledOn: false, sensorValue: 0, motorPwm: 0, motorRpm: 0, audioHz: 0, fault: "", lastEvent: "Circuit idle" };
}
function evaluateCircuit(objects, connections, firmware, previous = createCircuitState(), dt = 1 / 30) {
  const byKind = (behavior) => objects.filter((object) => object.behavior === behavior);
  const battery = byKind("battery")[0];
  const mcu = byKind("mcu")[0];
  const led = byKind("led")[0];
  const motor = byKind("motor")[0];
  const sensor = byKind("sensor")[0];
  const speaker = byKind("speaker")[0];
  const circuitSwitch = byKind("switch")[0];
  const resistor = byKind("resistor")[0];
  const has = (a, b) => connections.some((c) => c.a === a && c.b === b || c.a === b && c.b === a);
  const connected = (x, y) => x && y && has(x.uid || x.id, y.uid || y.id);
  const switchClosed = !circuitSwitch || circuitSwitch.on !== false;
  const powered = Boolean(switchClosed && battery && mcu && (connected(battery, mcu) || connections.some((c) => c.a === (battery.uid || battery.id) || c.b === (battery.uid || battery.id))));
  const voltage = powered ? Math.max(0, Number(battery?.voltage || 7.4) - previous.current * 0.18) : 0;
  const sensorValue = sensor ? Math.round(220 + Math.sin(performance.now() / 850) * 150 + (previous.motorRpm > 50 ? 80 : 0)) : 0;
  const source = String(firmware || "");
  const high = /digitalWrite\s*\(\s*(?:LED|D13|13)[^,]*,\s*(?:HIGH|1)\s*\)/i.test(source);
  const low = /digitalWrite\s*\(\s*(?:LED|D13|13)[^,]*,\s*(?:LOW|0)\s*\)/i.test(source);
  const pwmMatch = source.match(/(?:analogWrite|PWM)\s*\([^,]+,\s*(\d+)/i);
  const pwm = pwmMatch ? Math.min(255, Number(pwmMatch[1])) : high ? 220 : 0;
  const ledOn = Boolean(powered && led && (connected(mcu, led) || connected(battery, led)) && !low && (high || pwm > 0));
  const motorPwm = Boolean(powered && motor && (connected(mcu, motor) || connected(battery, motor))) ? pwm : 0;
  const motorRpm = Math.max(0, Math.min(3600, motorPwm * 14.2 - previous.motorRpm * dt * 1.4));
  const audioHz = speaker && powered && connected(mcu, speaker) ? source.match(/tone\s*\([^,]+,\s*(\d+)/i)?.[1] || 0 : 0;
  const ledCurrent = ledOn ? resistor ? 0.018 : 0.04 : 0;
  const current = powered ? Math.min(4, 0.12 + ledCurrent + motorPwm / 255 * 1.1 + (audioHz ? 0.1 : 0)) : 0;
  const fault = voltage < 2 && powered ? "LOW VOLTAGE" : current > 2.5 ? "OVERLOAD PROTECTION" : "";
  return {
    powered: powered && !fault,
    voltage: Number(voltage.toFixed(2)),
    current: Number(current.toFixed(2)),
    ledOn,
    sensorValue,
    motorPwm,
    motorRpm: Number(motorRpm.toFixed(0)),
    audioHz: Number(audioHz),
    fault,
    lastEvent: fault || (!switchClosed ? "Switch is open" : ledOn ? "LED is receiving simulated current" : powered ? "Power rail active" : "Circuit requires a battery and connections")
  };
}

// game-src/robotics/assembly.mjs
function validateAssembly(objects, connections) {
  const key = (x) => x.uid || x.id;
  const has = (a, b) => connections.some((c) => c.a === a && c.b === b || c.a === b && c.b === a);
  const first = (behavior) => objects.find((o) => o.behavior === behavior);
  const battery = first("battery");
  const mcu = first("mcu");
  const motor = first("motor");
  const wheel = first("wheel");
  const led = first("led");
  const sensor = first("sensor");
  const mountedTo = (child, parent) => Boolean(child && parent && (child.parentUid === key(parent) || has(key(child), key(parent))));
  const checks = [
    { label: "Power source placed", ok: Boolean(battery) },
    { label: "MCU available", ok: Boolean(mcu) },
    { label: "Battery \u2192 MCU power path", ok: Boolean(battery && mcu && has(key(battery), key(mcu))) },
    { label: "Motor mounted to chassis", ok: Boolean(motor && (motor.attached || motor.parentUid)) },
    { label: "Wheel connected to motor", ok: mountedTo(wheel, motor) },
    { label: "Drive train mechanically aligned", ok: Boolean(motor && wheel && (mountedTo(wheel, motor) || Math.hypot(motor.x - wheel.x, motor.z - wheel.z) < 1.25)) },
    { label: "Sensor wired to controller", ok: Boolean(sensor && mcu && has(key(sensor), key(mcu))) },
    { label: "LED wired to controller", ok: Boolean(led && mcu && has(key(led), key(mcu))) }
  ];
  const ready = checks.filter((check) => check.label.includes("Wheel") || check.label.includes("Battery") || check.label.includes("Motor") || check.label.includes("Drive train")).every((check) => check.ok);
  return { checks, ready };
}

// game-src/physics/mobile-controls.mjs
var CONTROL_DEFAULTS = Object.freeze({
  deadZone: 0.1,
  maxRadius: 58,
  moveAcceleration: 11,
  moveDeceleration: 16,
  walkSpeed: 2.6,
  sprintSpeed: 4.6,
  lookSensitivity: 32e-4,
  pitchLimit: 1.18
});
function analogStickFromPoint(pointX, pointY, centerX, centerY, options = CONTROL_DEFAULTS) {
  const rawX = pointX - centerX;
  const rawY = pointY - centerY;
  const distance2 = Math.hypot(rawX, rawY);
  const capped = Math.min(options.maxRadius, distance2);
  const magnitude = capped / options.maxRadius;
  if (!distance2 || magnitude <= options.deadZone) return { x: 0, y: 0, magnitude: 0, knobX: 0, knobY: 0 };
  const scaled = (magnitude - options.deadZone) / (1 - options.deadZone);
  const x = rawX / distance2 * scaled;
  const y = rawY / distance2 * scaled;
  return { x, y, magnitude: scaled, knobX: x * options.maxRadius, knobY: y * options.maxRadius };
}
function releasedStick() {
  return { x: 0, y: 0, magnitude: 0, knobX: 0, knobY: 0 };
}
function nextVelocity(current, input, dt, options = CONTROL_DEFAULTS) {
  const targetX = input.x * (input.sprint ? options.sprintSpeed : options.walkSpeed);
  const targetZ = input.y * (input.sprint ? options.sprintSpeed : options.walkSpeed);
  const rate = input.magnitude > 0 ? options.moveAcceleration : options.moveDeceleration;
  const t = Math.min(1, rate * dt);
  return { x: current.x + (targetX - current.x) * t, z: current.z + (targetZ - current.z) * t };
}
function nextLook(camera, deltaX, deltaY, sensitivity = CONTROL_DEFAULTS.lookSensitivity, pitchLimit = CONTROL_DEFAULTS.pitchLimit) {
  return {
    yaw: camera.yaw + deltaX * sensitivity,
    pitch: Math.max(-pitchLimit, Math.min(pitchLimit, camera.pitch + deltaY * sensitivity))
  };
}

// game-src/physics/assembly-snapping.mjs
var MOUNTABLE_TO_CHASSIS = /* @__PURE__ */ new Set(["motor", "battery", "mcu", "sensor", "board", "bracket"]);
function range(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
function snapIntent(held, target) {
  if (!held || !target || held.uid === target.uid) return null;
  if (held.behavior === "wheel" && target.behavior === "motor") return { kind: "axle", label: "ATTACH WHEEL", offset: [0, 0.15, 0.5] };
  if (held.behavior === "fastener" && ["bracket", "fabricable", "motor"].includes(target.behavior)) return { kind: "fasten", label: "INSERT SCREW", offset: [0, 0.18, 0] };
  if (held.behavior === "wire" && target.ports?.length) return { kind: "connect", label: "CONNECT CABLE", offset: [0, 0.18, 0] };
  if (MOUNTABLE_TO_CHASSIS.has(held.behavior) && ["fabricable", "board", "bracket"].includes(target.behavior)) return { kind: "mount", label: `MOUNT ${held.name.toUpperCase()}`, offset: [0, target.sy + held.sy + 0.025, 0] };
  if (held.behavior === "bracket" && target.behavior === "fabricable") return { kind: "bracket", label: "PLACE BRACKET", offset: [0, target.sy + held.sy + 0.02, 0] };
  return null;
}
function nearestSnap(held, objects, maxDistance = 1.35) {
  let candidate = null;
  for (const target of objects) {
    if (target.hidden || target.held) continue;
    const intent = snapIntent(held, target);
    if (!intent) continue;
    const distance2 = range(held, target);
    if (distance2 <= maxDistance && (!candidate || distance2 < candidate.distance)) {
      candidate = { target, intent, distance: distance2, point: [target.x + intent.offset[0], target.y + intent.offset[1], target.z + intent.offset[2]] };
    }
  }
  return candidate;
}
function applySnap(held, snap) {
  if (!snap) return null;
  return {
    ...held,
    x: snap.point[0],
    y: snap.point[1],
    z: snap.point[2],
    attached: true,
    parentUid: snap.target.uid,
    snapKind: snap.intent.kind
  };
}

// game-src/physics/robot-motion.mjs
function moveRobotOnTestFloor(chassis, mountedParts, circuit, dt, bounds = { minX: 2.4, maxX: 5.2, minZ: 3.8, maxZ: 5.8 }) {
  if (!chassis || !circuit?.powered || !(circuit.motorRpm > 25)) return { chassis, mountedParts, moved: false };
  const speed = Math.min(1.15, circuit.motorRpm / 3600 * 1.15);
  const nextZ = chassis.z - speed * dt;
  const nextX = chassis.x;
  const clampedZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, nextZ));
  const delta = { x: nextX - chassis.x, z: clampedZ - chassis.z };
  const movedChassis = { ...chassis, x: nextX, z: clampedZ };
  const movedParts = mountedParts.map((part) => ({ ...part, x: part.x + delta.x, z: part.z + delta.z }));
  return { chassis: movedChassis, mountedParts: movedParts, moved: Math.abs(delta.x) + Math.abs(delta.z) > 0 };
}

// game-src/app.js
var canvas = document.querySelector("#viewport");
var gl = canvas.getContext("webgl", { antialias: true, alpha: false });
if (!gl) throw new Error("WebGL is unavailable in this browser.");
var vs = `attribute vec3 aPosition; attribute vec3 aNormal; attribute vec3 aColor; uniform mat4 uMvp; uniform mat4 uModel; uniform vec3 uLight; varying vec3 vColor; varying float vLight; void main(){vec4 w=uModel*vec4(aPosition,1.0);gl_Position=uMvp*w;vec3 n=normalize(mat3(uModel)*aNormal);vLight=max(.2,dot(n,normalize(uLight)));vColor=aColor;}`;
var fs = `precision mediump float; varying vec3 vColor; varying float vLight; uniform float uGlow; void main(){vec3 c=vColor*(.38+vLight*.82)+vec3(uGlow*.7,uGlow*.25,uGlow*.08);gl_FragColor=vec4(c,1.0);}`;
function compile(type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
var program = gl.createProgram();
gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
gl.useProgram(program);
var loc = { p: gl.getAttribLocation(program, "aPosition"), n: gl.getAttribLocation(program, "aNormal"), c: gl.getAttribLocation(program, "aColor"), mvp: gl.getUniformLocation(program, "uMvp"), model: gl.getUniformLocation(program, "uModel"), light: gl.getUniformLocation(program, "uLight"), glow: gl.getUniformLocation(program, "uGlow") };
var math = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul: (a, s) => a.map((v) => v * s), dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], norm: (a) => {
  const l = Math.hypot(...a) || 1;
  return a.map((v) => v / l);
} };
function mm(a, b) {
  const o = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return o;
}
function perspective(fov, aspect, near, far) {
  const f = 1 / Math.tan(fov / 2), nf = 1 / (near - far);
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
}
function lookAt(e, t, u = [0, 1, 0]) {
  const z = math.norm(math.sub(e, t)), x = math.norm(math.cross(u, z)), y = math.cross(z, x);
  return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -math.dot(x, e), -math.dot(y, e), -math.dot(z, e), 1];
}
function T(x, y, z) {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
}
function S(x, y, z) {
  return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
}
function RY(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}
function RX(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
}
function transform(o) {
  return mm(T(o.x, o.y, o.z), mm(RY(o.rotation || 0), mm(RX(o.pitch || 0), S(o.sx || 0.1, o.sy || 0.1, o.sz || 0.1))));
}
function hex(h) {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}
function meshCube() {
  const p = [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1], [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]], faces = [[0, 1, 2, 3, 0, 0, 1], [5, 4, 7, 6, 0, 0, -1], [3, 2, 6, 7, 0, 1, 0], [4, 5, 1, 0, 0, -1, 0], [1, 5, 6, 2, 1, 0, 0], [4, 0, 3, 7, -1, 0, 0]], pos = [], nor = [];
  for (const f of faces) for (const i of [0, 1, 2, 0, 2, 3]) {
    pos.push(...p[f[i]]);
    nor.push(f[4], f[5], f[6]);
  }
  return { pos, nor };
}
function meshCylinder(segments = 16) {
  const pos = [], nor = [];
  for (let i = 0; i < segments; i++) {
    const a = i / segments * Math.PI * 2, b = (i + 1) / segments * Math.PI * 2;
    pos.push(0, -1, 0, Math.cos(a), -1, Math.sin(a), Math.cos(b), -1, Math.sin(b));
    nor.push(0, -1, 0, 0, -1, 0, 0, -1, 0);
    pos.push(0, 1, 0, Math.cos(b), 1, Math.sin(b), Math.cos(a), 1, Math.sin(a));
    nor.push(0, 1, 0, 0, 1, 0, 0, 1, 0);
    pos.push(Math.cos(a), -1, Math.sin(a), Math.cos(b), -1, Math.sin(b), Math.cos(b), 1, Math.sin(b), Math.cos(a), -1, Math.sin(a), Math.cos(b), 1, Math.sin(b), Math.cos(a), 1, Math.sin(a));
    for (let j = 0; j < 6; j++) nor.push(Math.cos((a + b) / 2), 0, Math.sin((a + b) / 2));
  }
  return { pos, nor };
}
var meshes = { cube: meshCube(), cylinder: meshCylinder() };
for (const [name, m] of Object.entries(meshes)) {
  m.pb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, m.pb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(m.pos), gl.STATIC_DRAW);
  m.nb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, m.nb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(m.nor), gl.STATIC_DRAW);
  m.count = m.pos.length / 3;
}
function draw(o, vp, colorOverride) {
  const m = meshes[o.shape || "cube"];
  gl.bindBuffer(gl.ARRAY_BUFFER, m.pb);
  gl.enableVertexAttribArray(loc.p);
  gl.vertexAttribPointer(loc.p, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, m.nb);
  gl.enableVertexAttribArray(loc.n);
  gl.vertexAttribPointer(loc.n, 3, gl.FLOAT, false, 0, 0);
  const cb = gl.createBuffer();
  const c = colorOverride || o.glowColor || hex(o.color || "#79939a");
  const colors = new Float32Array(Array.from({ length: m.count }, () => c).flat());
  gl.bindBuffer(gl.ARRAY_BUFFER, cb);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(loc.c);
  gl.vertexAttribPointer(loc.c, 3, gl.FLOAT, false, 0, 0);
  gl.uniformMatrix4fv(loc.model, false, transform(o));
  gl.uniformMatrix4fv(loc.mvp, false, mm(vp, transform(o)));
  gl.uniform1f(loc.glow, o.glow || 0);
  gl.drawArrays(gl.TRIANGLES, 0, m.count);
  gl.deleteBuffer(cb);
}
var state = { player: { x: 0, y: 1.65, z: 7, yaw: Math.PI, pitch: -0.12, vy: 0, crouch: false }, keys: /* @__PURE__ */ new Set(), touch: { moveX: 0, moveY: 0, lookX: 0, lookY: 0 }, cameraMode: "first-person", panel: null, target: null, held: null, world: [], connections: [], circuit: createCircuitState(), firmware: `// Local MCU firmware
const LED_PIN = 13;
function setup(){ pinMode(LED_PIN, OUTPUT); }
function loop(){
  digitalWrite(LED_PIN, HIGH);
  analogWrite(MOTOR, 190);
  tone(SPEAKER, 440);
}`, console: "Virtual workstation idle.", projectName: "My first machine", quality: "MEDIUM", openedDrawers: /* @__PURE__ */ new Set(), assemblyLog: [], last: performance.now(), fps: 60 };
var uid = 1;
var fallback = { floor: { name: "Workshop floor", category: "environment", color: "#152b31", dims: [20, 0.1, 16], shape: "cube", behavior: "floor", mass: 100, ports: [] }, wall: { name: "Lab wall", category: "environment", color: "#263f43", dims: [20, 4, 0.2], shape: "cube", behavior: "wall", mass: 100, ports: [] }, bench: { name: "Workbench", category: "environment", color: "#62432f", dims: [5.6, 0.24, 2.1], shape: "cube", behavior: "bench", mass: 100, ports: [] }, shelf: { name: "Storage shelf", category: "environment", color: "#314b52", dims: [0.7, 4, 5], shape: "cube", behavior: "shelf", mass: 100, ports: [] }, bracket: { name: "Mounting bracket", category: "mechanics", color: "#a0aeb2", dims: [0.42, 0.16, 0.38], shape: "cube", behavior: "bracket", mass: 0.08, ports: ["hole-A", "hole-B"] }, nut: { name: "M3 nut", category: "fastener", color: "#bdc9cc", dims: [0.15, 0.09, 0.15], shape: "cylinder", behavior: "fastener", mass: 5e-3, ports: [] }, washer: { name: "M3 washer", category: "fastener", color: "#8b999d", dims: [0.18, 0.035, 0.18], shape: "cylinder", behavior: "fastener", mass: 3e-3, ports: [] }, breadboard: { name: "Solderless breadboard", category: "electronics", color: "#e9e6d3", dims: [0.9, 0.12, 0.5], shape: "cube", behavior: "board", mass: 0.12, ports: ["5V", "GND", "A0", "D13"] }, resistor: { name: "220 ohm resistor", category: "analog", color: "#d6b476", dims: [0.3, 0.06, 0.06], shape: "cylinder", behavior: "resistor", mass: 2e-3, ports: ["a", "b"] }, switch: { name: "Toggle switch", category: "control", color: "#34474a", dims: [0.22, 0.2, 0.18], shape: "cube", behavior: "switch", mass: 0.02, ports: ["in", "out"] }, drill: { name: "Cordless drill", category: "tool", color: "#2f6d73", dims: [0.22, 0.52, 0.18], shape: "cube", behavior: "tool", mass: 0.5, ports: [] }, saw: { name: "Hand saw", category: "tool", color: "#b7c0bf", dims: [0.7, 0.08, 0.12], shape: "cube", behavior: "tool", mass: 0.3, ports: [] }, wrench: { name: "Adjustable wrench", category: "tool", color: "#8e9a9c", dims: [0.16, 0.65, 0.1], shape: "cube", behavior: "tool", mass: 0.18, ports: [] }, drawer: { name: "Component drawer", category: "storage", color: "#405762", dims: [0.85, 0.3, 0.55], shape: "cube", behavior: "drawer", mass: 2, ports: [] }, computer: { name: "Virtual programming computer", category: "station", color: "#1c3039", dims: [0.7, 0.55, 0.3], shape: "cube", behavior: "computer", mass: 8, ports: ["USB"] }, testfloor: { name: "Robot test floor", category: "station", color: "#254b45", dims: [3, 0.04, 2], shape: "cube", behavior: "testfloor", mass: 10, ports: [] } };
Object.assign(fallback, { cabinet: { name: "Tool cabinet", category: "environment", color: "#31525a", dims: [1.2, 1.9, 0.55], shape: "cube", behavior: "cabinet", mass: 80, ports: [] }, bin: { name: "Parts bin", category: "storage", color: "#54717a", dims: [0.46, 0.28, 0.35], shape: "cube", behavior: "bin", mass: 1, ports: [] }, machine: { name: "Fabrication station", category: "environment", color: "#43616a", dims: [1.3, 1.25, 0.9], shape: "cube", behavior: "machine", mass: 150, ports: [] }, monitor: { name: "Engineering monitor", category: "station", color: "#172c34", dims: [0.85, 0.52, 0.12], shape: "cube", behavior: "monitor", mass: 4, ports: ["USB"] }, keyboard: { name: "Programming keyboard", category: "station", color: "#314048", dims: [0.6, 0.06, 0.24], shape: "cube", behavior: "keyboard", mass: 1, ports: [] }, chair: { name: "Lab chair", category: "environment", color: "#334951", dims: [0.55, 0.75, 0.55], shape: "cube", behavior: "chair", mass: 8, ports: [] }, lamp: { name: "Adjustable work light", category: "environment", color: "#d7b755", dims: [0.18, 0.75, 0.18], shape: "cylinder", behavior: "lamp", mass: 1, ports: [] }, powerstrip: { name: "Bench power strip", category: "power", color: "#e2e5e4", dims: [0.8, 0.08, 0.1], shape: "cube", behavior: "powerstrip", mass: 0.4, ports: ["AC", "5V", "GND"] } });
function meta(id) {
  return fallback[id] || (() => {
    const m = metadataFor(id);
    return { name: m.name, category: m.category, color: m.color, dims: m.dimensions || [0.3, 0.2, 0.3], shape: m.model === "wheel" || m.model === "motor" ? "cylinder" : "cube", behavior: m.behavior, mass: m.mass || 0.1, ports: m.ports || [] };
  })();
}
function obj(id, x, y, z, extra = {}) {
  const m = meta(id);
  return { uid: `w${uid++}`, id, name: m.name, category: m.category, color: extra.color || m.color, x, y, z, sx: extra.sx ?? m.dims[0] / 2, sy: extra.sy ?? m.dims[1] / 2, sz: extra.sz ?? m.dims[2] / 2, shape: extra.shape || m.shape, behavior: m.behavior, mass: m.mass, ports: m.ports || [], rotation: extra.rotation || 0, pitch: extra.pitch || 0, static: extra.static || false, hidden: extra.hidden || false, held: false, attached: false, locked: false, holes: 0, cutMarks: 0, open: false, contains: extra.contains || [], glow: 0, glowColor: null, velocity: [0, 0, 0], firmware: "" };
}
function buildWorld() {
  state.world = [];
  const add = (id, x, y, z, e = {}) => state.world.push(obj(id, x, y, z, e));
  add("floor", 0, -0.05, 0, { static: true, sx: 10, sy: 0.05, sz: 8, color: "#152b31" });
  add("wall", 0, 2, -8, { static: true, sx: 10, sy: 2, sz: 0.1, color: "#263f43" });
  add("wall", -10, 2, 0, { static: true, sx: 0.1, sy: 2, sz: 8, color: "#20363b" });
  add("wall", 10, 2, 0, { static: true, sx: 0.1, sy: 2, sz: 8, color: "#20363b" });
  add("bench", -2.8, 0.72, 1.6, { static: true, sx: 2.8, sy: 0.12, sz: 1.05, color: "#62432f" });
  add("bench", 3.2, 0.72, -0.4, { static: true, sx: 2.2, sy: 0.12, sz: 1.05, color: "#4b5a5e" });
  add("bench", -1.1, 0.72, -4.1, { static: true, sx: 2.3, sy: 0.12, sz: 0.85, color: "#56402f" });
  add("shelf", -7.8, 2, -1.2, { static: true, sx: 0.35, sy: 2, sz: 2.5, color: "#314b52" });
  add("shelf", 7.8, 2, -1.2, { static: true, sx: 0.35, sy: 2, sz: 2.5, color: "#314b52" });
  for (let row = 0; row < 4; row++) for (let slot = 0; slot < 6; slot++) {
    add("bin", -7.12, 0.38 + row * 0.43, -2.6 + slot * 0.52, { static: true });
    add("bin", 7.12, 0.38 + row * 0.43, -2.6 + slot * 0.52, { static: true });
  }
  for (let i = 0; i < 6; i++) {
    add("cabinet", -8.6, 0.95, -5.6 + i * 2.1, { static: true, sz: 0.45 });
    add("lamp", -4.8 + i * 1.55, 1.65, 2.55, { static: true });
  }
  add("machine", -5.8, 0.63, -4.8, { static: true });
  add("machine", -5.8, 0.63, -2.9, { static: true });
  add("machine", -5.8, 0.63, -1, { static: true });
  add("cabinet", 5.9, 0.95, -5.5, { static: true });
  add("monitor", 5.5, 1.75, -3.9, { static: true });
  add("keyboard", 5.5, 1.04, -3.5, { static: true });
  add("chair", 5.5, 0.42, -2.9, { static: true });
  add("powerstrip", 3.2, 0.95, 0.55, { static: true });
  for (let i = 0; i < 4; i++) {
    add("drawer", -7.25, 0.45 + i * 0.45, -1.2, { contains: i === 0 ? ["screwdriver", "screw", "nut", "washer"] : i === 1 ? ["motor", "wheel"] : i === 2 ? ["resistor", "led", "wire"] : ["sensor", "speaker", "mcu"] });
  }
  add("computer", 5.5, 1.25, -3.9, { static: true });
  add("testfloor", 3.8, 0.03, 4.7, { static: true });
  add("al-sheet", -3.5, 1.02, 1.5);
  add("steel-plate", -1.5, 1.02, 1.5);
  add("pcb", -0.2, 1.05, 1.55);
  add("mcu", 0.7, 1.1, 1.5);
  add("battery", 1.7, 1.13, 1.55);
  add("motor", -1.6, 1.15, -0.1);
  add("wheel", -1.6, 1.22, -0.85, { rotation: Math.PI / 2 });
  add("led", 0.9, 1.12, 0.4);
  add("sensor", 1.45, 1.12, 0.35);
  add("speaker", 2.1, 1.1, 0.35);
  add("wire", -0.2, 1.28, -0.2, { shape: "cylinder", rotation: Math.PI / 2 });
  add("screw", -3.7, 1.22, 0.85, { shape: "cylinder" });
  add("screwdriver", -4.9, 1.2, 0.6, { shape: "cylinder", rotation: Math.PI / 2 });
  add("drill", -4.25, 1.15, 0.6);
  add("saw", -3.75, 1.16, 0.6);
  add("wrench", -3.2, 1.16, 0.6);
  add("multimeter", 3.9, 1.1, -0.45);
  add("bracket", -2.2, 1.1, 0.1);
  add("breadboard", -0.1, 1.12, 0.6);
  add("resistor", 0.35, 1.22, 0.55, { shape: "cylinder", rotation: Math.PI / 2 });
  add("switch", 0.75, 1.17, 0.6);
  add("computer", 5.5, 1.25, -3.9, { static: true });
  for (const o of state.world) {
    if (o.id === "floor" || o.id === "wall" || o.id === "bench" || o.id === "shelf" || o.id === "drawer" || o.id === "computer" || o.id === "testfloor") o.static = true;
  }
}
buildWorld();
function resize() {
  const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2), w = Math.max(1, Math.floor((r.width || innerWidth) * d)), h = Math.max(1, Math.floor((r.height || innerHeight) * d));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
}
addEventListener("resize", resize);
resize();
function forward() {
  return [Math.sin(state.player.yaw) * Math.cos(state.player.pitch), Math.sin(state.player.pitch), Math.cos(state.player.yaw) * Math.cos(state.player.pitch)];
}
function right() {
  return [Math.cos(state.player.yaw), 0, -Math.sin(state.player.yaw)];
}
function eye() {
  return [state.player.x, state.player.y - (state.player.crouch ? 0.35 : 0), state.player.z];
}
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
function blocked(x, z) {
  return x < -9.4 || x > 9.4 || z < -7.5 || z > 7.5;
}
function objectForward(o) {
  const e = eye(), f = forward(), v = math.sub([o.x, o.y, o.z], e), d = Math.hypot(...v), u = math.norm(v), cross = math.cross(u, f);
  return { d, dot: math.dot(u, f), cross: Math.hypot(...cross) };
}
function findTarget() {
  let best = null, score = 0.18;
  for (const o of state.world) {
    if (o.hidden || o.held || o.static && ["floor", "wall"].includes(o.id) || o.behavior === "drawer" && o.open) continue;
    const h = objectForward(o);
    if (h.d < 5.5 && h.dot > 0.72 && h.cross < Math.max(0.38, h.d * 0.13) && h.d < score * 25) {
      const s = h.d / 8 + h.cross;
      if (!best || s < score) {
        best = o;
        score = s;
      }
    }
  }
  return best;
}
function setTarget(o) {
  state.target = o;
  document.querySelector("#crosshair").classList.toggle("hot", Boolean(o) || Boolean(state.snap));
  const card = document.querySelector("#contextCard");
  const prompt = document.querySelector("#lookPrompt");
  if (state.snap) {
    card.classList.add("visible");
    card.innerHTML = `<span class="object-name">${state.snap.intent.label}</span><span class="object-meta">${state.held.name} \u2192 ${state.snap.target.name} \xB7 release DROP to mount</span>`;
    prompt.textContent = "Compatible mount found \u2014 place to snap";
    return;
  }
  if (o) {
    card.classList.add("visible");
    card.innerHTML = `<span class="object-name">${o.name}</span><span class="object-meta">${o.static ? "walk up \xB7 " : ""}${o.held ? "held in hand \xB7 " : ""}${o.ports.length ? `${o.ports.length} connection ports \xB7 ` : ""}${Math.round(o.mass * 1e3)} g</span>`;
    prompt.textContent = o.held ? "Place or drop the object" : "Tap INTERACT to handle";
  } else {
    card.classList.remove("visible");
    prompt.textContent = state.held ? "Object held \xB7 move to place" : "Look at an object to interact";
  }
}
function updateHeld() {
  if (!state.held) {
    state.snap = null;
    return;
  }
  const e = eye(), f = forward();
  state.held.x = e[0] + f[0] * 1.35;
  state.held.y = e[1] + f[1] * 1.35;
  state.held.z = e[2] + f[2] * 1.35;
  state.held.rotation = state.player.yaw + Math.PI / 2;
  state.snap = nearestSnap(state.held, state.world.filter((o) => o !== state.held));
  if (state.snap) {
    const p = state.snap.point;
    state.held.x += (p[0] - state.held.x) * 0.38;
    state.held.y += (p[1] - state.held.y) * 0.38;
    state.held.z += (p[2] - state.held.z) * 0.38;
    state.snap.target.glow = 0.45;
    state.held.glow = 0.55;
  } else state.held.glow = 0.28;
}
var audioContext;
function gameTone(text) {
  try {
    audioContext ?? (audioContext = new (window.AudioContext || window.webkitAudioContext)());
    const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
    const ok = !/invalid|incomplete|failed|nothing/i.test(text);
    oscillator.frequency.value = ok ? 440 : 160;
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + 0.09);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch {
  }
}
function toast(text) {
  gameTone(text);
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.querySelector("#toastZone").append(t);
  setTimeout(() => t.remove(), 3e3);
}
function status() {
  const c = state.circuit;
  document.querySelector("#statusStack").innerHTML = `<div class="status-row"><span>POWER</span><b class="${c.powered ? "" : "warn"}">${c.powered ? "ON" : "OFF"}</b></div><div class="status-row"><span>BUS</span><b>${c.voltage.toFixed(2)} V</b></div><div class="status-row"><span>MOTOR</span><b>${c.motorRpm} RPM</b></div><div class="status-row"><span>SENSOR</span><b>${c.sensorValue}</b></div><div class="status-row"><span>NETS</span><b>${state.connections.length}</b></div>`;
  document.querySelector("#locationCoords").textContent = `x ${state.player.x.toFixed(1)} \xB7 z ${state.player.z.toFixed(1)}`;
  document.querySelector("#heldBadge").innerHTML = `<span>${state.held ? "HOLDING" : "HANDS"}</span><strong>${state.held ? state.held.name : "Empty hands"}</strong>`;
  document.querySelector("#dropBtn").classList.toggle("visible", Boolean(state.held));
}
function interact() {
  const o = state.target;
  if (state.held && o && state.held.behavior === "tool") {
    if (state.held.id === "screwdriver" && o.behavior === "fastener") {
      o.attached = true;
      o.locked = true;
      state.assemblyLog.push(`Tightened ${o.name} with screwdriver`);
      toast(`${o.name} tightened with screwdriver.`);
      return;
    }
    if (state.held.id === "wrench" && o.behavior === "fastener") {
      o.locked = true;
      state.assemblyLog.push(`Nut/fastener tightened with wrench`);
      toast(`${o.name} tightened with wrench.`);
      return;
    }
    if (state.held.id === "caliper" && o.behavior === "fabricable") {
      toast(`${o.name}: ${(o.sx * 2).toFixed(2)} \xD7 ${(o.sy * 2).toFixed(2)} \xD7 ${(o.sz * 2).toFixed(2)} virtual metres.`);
      return;
    }
    if (state.held.id === "marker" && o.behavior === "fabricable") {
      o.marked = (o.marked || 0) + 1;
      o.color = "#4a8090";
      toast(`Layout mark ${o.marked} added to ${o.name}.`);
      return;
    }
    if (state.held.id === "bender" && o.behavior === "fabricable") {
      o.pitch = (o.pitch || 0) + 0.2;
      state.assemblyLog.push(`Bent ${o.name} by 11\xB0`);
      toast(`${o.name} bent by 11\xB0.`);
      return;
    }
    if (state.held.id === "drill" && o.behavior === "fabricable") {
      o.holes++;
      state.assemblyLog.push(`Drilled hole in ${o.name}`);
      toast(`Drilled hole ${o.holes} in ${o.name}.`);
      return;
    }
    if ((state.held.id === "saw" || state.held.id === "trimmer") && o.behavior === "fabricable") {
      o.cutMarks++;
      o.sx *= state.held.id === "trimmer" ? 0.94 : 0.82;
      state.assemblyLog.push(`${state.held.id === "trimmer" ? "Trimmed" : "Cut"} ${o.name}`);
      toast(`${o.name} ${state.held.id === "trimmer" ? "trimmed" : "cut"}; geometry changed.`);
      return;
    }
  }
  if (state.held) {
    dropHeld();
    return;
  }
  if (!o) {
    toast("Nothing within reach. Walk closer and look at an object.");
    return;
  }
  if (o.behavior === "switch") {
    o.on = o.on === false;
    toast(`Switch ${o.on ? "ON" : "OFF"}.`);
    return;
  }
  if (o.behavior === "drawer") {
    o.open = !o.open;
    state.openedDrawers.add(o.uid);
    if (o.open) {
      for (const id of o.contains) {
        const p = obj(id, o.x + 0.4 + (Math.random() - 0.5) * 0.25, o.y + 0.35, o.z + (Math.random() - 0.5) * 0.25);
        state.world.push(p);
      }
      o.color = "#617f84";
      toast("Drawer open. Parts are physically inside.");
    } else toast("Drawer closed.");
    return;
  }
  if (o.behavior === "computer" || o.behavior === "monitor") {
    openPanel("program");
    toast("Programming workstation opened.");
    return;
  }
  if (o.behavior === "testfloor") {
    toast("Testing area: place the assembled machine here, then power it.");
    openPanel("robot");
    return;
  }
  if (o.static) {
    toast("A solid lab fixture. Walk around it.");
    return;
  }
  o.held = true;
  state.held = o;
  toast(`${o.name} picked up. Carry it to a bench or connection point.`);
}
function dropHeld() {
  const o = state.held;
  if (!o) return;
  o.held = false;
  o.glow = 0;
  if (state.snap) {
    Object.assign(o, applySnap(o, state.snap));
    state.assemblyLog.push(`${state.snap.intent.label} \xB7 ${o.name} \u2192 ${state.snap.target.name}`);
    toast(`${state.snap.intent.label}: ${o.name} snapped into place.`);
    state.snap = null;
    state.held = null;
    return;
  }
  const near = state.world.filter((x) => x !== o && !x.hidden).sort((a, b) => distance(o, a) - distance(o, b))[0];
  if (near && distance(o, near) < 0.5 && near.static) {
    o.y = near.y + near.sy + o.sy + 0.03;
    o.x = near.x + (Math.random() - 0.5) * near.sx;
    o.z = near.z + (Math.random() - 0.5) * near.sz;
    toast(`${o.name} placed on ${near.name}.`);
  } else {
    o.x = Math.max(-9, Math.min(9, o.x));
    o.z = Math.max(-7, Math.min(7, o.z));
    toast(`${o.name} dropped.`);
  }
  if (o.behavior === "fastener" && near && near.behavior === "bracket") {
    o.attached = true;
    near.attached = true;
    state.assemblyLog.push("Fastener inserted into bracket");
    toast("Fastener aligned with bracket hole. Tighten with a screwdriver.");
  }
  state.held = null;
}
function rotateHeld(amount) {
  if (state.held) state.held.rotation += amount || 0.2;
}
function connect(a, b) {
  if (!a || !b || a === b) return;
  if (state.connections.some((c) => c.a === a.uid && c.b === b.uid || c.a === b.uid && c.b === a.uid)) return toast("That connection already exists.");
  state.connections.push({ a: a.uid, b: b.uid, kind: a.behavior === "battery" || b.behavior === "battery" ? "power" : "signal" });
  toast(`${a.name} connected to ${b.name}`);
}
function tryPhysicalConnect() {
  const o = state.target;
  if (state.held?.behavior === "wire" && o && o !== state.held) {
    if (!state.held.endA) {
      state.held.endA = o.uid;
      toast(`Wire end A connected to ${o.name}. Route the cable to the next port.`);
    } else {
      state.held.endB = o.uid;
      connect(state.world.find((x) => x.uid === state.held.endA), o);
      toast(`Wire end B connected to ${o.name}.`);
    }
    return true;
  }
  return false;
}
function doInteract() {
  if (tryPhysicalConnect()) return;
  interact();
}
function panel(title, subtitle, body) {
  return `<section class="panel"><div class="panel-title"><div><h2>${title}</h2><p>${subtitle}</p></div><button class="action" data-action="close">CLOSE</button></div>${body}</section>`;
}
function buttons(items) {
  return `<div class="button-row">${items.map(([a, t]) => `<button class="action" data-action="${a}">${t}</button>`).join("")}</div>`;
}
function openPanel(name) {
  state.panel = name;
  renderPanel();
  document.querySelector("#panel").classList.add("open");
}
function renderPanel() {
  const p = document.querySelector("#panel");
  if (!state.panel) {
    p.classList.remove("open");
    p.innerHTML = "";
    return;
  }
  let body = "";
  const selected = state.target || state.held;
  if (state.panel === "lab") body = panel("FIELD GUIDE", "The world is the interface. Walk, look, handle, and build.", `<p>Use the left analog joystick for free proportional movement and swipe the entire right-side look area to rotate the camera. Releasing the left thumb immediately stops movement.</p><div class="data-row"><span>Location</span><strong>${state.player.x.toFixed(1)}, ${state.player.z.toFixed(1)}</strong></div><div class="data-row"><span>Held object</span><strong>${state.held?.name || "none"}</strong></div>${buttons([["open-inventory", "REFERENCE PARTS"], ["open-assembly", "ASSEMBLY STATUS"], ["open-schematic", "SCHEMATIC"], ["open-settings", "SETTINGS"]])}`);
  else if (state.panel === "inventory") body = panel("SECONDARY INVENTORY", "Use the drawers first; this list is a reference.", `<div class="card-grid">${COMPONENTS.map((c) => `<button class="part-card" data-spawn="${c.id}"><b>${c.name}</b><small>${c.category}</small></button>`).join("")}</div><p>Choosing a reference item does not assemble it. The part is placed at the nearest workbench only as a sandbox convenience; the primary path remains walking to storage and opening a drawer.</p>`);
  else if (state.panel === "open-assembly") body = panel("ASSEMBLY STATUS", "Actual nets and physical alignment.", `${validateAssembly(state.world.filter((o) => !o.hidden), state.connections).checks.map((c) => `<div class="data-row"><span>${c.label}</span><strong>${c.ok ? "OK" : "OPEN"}</strong></div>`).join("")}<p>${state.assemblyLog.join("<br>") || "No assembly events recorded yet."}</p>`);
  else if (state.panel === "open-schematic") body = panel("SCHEMATIC / NETS", "Projection of the physical cables in the room.", `<div class="console">${state.connections.length ? state.connections.map((c) => {
    const a = state.world.find((o) => o.uid === c.a), b = state.world.find((o) => o.uid === c.b);
    return `${a?.name || "?"} \u2500\u2500 ${b?.name || "?"} [${c.kind}]`;
  }).join("\n") : "No physical connections yet."}</div>`);
  else if (state.panel === "program") body = panel("PROGRAMMING DESK", "Walk to the computer and flash firmware into the virtual MCU.", `<textarea id="firmwareEditor" class="code-editor">${state.firmware}</textarea>${buttons([["compile", "COMPILE"], ["flash", "FLASH FIRMWARE"], ["clear-console", "CLEAR CONSOLE"]])}<div class="console" id="console">${state.console}</div><p>Supported hooks: digitalWrite, analogWrite/PWM, analogRead, and tone. The browser-contained simulator updates LED light, sensor telemetry, motor RPM, and speaker frequency from the flashed firmware.</p>`);
  else if (state.panel === "robot") body = panel("ROBOT TEST AREA", "Bring the pieces here after assembly.", `<div class="data-row"><span>Power</span><strong>${state.circuit.powered ? "ACTIVE" : "OFF"}</strong></div><div class="data-row"><span>Motor</span><strong>${state.circuit.motorRpm} RPM</strong></div><div class="data-row"><span>Connections</span><strong>${state.connections.length}</strong></div>${buttons([["validate", "VALIDATE ASSEMBLY"], ["reset-sim", "RESET SIMULATION"]])}`);
  else if (state.panel === "projects") body = panel("LOCAL PROJECT", "Save the workshop exactly as you left it.", `<input id="projectName" class="code-editor" style="min-height:34px;height:34px" value="${state.projectName}"/>${buttons([["new", "NEW PROJECT"], ["save", "SAVE LOCAL"], ["load", "LOAD LOCAL"], ["duplicate", "DUPLICATE"], ["delete", "DELETE SAVE"], ["export", "EXPORT .ROBOTLAB"], ["import", "IMPORT ARCHIVE"]])}<div class="console">${state.world.filter((o) => !o.hidden).length} physical objects
${state.connections.length} nets
${state.assemblyLog.length} assembly events</div>`);
  else if (state.panel === "settings") body = panel("GAME SETTINGS", "Controls and performance are tuned for Android landscape.", `<div class="data-row"><span>Renderer quality</span><strong>${state.quality}</strong></div>${buttons([["quality-low", "LOW"], ["quality-medium", "MEDIUM"], ["quality-high", "HIGH"]])}<div class="data-row"><span>Joystick</span><strong>ANALOG + RELEASE STOP</strong></div><div class="data-row"><span>Camera</span><strong>RIGHT-SIDE SWIPE</strong></div><p>Low reduces drawing distance. Medium is the default. High increases detail and lighting for capable devices.</p>`);
  p.innerHTML = body;
  bindPanel();
}
function bindPanel() {
  document.querySelectorAll("[data-action]").forEach((b) => b.onclick = () => action(b.dataset.action));
  document.querySelectorAll("[data-spawn]").forEach((b) => b.onclick = () => {
    const o = obj(b.dataset.spawn, -2, 1.2, 1.6);
    state.world.push(o);
    toast(`${o.name} placed on the nearest bench reference point.`);
  });
  const ed = document.querySelector("#firmwareEditor");
  if (ed) ed.oninput = () => state.firmware = ed.value;
  const pn = document.querySelector("#projectName");
  if (pn) pn.oninput = () => state.projectName = pn.value;
}
function action(a) {
  if (a === "close") {
    state.panel = null;
    renderPanel();
    return;
  }
  if (a === "open-inventory") openPanel("inventory");
  else if (a === "open-assembly") openPanel("open-assembly");
  else if (a === "open-schematic") openPanel("open-schematic");
  else if (a === "open-settings") openPanel("settings");
  else if (a === "compile") {
    state.console = `[COMPILER] Parsing firmware...
[COMPILER] digitalWrite / PWM / sensor hooks detected
[OK] Build succeeded.`;
    toast("Firmware compiled locally.");
  } else if (a === "flash") {
    const m = state.world.find((o) => o.behavior === "mcu");
    if (!m) {
      toast("Find an MCU in a drawer or on the bench first.");
      return;
    }
    m.firmware = state.firmware;
    state.console = `[USB] Programming cable connected
[FLASH] ${state.firmware.length} bytes written
[RUN] firmware installed on ${m.name}
[OK] simulation loop active`;
    toast("Firmware flashed to the simulated MCU.");
  } else if (a === "clear-console") {
    state.console = "Virtual workstation idle.";
  } else if (a === "validate") {
    const r = validateAssembly(state.world.filter((o) => !o.hidden), state.connections);
    state.console = r.checks.map((c) => `${c.ok ? "\u2713" : "\u25CB"} ${c.label}`).join("\n");
    toast(r.ready ? "Assembly path validated." : "Assembly is incomplete.");
  } else if (a === "reset-sim") {
    state.circuit = createCircuitState();
    toast("Simulation reset.");
  } else if (a === "new") newProject();
  else if (a === "save") saveLocal();
  else if (a === "load") loadLocal();
  else if (a === "duplicate") duplicateProject();
  else if (a === "delete") deleteProject();
  else if (a === "quality-low" || a === "quality-medium" || a === "quality-high") {
    setQuality(a.split("-")[1].toUpperCase());
  } else if (a === "export") download(`${state.projectName.replace(/\W+/g, "-") || "robotlab"}.robotlab`, JSON.stringify(snapshot()), "application/json");
  else if (a === "import") document.querySelector("#importFile").click();
  renderPanel();
}
function snapshot() {
  return { version: "2.0", projectName: state.projectName, player: state.player, world: state.world, connections: state.connections, firmware: state.firmware, assemblyLog: state.assemblyLog, quality: state.quality };
}
function saveLocal() {
  localStorage.setItem("robotlab-project", JSON.stringify(snapshot()));
  toast("Project saved locally.");
}
function newProject() {
  localStorage.removeItem("robotlab-project");
  uid = 1;
  buildWorld();
  state.connections = [];
  state.assemblyLog = [];
  state.circuit = createCircuitState();
  state.projectName = "Untitled workshop";
  toast("New physical workshop created.");
}
function duplicateProject() {
  state.projectName = `${state.projectName} copy`;
  saveLocal();
  toast("Project duplicated as a local copy.");
}
function deleteProject() {
  localStorage.removeItem("robotlab-project");
  toast("Local project save deleted.");
}
function setQuality(level) {
  state.quality = level;
  state.drawLimit = { LOW: 32, MEDIUM: 56, HIGH: 100 }[level];
  toast(`${level} quality selected.`);
}
function loadLocal() {
  const raw = localStorage.getItem("robotlab-project");
  if (!raw) {
    toast("No saved local project.");
    return;
  }
  const d = JSON.parse(raw);
  restore(d);
  toast("Project reloaded.");
}
function restore(d) {
  state.projectName = d.projectName || "My first machine";
  state.player = { ...state.player, ...d.player };
  state.world = d.world || state.world;
  state.connections = d.connections || [];
  state.firmware = d.firmware || state.firmware;
  state.assemblyLog = d.assemblyLog || [];
  state.quality = d.quality || "MEDIUM";
  state.circuit = createCircuitState();
  uid = state.world.reduce((n, o) => Math.max(n, Number(String(o.uid).replace(/\D/g, "")) || 0), 0) + 1;
}
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 600);
}
document.querySelector("#importFile").onchange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      restore(JSON.parse(r.result));
      toast("Project archive imported.");
    } catch {
      toast("Invalid project archive.");
    }
  };
  r.readAsText(f);
};
function pointerLook(dx, dy) {
  Object.assign(state.player, nextLook(state.player, dx, dy));
}
var mouseLook = false;
var lastPointer = [0, 0];
canvas.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse") {
    mouseLook = true;
    lastPointer = [e.clientX, e.clientY];
    canvas.setPointerCapture?.(e.pointerId);
  }
});
canvas.addEventListener("pointermove", (e) => {
  if (mouseLook && e.pointerType === "mouse") {
    pointerLook(e.clientX - lastPointer[0], e.clientY - lastPointer[1]);
    lastPointer = [e.clientX, e.clientY];
  }
});
canvas.addEventListener("pointerup", (e) => {
  if (e.pointerType === "mouse") mouseLook = false;
});
canvas.addEventListener("wheel", (e) => {
  rotateHeld(e.deltaY > 0 ? 0.18 : -0.18);
});
addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (["w", "a", "s", "d", "shift", "control"].includes(k)) {
    state.keys.add(k);
    if (k === "control") state.player.crouch = true;
  }
  if (k === "e") {
    doInteract();
  }
  if (k === "q") {
    dropHeld();
  }
  if (k === "r") {
    rotateHeld(0.25);
  }
  if (k === "f") {
    rotateHeld(-0.25);
  }
});
addEventListener("keyup", (e) => {
  const k = e.key.toLowerCase();
  state.keys.delete(k);
  if (k === "control") state.player.crouch = false;
});
document.querySelector("#interactBtn").onclick = doInteract;
document.querySelector("#dropBtn").onclick = dropHeld;
document.querySelectorAll("[data-panel]").forEach((b) => b.onclick = () => openPanel(b.dataset.panel));
function drawWorld(now) {
  resize();
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.035, 0.09, 0.11, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const e = eye(), f = forward(), vp = mm(perspective(1.05, canvas.width / canvas.height, 0.05, 45), lookAt(e, math.add(e, f)));
  gl.uniform3f(loc.light, -0.45, 1, 0.6);
  let rendered = 0;
  const budget = state.drawLimit || 56;
  for (const o of state.world) {
    const far = Math.hypot(o.x - e[0], o.z - e[2]) > 15;
    if (o.hidden || (state.quality === "LOW" || state.quality === "MEDIUM") && (far || rendered >= budget)) continue;
    rendered++;
    let c = hex(o.color || "#82979a");
    if (o.behavior === "led" && state.circuit.ledOn) c = [1, 0.08, 0.03];
    if (o.behavior === "motor" && state.circuit.motorRpm > 20) c = [1, 0.45, 0.08];
    if (o === state.target) c = c.map((v) => Math.min(1, v * 1.45));
    if (o.held) o.glow = 0.32;
    else o.glow = Math.max(0, o.glow - 0.02);
    draw(o, vp, c);
    if (o.behavior === "drawer" && o.open) {
      draw({ ...o, x: o.x + 0.48, sz: 0.08, color: "#788c8e" }, vp);
    }
    if (o.behavior === "motor" && state.circuit.motorRpm > 10) {
      draw({ x: o.x, y: o.y, z: o.z, sx: 0.06, sy: o.sy * 1.3, sz: o.sz * 1.3, shape: "cylinder", rotation: o.rotation + now * 2e-3 * state.circuit.motorRpm, color: "#e4b258" }, vp);
    }
  }
  requestAnimationFrame(drawWorld);
}
function tick(now) {
  const dt = Math.min(0.08, (now - state.last) / 1e3);
  state.last = now;
  state.fps = state.fps * 0.9 + 1 / dt * 0.1;
  stepPlayer(dt);
  updateHeld();
  state.target = findTarget();
  setTarget(state.target);
  state.circuit = evaluateCircuit(state.world.filter((o) => !o.hidden), state.connections, state.firmware, state.circuit, dt);
  const chassis = state.world.find((o) => o.behavior === "fabricable" && state.world.some((child) => child.parentUid === o.uid && child.behavior === "motor"));
  const testFloor = state.world.find((o) => o.behavior === "testfloor");
  if (chassis && testFloor && Math.hypot(chassis.x - testFloor.x, chassis.z - testFloor.z) < 2.4) {
    const mounted = state.world.filter((o) => o.parentUid === chassis.uid);
    const drive = moveRobotOnTestFloor(chassis, mounted, state.circuit, dt);
    Object.assign(chassis, drive.chassis);
    for (const part of drive.mountedParts) {
      const live = state.world.find((o) => o.uid === part.uid);
      if (live) Object.assign(live, part);
    }
  }
  for (const o of state.world) {
    if (o.behavior === "led") o.glow = state.circuit.ledOn ? 0.8 : 0;
    if (o.behavior === "motor") o.rotation += state.circuit.motorRpm * dt * 0.025;
    if (o.behavior === "wheel" && state.circuit.motorRpm > 20) o.rotation += state.circuit.motorRpm * dt * 0.04;
    o.velocity[1] -= 9.8 * dt;
    if (!o.static && !o.held && o.y > o.sy + 0.08) {
      o.y += o.velocity[1] * dt;
      if (o.y <= o.sy + 0.08) {
        o.y = o.sy + 0.08;
        o.velocity[1] = 0;
      }
    }
  }
  status();
  requestAnimationFrame(tick);
}
state.touch.velocity = { x: 0, z: 0 };
state.touch.sprint = false;
function stepPlayer(dt) {
  const p = state.player, f = forward(), r = right(), keyboardSpeed = (state.keys.has("Shift") ? 4.8 : 2.8) * (p.crouch ? 0.55 : 1);
  let dx = 0, dz = 0;
  if (state.keys.has("w")) {
    dx += f[0] * keyboardSpeed;
    dz += f[2] * keyboardSpeed;
  }
  if (state.keys.has("s")) {
    dx -= f[0] * keyboardSpeed;
    dz -= f[2] * keyboardSpeed;
  }
  if (state.keys.has("a")) {
    dx -= r[0] * keyboardSpeed;
    dz -= r[2] * keyboardSpeed;
  }
  if (state.keys.has("d")) {
    dx += r[0] * keyboardSpeed;
    dz += r[2] * keyboardSpeed;
  }
  const magnitude = Math.min(1, Math.hypot(state.touch.moveX, state.touch.moveY));
  state.touch.velocity = nextVelocity(state.touch.velocity, { x: state.touch.moveX, y: -state.touch.moveY, magnitude, sprint: state.touch.sprint }, dt);
  dx += (r[0] * state.touch.velocity.x + f[0] * state.touch.velocity.z) * (p.crouch ? 0.55 : 1);
  dz += (r[2] * state.touch.velocity.x + f[2] * state.touch.velocity.z) * (p.crouch ? 0.55 : 1);
  const nx = p.x + dx * dt, nz = p.z + dz * dt;
  if (!blocked(nx, p.z)) p.x = nx;
  if (!blocked(p.x, nz)) p.z = nz;
  p.y = 1.65 - (p.crouch ? 0.35 : 0);
}
var gameJoy = document.querySelector("#joystick");
var gameKnob = gameJoy.querySelector(".joystick-knob");
var gameLook = document.querySelector("#lookZone");
var mobilePointers = { move: null, look: null, lastLook: null };
function resetGameStick() {
  const neutral = releasedStick();
  state.touch.moveX = neutral.x;
  state.touch.moveY = neutral.y;
  state.touch.velocity = { x: 0, z: 0 };
  mobilePointers.move = null;
  gameKnob.style.transform = "translate(0px,0px)";
}
function updateGameStick(event) {
  const rect = gameJoy.getBoundingClientRect();
  const stick = analogStickFromPoint(event.clientX, event.clientY, rect.left + rect.width / 2, rect.top + rect.height / 2);
  state.touch.moveX = stick.x;
  state.touch.moveY = stick.y;
  gameKnob.style.transform = `translate(${stick.knobX}px,${stick.knobY}px)`;
}
gameJoy.addEventListener("pointerdown", (event) => {
  if (mobilePointers.move !== null) return;
  event.preventDefault();
  mobilePointers.move = event.pointerId;
  gameJoy.setPointerCapture?.(event.pointerId);
  updateGameStick(event);
});
gameJoy.addEventListener("pointermove", (event) => {
  if (event.pointerId === mobilePointers.move) updateGameStick(event);
});
for (const eventName of ["pointerup", "pointercancel", "lostpointercapture"]) gameJoy.addEventListener(eventName, (event) => {
  if (event.pointerId === mobilePointers.move) resetGameStick();
});
gameLook.addEventListener("pointerdown", (event) => {
  if (mobilePointers.look !== null) return;
  event.preventDefault();
  mobilePointers.look = event.pointerId;
  mobilePointers.lastLook = [event.clientX, event.clientY];
  gameLook.setPointerCapture?.(event.pointerId);
});
gameLook.addEventListener("pointermove", (event) => {
  if (event.pointerId !== mobilePointers.look || !mobilePointers.lastLook) return;
  pointerLook(event.clientX - mobilePointers.lastLook[0], event.clientY - mobilePointers.lastLook[1]);
  mobilePointers.lastLook = [event.clientX, event.clientY];
});
for (const eventName of ["pointerup", "pointercancel", "lostpointercapture"]) gameLook.addEventListener(eventName, (event) => {
  if (event.pointerId === mobilePointers.look) {
    mobilePointers.look = null;
    mobilePointers.lastLook = null;
  }
});
addEventListener("blur", () => {
  resetGameStick();
  mobilePointers.look = null;
  mobilePointers.lastLook = null;
});
window.robotLabState = state;
window.robotLabInteract = doInteract;
window.robotLabFindTarget = findTarget;
requestAnimationFrame(drawWorld);
requestAnimationFrame(tick);
state.panel = null;
renderPanel();
