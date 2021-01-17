import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

// Gesture description for pointing right
const pointRightDescription = new GestureDescription("point_right");

// Index finger not curled and pointing right
pointRightDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointRightDescription.addCurl(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// Middle Finger not curled and pointing right
pointRightDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
pointRightDescription.addCurl(
  Finger.Middle,
  FingerDirection.HorizontalRight,
  1.0
);

// All other fingers curled
for (let finger of [Finger.Thumb, Finger.Ring, Finger.Pinky]) {
  pointRightDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

export default pointRightDescription;
