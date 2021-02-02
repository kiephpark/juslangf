# 기본 사항 정리

## componets에 index.js의 역할
- Editable 폴더에 Editable.js가 있고, export default를 하면 모듈 로딩시 `import Editable from '../Editable/Editable';`로 임폴드해야 하지만, 아래와 같이 폴더에 index.js를 추가하게 되면, `import Editable from '../Editable';`로 심플하게 로딩할 수 있다.
``` javascript (index.js)
import Editable from './Editable.jsx';

export default Editable;
```
## export default vs export const
- https://stackoverflow.com/questions/33611812/export-const-vs-export-default-in-es6


## context 사용
- 
``` javascript
import React, { createContext } from 'react';

const defaultValue = 'light';
const ThemeContext = React.createContext(defaultValue);
```