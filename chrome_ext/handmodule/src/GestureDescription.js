/*
  MIT License

  Copyright (c) 2020 Andreas Schallwig

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/
import { Finger } from './FingerDescription';

export default class GestureDescription {
  constructor(name) {

    // name (should be unique)
    this.name = name;

    this.curls = {};
    this.directions = {};

    this.weights = [1.0, 1.0, 1.0, 1.0, 1.0];
    this.weightsRelative = [1.0, 1.0, 1.0, 1.0, 1.0];
  }

  addCurl(finger, curl, confidence) {
    if(typeof this.curls[finger] === 'undefined') {
      this.curls[finger] = [];
    }
    this.curls[finger].push([curl, confidence]);
  }

  addDirection(finger, position, confidence) {
    if(typeof this.directions[finger] === 'undefined') {
      this.directions[finger] = [];
    }
    this.directions[finger].push([position, confidence]);
  }

  setWeight(finger, weight) {

    this.weights[finger] = weight;

    // recalculate relative weights
    let total = this.weights.reduce((a, b) => a + b, 0);
    this.weightsRelative = this.weights.map(el => el * 5 / total );
  }

  matchAgainst(detectedCurls, detectedDirections) {

    let confidence = 0.0;

    // look at the detected curl of each finger and compare with
    // the expected curl of this finger inside current gesture
    for(let fingerIdx in detectedCurls) {

      let detectedCurl = detectedCurls[fingerIdx];
      let expectedCurls = this.curls[fingerIdx];

      if(typeof expectedCurls === 'undefined') {
        // no curl description available for this finger
        // add default confidence of "1"
        confidence += this.weightsRelative[fingerIdx];
        continue;
      }

      // compare to each possible curl of this specific finger
      for(const [expectedCurl, score] of expectedCurls) {
        if(detectedCurl == expectedCurl) {
          confidence += score * this.weightsRelative[fingerIdx];
          break;
        }
      }
    }

    // same for detected direction of each finger
    for(let fingerIdx in detectedDirections) {

      let detectedDirection = detectedDirections[fingerIdx];
      let expectedDirections = this.directions[fingerIdx];

      if(typeof expectedDirections === 'undefined') {
        // no direction description available for this finger
        // add default confidence of "1"
        confidence += this.weightsRelative[fingerIdx];
        continue;
      }

      // compare to each possible direction of this specific finger
      for(const [expectedDirection, score] of expectedDirections) {
        if(detectedDirection == expectedDirection) {
          confidence += score * this.weightsRelative[fingerIdx];
          break;
        }
      }
    }

    return confidence;
  }
}