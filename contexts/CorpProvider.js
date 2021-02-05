import { createContext } from 'react'


export const CorpContext = createContext(null);

export const CorpProvider = ({ children }) => {
    const [corpList, setCorpList] = React.useState([]);
  
    const handleCorpList = data => {
      setCorpList(data);
    }
  
    const contextProps = {
      corpList,
      handleCorpList
    };
  
    return (
      <CorpContext.Provider value={contextProps}>
        {children}
      </CorpContext.Provider>
    );
}