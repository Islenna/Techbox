export type EventLogEntry = {
  time: string; // CPR Timer time (e.g. 02:45)
  realTime: string; // Real-world clock time (e.g. 14:38:23)
  label: string; // What happened (e.g. "Epi (IV): 0.2 mg (0.2 mL)")
};
