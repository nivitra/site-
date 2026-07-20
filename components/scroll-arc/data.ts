export type ArcCircle = {
  id: string;
  /** Text inside the white disc */
  label: string;
  /** Body copy shown inside the arc dome when this disc is near the apex */
  body: string;
};

/** Three white discs on the wheel (recording: left / apex / right can co-exist) */
export const ARC_CIRCLES: ArcCircle[] = [
  {
    id: "scroll",
    label: "This scroll\nanimation",
    body: "Lorem Ipsum (LI) allows rigorous synchrony of tasks in a shared platform. Dolor Sit Amet (DSA) streamlines these components sans tedious efforts.",
  },
  {
    id: "framer",
    label: "Is crafted in\nFramer",
    body: "Consectetur Adipiscing (CA) aids in concurrent operations and submission to a shared cloud. Elit Sagittis (ES) simplifies tasks by eradicating segmented chores.",
  },
  {
    id: "code",
    label: "Without writing\nany code",
    body: "Vestibulum Ante (VA) expedites unison operations in a common system. Ipsum Cursus (IC) eases component implementation into the live stages.\n\nInteger Nibh (IN) fosters parallel endeavors and revisions in a collective workspace. Vestibulum Mattis (VM) smoothens active operations, cutting out manual tasks.",
  },
];
