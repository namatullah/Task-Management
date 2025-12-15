export interface TasksType {
  id?: number;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  priority?: string;
  progress?: number;
  user?: {
    id?: string;
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
  };
  isArchived?: boolean;
  project?: {
    id?: number;
    name: string;
    description: string;
    status: string;
  };
}

export interface FormType {
  open: boolean;
  close: () => void;
}

export interface DeleteType extends FormType {
  id: number | string | any | null;
}

export interface ArchiveType extends FormType {
  id: number | string | null;
  isArchived: boolean;
}

export interface ProgressType extends FormType {
  id?: number | string;
  progress?: number;
}
export interface PriorityType extends FormType {
  id?: number | string;
  priority?: string;
}

export interface StatusType extends FormType {
  id?: number | string;
  status?: string;
}
