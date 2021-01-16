import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// Hand gesture for making a fist

const fistDescription = new GestureDescription("fist");

// All fingers fully curled
fistDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  fistDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

export default fistDescription;
