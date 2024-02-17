import { createContext, useContext} from "react";

const NoteContext = createContext();

// export default NoteContext;

const useData = ()=> useContext(NoteContext);

export {NoteContext, useData};
