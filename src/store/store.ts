import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Note } from '../types/Note';

export const ADD_NOTE = 'ADD_NOTE';
export const TOGGLE_ARCHIVE = 'TOGGLE_ARCHIVE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

interface EditNoteAction {
  type: typeof EDIT_NOTE;
  payload: {
    id: number;
    content: string;
    category: string;
    datesMentioned: string[];
  };
}

export const editNote = (
  id: number,
  content: string,
  category: string,
  datesMentioned: string[],
): AppActionTypes => ({
  type: EDIT_NOTE,
  payload: {
    id, content, category, datesMentioned,
  },
});

interface AddNoteAction {
  type: typeof ADD_NOTE;
  payload: Note;
}

interface ToggleArchiveAction {
  type: typeof TOGGLE_ARCHIVE;
  payload: number;
}

interface DeleteNoteAction {
  type: typeof DELETE_NOTE;
  payload: number;
}

export interface NotesState {
  data: Note[];
}

export const addNote = (note: Note): AppActionTypes => ({
  type: ADD_NOTE,
  payload: note,
});

export const toggleArchive = (noteId: number): AppActionTypes => ({
  type: TOGGLE_ARCHIVE,
  payload: noteId,
});

export const deleteNote = (noteId: number): AppActionTypes => ({
  type: DELETE_NOTE,
  payload: noteId,
});

const initialState: NotesState = {
  data: [
    {
      id: 1,
      createdAt: new Date(),
      content: 'Buy groceries for dinner',
      category: 'Task',
      datesMentioned: [],
      archived: false,
    },
  ],
};

export type AppActionTypes = AddNoteAction
| ToggleArchiveAction
| DeleteNoteAction
| EditNoteAction;

export const notesReducer = (
  state = initialState, action: AppActionTypes,
): NotesState => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case TOGGLE_ARCHIVE:
      return {
        ...state,
        data: state.data.map(note => (note.id === action.payload
          ? { ...note, archived: !note.archived } : note)),
      };
    case DELETE_NOTE:
      return {
        ...state,
        data: state.data.filter(note => note.id !== action.payload),
      };
    case EDIT_NOTE:
      return {
        ...state,
        data: state.data.map(note => (note.id === action.payload.id
          ? {
            ...note,
            content: action.payload.content,
            category: action.payload.category,
            datesMentioned: action.payload.datesMentioned,
          }
          : note)),
      };
    default:
      return state;
  }
};

export interface RootState {
  notes: NotesState;
}

const rootReducer = combineReducers<RootState>({
  notes: notesReducer,
});

export const store = createStore(rootReducer);
