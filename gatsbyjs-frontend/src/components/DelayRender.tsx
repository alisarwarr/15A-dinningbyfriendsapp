import React from 'react';
import Delayed from 'react-delayed';


interface DelayRenderProps {
    children : React.ReactNode[];
            //type of 'children' in React TYPESCRIPT
}

function DelayRender({ children }: DelayRenderProps) {
    return (
        <Delayed mounted={true} mountAfter={1750} unmountAfter={1750}>
            {children}
        </Delayed>
    )
}

export default DelayRender;