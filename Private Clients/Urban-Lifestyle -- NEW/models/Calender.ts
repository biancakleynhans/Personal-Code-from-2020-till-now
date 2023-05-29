export interface iCalenderDisplay {
  id: string;
  name: string;
  start: string;
  end: string;
  type: 'task' | 'event' | 'checklist';
}
