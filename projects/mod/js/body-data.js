/* This file stores the vertex data for every body part */

let bodyData = {
  head: [
    { x: 236, y: 220 }, // (x1,y1) fixed - attached to torso and left arm
    { x: 230, y: 194 },
    { x: 209, y: 180 },
    { x: 183, y: 186 },
    { x: 170, y: 207 },
    { x: 174, y: 224 },
    { x: 184, y: 231 },
    { x: 195, y: 238 },
    { x: 222, y: 240 }, // (x9,y9) fixed - attached to torso and right arm
  ],
  torso: [
    { x: 236, y: 220 }, // (x1,y1) fixed - attached to head and left arm
    { x: 265, y: 227 }, // (x2,y2) fixed - attached to left arm
    { x: 303, y: 236 },
    { x: 334, y: 253 }, // (x4,y4) fixed - attached to left tigh
    { x: 341, y: 287 }, // (x5,y5) fixed - attached to left and right thighs
    { x: 308, y: 303 }, // (x6,y6) fixed - attached to right tigh
    { x: 260, y: 287 },
    { x: 237, y: 265 }, //(x8,y8) fixed - attached to right arm
    { x: 222, y: 240 }, // (x9,y9) fixed - attached to head and right arm
  ],
  rightShoulder: [
    { x: 222, y: 240 }, // (x1,y1) fixed - attached to head and torso
    { x: 216, y: 251 },
    { x: 211, y: 270 },
    { x: 215, y: 288 },
    { x: 229, y: 312 }, // (x5,y5) fixed - attached to right arm
    { x: 236, y: 301 }, // (x6,y6) fixed - attached to right arm
    { x: 232, y: 284 },
    { x: 231, y: 269 },
    { x: 237, y: 265 }, // (x9,y9) fixed - attached to torso
  ],
  rightArm: [
    { x: 229, y: 312 }, // (x1,y1) fixed - attached to right shoulder
    { x: 248, y: 316 },
    { x: 259, y: 323 },
    { x: 271, y: 339 },
    { x: 282, y: 345 }, // (x5,y5) fixed - attached to right hand
    { x: 288, y: 335 }, // (x6,y6) fixed - attached to right hand
    { x: 276, y: 319 },
    { x: 255, y: 306 },
    { x: 236, y: 301 }, // (x9,y9) fixed - attached to right arm
  ],
  rightHand: [
    { x: 282, y: 345 }, // (x1,y1) fixed - attached to right arm
    { x: 296, y: 356 },
    { x: 305, y: 348 },
    { x: 300, y: 342 },
    { x: 293, y: 341 },
    { x: 293, y: 339 },
    { x: 300, y: 339 },
    { x: 301, y: 335 },
    { x: 288, y: 335 }, // (x9,y9) fixed - attached to right arm
  ],
  rightThigh: [
    { x: 308, y: 303 }, // (x1,y1) fixed - attached to torso
    { x: 323, y: 327 },
    { x: 337, y: 351 },
    { x: 356, y: 356 },
    { x: 384, y: 359 }, // (x5,y5) fixed - attached to right leg
    { x: 406, y: 336 }, // (x6,y6) fixed - attached to right leg
    { x: 394, y: 321 },
    { x: 364, y: 309 },
    { x: 341, y: 287 }, // (x9,y9) fixed - attached to torso
  ],
  rightLeg: [
    { x: 384, y: 359 }, // (x1,y1) fixed - attached to right thigh
    { x: 429, y: 358 },
    { x: 465, y: 359 },
    { x: 500, y: 352 },
    { x: 507, y: 341 }, // (x5,y5) fixed - attached to right foot
    { x: 487, y: 336 }, // (x6,y6) fixed - attached to right foot
    { x: 460, y: 333 },
    { x: 432, y: 330 },
    { x: 406, y: 336 }, // (x9,y9) fixed - attached to right thigh
  ],
  rightFoot: [
    { x: 500, y: 352 }, // (x1,y1) fixed - attached to right leg
    { x: 513, y: 354 },
    { x: 512, y: 369 },
    { x: 528, y: 372 },
    { x: 526, y: 356 },
    { x: 532, y: 341 },
    { x: 527, y: 335 },
    { x: 518, y: 336 },
    { x: 507, y: 341 }, // (x9,y9) fixed - attached to right leg
  ],
  leftShoulder: [
    { x: 236, y: 220 }, // (x1,y1) fixed - attached to head and torso
    { x: 251, y: 201 },
    { x: 262, y: 193 },
    { x: 286, y: 194 },
    { x: 309, y: 193 }, // (x5,y5) fixed - attached to left arm
    { x: 309, y: 209 }, // (x6,y6) fixed - attached to left arm
    { x: 286, y: 214 },
    { x: 270, y: 214 },
    { x: 265, y: 227 }, // (x9,y9) fixed - attached to torso
  ],
  leftArm: [
    { x: 309, y: 209 }, // (x1,y1) fixed - attached to left shoulder
    { x: 328, y: 199 },
    { x: 352, y: 190 },
    { x: 366, y: 189 },
    { x: 376, y: 179 }, // (x5,y5) fixed - attached to left hand
    { x: 367, y: 179 }, // (x6,y6) fixed - attached to left hand
    { x: 351, y: 179 },
    { x: 326, y: 186 },
    { x: 309, y: 193 }, // (x9,y9) fixed - attached to left arm
  ],
  leftHand: [
    { x: 366, y: 189 }, // (x1,y1) fixed - attached to left arm
    { x: 373, y: 201 },
    { x: 376, y: 200 },
    { x: 372, y: 191 },
    { x: 382, y: 200 },
    { x: 389, y: 198 },
    { x: 394, y: 190 },
    { x: 388, y: 180 },
    { x: 376, y: 179 }, // (x9,y9) fixed - attached to left arm
  ],
  leftThigh: [
    { x: 341, y: 287 }, // (x1,y1) fixed - attached to torso
    { x: 375, y: 285 },
    { x: 405, y: 294 },
    { x: 424, y: 306 },
    { x: 440, y: 297 }, // (x5,y5) fixed - attached to left leg
    { x: 434, y: 268 }, // (x6,y6) fixed - attached to left leg
    { x: 412, y: 251 },
    { x: 375, y: 245 },
    { x: 334, y: 253 }, // (x9,y9) fixed - attached to torso
  ],
  leftLeg: [
    { x: 440, y: 297 }, // (x1,y1) fixed - attached to left thigh
    { x: 470, y: 300 },
    { x: 497, y: 296 },
    { x: 529, y: 286 },
    { x: 544, y: 275 }, // (x5,y5) fixed - attached to left foot
    { x: 537, y: 265 }, // (x6,y6) fixed - attached to left foot
    { x: 499, y: 271 },
    { x: 466, y: 270 },
    { x: 434, y: 268 }, // (x9,y9) fixed - attached to left thigh
  ],
  leftFoot: [
    { x: 544, y: 275 }, // (x1,y1) fixed - attached to left leg
    { x: 556, y: 284 },
    { x: 565, y: 293 },
    { x: 572, y: 282 },
    { x: 562, y: 267 },
    { x: 561, y: 251 },
    { x: 548, y: 249 },
    { x: 539, y: 254 },
    { x: 537, y: 265 }, // (x9,y9) fixed - attached to left leg
  ],
};
